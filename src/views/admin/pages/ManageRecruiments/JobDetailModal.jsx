import React from "react";
import { X, Building2, MapPin, DollarSign, Calendar, Briefcase, Users } from "lucide-react";
import styles from "./JobDetailModal.module.scss";
import PropTypes from "prop-types";
const JobDetailModal = ({ job, onClose }) => {
    if (!job) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                {/* Header */}
                <div className={styles.header}>
                    <div>
                        <h2 className={styles.title}>{job.title}</h2>
                        <p className={styles.company}>
                            <Building2 size={16} /> {job.employer_id?.companyId?.name || "Chưa có"}
                        </p>
                    </div>

                    <button className={styles.closeBtn} onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className={styles.body}>

                    {/* Thông tin cơ bản */}
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Thông tin chung</h3>

                        <div className={styles.infoGrid}>

                            <div className={styles.infoItem}>
                                <MapPin size={18} />
                                <div>
                                    <label>Địa điểm</label>
                                    <p>{job.work_location_detail || "Không có"}</p>
                                </div>
                            </div>

                            <div className={styles.infoItem}>
                                <Calendar size={18} />
                                <div>
                                    <label>Ngày hết hạn</label>
                                    <p>
                                        {job.applicationDeadline
                                            ? new Date(job.applicationDeadline).toLocaleDateString()
                                            : "Không có"}
                                    </p>
                                </div>
                            </div>

                            <div className={styles.infoItem}>
                                <Briefcase size={18} />
                                <div>
                                    <label>Kinh nghiệm</label>
                                    <p>{job.experience || "Không yêu cầu"}</p>
                                </div>
                            </div>

                            <div className={styles.infoItem}>
                                <Users size={18} />
                                <div>
                                    <label>Số lượng tuyển</label>
                                    <p>{job.numberOfPositions || "Không có"}</p>
                                </div>
                            </div>

                            <div className={styles.infoItem}>
                                <DollarSign size={18} />
                                <div>
                                    <label>Mức lương</label>
                                    <p>{job.salary || "Thỏa thuận"}</p>
                                </div>
                            </div>

                            <div className={styles.infoItem}>
                                <Calendar size={18} />
                                <div>
                                    <label>Ngày đăng</label>
                                    <p>{new Date(job.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mô tả công việc */}
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Mô tả công việc</h3>
                        <p className={styles.textBlock}>
                            {job.jobDescription || "Không có mô tả"}
                        </p>
                    </div>

                    {/* Yêu cầu */}
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Yêu cầu</h3>
                        <ul className={styles.list}>
                            {(job.requirements || []).map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Quyền lợi */}
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Quyền lợi</h3>
                        <ul className={styles.list}>
                            {(job.benefits || []).map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
JobDetailModal.propTypes = {
    job: PropTypes.object,
    onClose: PropTypes.func.isRequired,
};
export default JobDetailModal;
