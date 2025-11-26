import React from "react";
import PropTypes from "prop-types";
import styles from "./JobTable.module.scss";
import { Edit, PauseCircle, ArrowUpCircle, Copy } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';

export default function JobTable({ jobs, setJobs }) {
    const navigate = useNavigate();

    const handleEdit = (jobId) => {
        navigate(`/employer/jobs/edit/${jobId}`);
    };

    const handleViewApplications = (jobId) => {
        navigate(`/employer/jobs/${jobId}/applications`);
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
                                    {job.publishStatus === "approved" && <span className={styles.pending}>Đã duyệt</span>}
                                    {job.publishStatus === "rejected" && <span className={styles.pending}>Bị từ chối</span>}
                                </div>

                                <div className={styles.campaign}>Chiến dịch tuyển dụng: {job.campaign}</div>

                                <div className={styles.actions}>
                                    <button className={styles.btnGreen} onClick={() => handleViewApplications(job._id)}>Xem CV ứng tuyển</button>
                                    {job.publishStatus === "draft" && (
                                        <button className={styles.btnWhite} onClick={() => handleRequestPublish(job._id)}>Yêu cầu hiển thị</button>
                                    )}
                                </div>
                            </td>

                            <td className={styles.iconCol}>
                                <div className={styles.iconWrapper}>
                                    <Edit size={19} onClick={() => handleEdit(job._id)} />
                                    <span className={styles.tooltip}>Cập nhật tin</span>
                                </div>
                                <PauseCircle size={19} />
                                <div className={styles.newTag}>
                                    <ArrowUpCircle size={19} />
                                    <span>Mới</span>
                                </div>
                                <Copy size={19} />
                            </td>

                            <td>{job.service ?? "Chưa kích hoạt dịch vụ"}</td>
                            <td>{job.latestDisplay ?? "Tin chưa hiển thị"}</td>
                            <td>{job.totalDisplay ?? "Tin chưa hiển thị"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

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