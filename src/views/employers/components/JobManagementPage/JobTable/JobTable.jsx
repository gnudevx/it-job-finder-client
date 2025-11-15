import React from "react";
import PropTypes from "prop-types";
import styles from "./JobTable.module.scss";
import { Edit, PauseCircle, ArrowUpCircle, Copy } from "lucide-react";

export default function JobTable({ jobs }) {

    const handleClick = () => {
        console.log("click")
    }
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
                        <tr key={job.id}>
                            <td>
                                <div className={styles.title}>#{job.id}</div>
                                <div className={styles.jobName}>{job.title}</div>

                                <div className={styles.tags}>
                                    <span className={styles.hidden}>Không hiển thị</span>
                                    <span className={styles.pending}>Chưa yêu cầu duyệt</span>
                                </div>

                                <div className={styles.campaign}>
                                    Chiến dịch tuyển dụng: {job.campaign}
                                </div>

                                <div className={styles.actions}>
                                    <button className={styles.btnGreen} onClick={() => handleClick}>Xem CV ứng tuyển</button>
                                    <button className={styles.btnWhite}>Yêu cầu hiển thị</button>
                                </div>
                            </td>

                            <td className={styles.iconCol}>
                                <Edit size={19} />
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
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            title: PropTypes.string,
            campaign: PropTypes.string,
            visibility: PropTypes.string,
            approval: PropTypes.string,
            latestDisplay: PropTypes.string,
            totalDisplay: PropTypes.string,
            service: PropTypes.string,
        })
    ).isRequired,
};

JobTable.defaultProps = {
    jobs: [],
};
