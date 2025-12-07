import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./JobTable.module.scss";
import { Edit, PauseCircle, ArrowUpCircle, Copy } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';

export default function JobTable({ jobs, setJobs }) {
    const navigate = useNavigate();
    useEffect(() => {
        console.log("JobTable jobs:", jobs);
    }, [jobs]);
    const handleEdit = (jobId) => {
        navigate(`/employer/jobs/edit/${jobId}`);
    };

    const handleViewApplications = (jobId) => {
        navigate(`/employer/jobs/${jobId}/applications`);
    };
    const handlePause = async (job) => {
        // 1️⃣ Chặn ngay từ frontend nếu trạng thái không cho pause
        if (job.publishStatus === "pending") {
            toast.error("Tin tuyển dụng đang chờ duyệt. Không thể tạm dừng hiển thị!");
            return;
        }

        if (job.publishStatus === "rejected") {
            toast.error("Tin tuyển dụng đã bị từ chối. Không thể tạm dừng hiển thị!");
            return;
        }
        if (job.publishStatus === "draft") {
            toast.error("Tin tuyển dụng đang bản nháp. Không thể tạm dừng hiển thị!");
            return;
        }

        try {
            // 2️⃣ Cho phép pause
            const res = await axios.post(`/employer/jobs/${job._id}/pause`);

            if (res.data.success) {
                toast.success("Đã tạm dừng hiển thị!");

                setJobs(prev =>
                    prev.map(j =>
                        j._id === job._id
                            ? { ...j, publishStatus: "paused", visibility: "hidden" }
                            : j
                    )
                );
            }
        } catch (err) {
            console.error(err);
            toast.error("Có lỗi xảy ra!");
        }
    };
    const handleRequestPublish = async (jobId) => {
        try {
            const res = await axios.post("/employer/jobs/request-publish", { jobId });
            if (res.data.success) {
                toast.success("Yêu cầu hiển thị thành công!");
                setJobs(prev =>
                    prev.map(job =>
                        job._id === jobId ? { ...job, publishStatus: "pending" } : job
                    )
                );
            } else {
                toast.error(res.data.message || "Có lỗi xảy ra");
            }
        } catch (err) {
            console.error(err);
            toast.error("Có lỗi xảy ra, vui lòng thử lại!");
        }
    };
    const handleResume = async (job) => {
        // chặn nhanh ở frontend
        if (job.publishStatus === 'pending' || job.publishStatus === 'rejected') {
            toast.error('Không thể hiển thị lại tin ở trạng thái hiện tại.');
            return;
        }

        try {
            const res = await axios.post(`/employer/jobs/${job._id}/resume`);
            if (res.data.success) {
                toast.success(res.data.message);
                setJobs(prev => prev.map(j => j._id === job._id ? { ...j, publishStatus: 'approved', visibility: 'visible' } : j));
            } else {
                // ví dụ expired or other business message
                toast.error(res.data.message || 'Không thể hiển thị lại tin.');
            }
        } catch (err) {
            console.error(err);
            toast.error('Có lỗi xảy ra, vui lòng thử lại.');
        }
    };
    return (
        <div className={styles.table}>
            <table>
                <thead>
                    <tr>
                        <th>Tin tuyển dụng</th>
                        <th></th>
                        <th>Dịch vụ chạy gần đây</th>
                        <th>Đợt hiển thị gần nhất</th>
                        <th>Toàn bộ thời gian hiển thị</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map(job => (
                        <tr key={job._id}>
                            <td>
                                <div className={styles.title}>#{job._id}</div>
                                <div className={styles.jobName}>{job.title}</div>

                                <div className={styles.tags}>
                                    {job.visibility === "visible" && <span className={styles.hidden}>Đang hiển thị</span>}
                                    {job.visibility === "hidden" && <span className={styles.hidden}>Không hiển thị</span>}
                                    {job.visibility === "expired" && <span className={styles.expired}>Đã hết hạn hiển thị</span>}

                                    {job.publishStatus === "draft" && <span className={styles.pending}>Chưa yêu cầu duyệt</span>}
                                    {job.publishStatus === "pending" && <span className={styles.pending}>Đang xét duyệt</span>}
                                    {job.publishStatus === "paused" && <span className={styles.pending}>Đã tạm dừng hiển thị</span>}
                                    {job.publishStatus === "approved" && <span className={styles.pending}>Đã duyệt</span>}
                                    {job.publishStatus === "rejected" && <span className={styles.pending}>Bị từ chối</span>}
                                </div>

                                <div className={styles.campaign}>Chiến dịch tuyển dụng: {job.campaign}</div>

                                <div className={styles.actions}>
                                    <button className={styles.btnGreen} onClick={() => handleViewApplications(job._id)}>Xem CV ứng tuyển</button>
                                    {job.publishStatus === "draft" && (
                                        <button className={styles.btnWhite} onClick={() => handleRequestPublish(job._id)}>Yêu cầu hiển thị</button>
                                    )}
                                    {job.publishStatus === "paused" && (
                                        <button className={styles.btnWhite} onClick={() => handleResume(job)}> hiển thị lại tin </button>
                                    )}
                                </div>
                            </td>

                            <td className={styles.iconCol}>
                                <div className={styles.iconWrapper}>
                                    <Edit size={19} onClick={() => handleEdit(job._id)} />
                                    <span className={styles.tooltip}>Cập nhật tin</span>
                                </div>
                                <div className={styles.iconWrapper}>
                                    <PauseCircle size={19} onClick={() => handlePause(job)} />
                                    <span className={styles.tooltip}>tạm dừng tin</span>
                                </div>
                                <div className={styles.iconWrapper}>
                                    <ArrowUpCircle size={19} />
                                    <span className={styles.tooltip}>đẩy lên xu hướng</span>
                                    <span>Mới</span>
                                </div>
                                <Copy size={19} />
                            </td>

                            <td>{job.service ?? "Chưa kích hoạt dịch vụ"}</td>
                            <td>{calcRemainingDisplay(job)}</td>
                            <td>{calcTotalDisplay(job)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
const calcTotalDisplay = (job) => {
    const { createdAt, display_expired_at, publishStatus } = job;

    // Các trạng thái KHÔNG bao giờ hiển thị
    if (publishStatus === "pending") return "Đang duyệt";
    if (publishStatus === "rejected") return "Bị từ chối";
    if (publishStatus === "draft") return "Bản nháp chưa hiển thị";

    // Tin hết hạn cũng có total display (vì đã hiển thị)
    if (!createdAt || !display_expired_at) return "Tin chưa hiển thị";

    // approved + paused + expired → đều tính được total display
    const start = new Date(createdAt);
    const end = new Date(display_expired_at);

    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return `${diff} ngày`;
};
const calcRemainingDisplay = (job) => {
    if (job.publishStatus === "pending")
        return "Đang duyệt";

    if (job.publishStatus === "rejected")
        return "Bị từ chối";

    if (job.publishStatus === "paused")
        return "Đã tạm dừng hiển thị";

    if (job.publishStatus !== "approved")
        return "Tin chưa hiển thị";

    // Trạng thái approved  
    const end = new Date(job.display_expired_at);
    const now = new Date();

    const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    if (diff < 0) return "Đã hết hạn";

    return `Còn ${diff} ngày`;
};

JobTable.propTypes = {
    jobs: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            title: PropTypes.string,
            campaign: PropTypes.string,
            visibility: PropTypes.string,
            publishStatus: PropTypes.string,
            latestDisplay: PropTypes.string,
            totalDisplay: PropTypes.string,
            service: PropTypes.string,
        })
    ).isRequired,
    setJobs: PropTypes.func.isRequired,
};