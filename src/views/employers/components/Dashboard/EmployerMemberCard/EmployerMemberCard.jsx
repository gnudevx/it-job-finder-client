import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import styles from "./EmployerMemberCard.module.scss";
import { getRankInfo } from "@viewmodels/EmployerViewModel";

export default function EmployerMemberCard({ employer }) {
    const { ranks, current, progress } = getRankInfo(employer.tpPoint);

    return (
        <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            {/* Header */}
            <div className={styles.header}>
                <img
                    src="https://cdn-icons-png.flaticon.com/512/219/219970.png"
                    alt="avatar"
                    className={styles.avatar}
                />
                <div className={styles.info}>
                    <h2>{employer.name}</h2>
                    <p className={styles.code}>Mã NTD: {employer.id}</p>
                    <p className={styles.contact}>
                        {employer.email} · {employer.phone}
                    </p>
                </div>
                <div className={styles.rankBadge}>
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/1040/1040230.png"
                        alt="medal"
                    />
                    <span>{current.label}</span>
                </div>
            </div>

            {/* Rank Bar */}
            <div className={styles.rankSection}>
                <div className={styles.levels}>
                    {ranks.map((lvl) => (
                        <div key={lvl.label} className={styles.level}>
                            <span className={styles.levelName}>{lvl.label}</span>
                            <span className={styles.levelValue}>{lvl.min}</span>
                        </div>
                    ))}
                </div>

                <div className={styles.progressWrapper}>
                    <div className={styles.progressBar}>
                        <div
                            className={styles.fill}
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <div
                        className={styles.progressDot}
                        style={{ left: `calc(${progress}% - 10px)` }}
                    >
                        <div className={styles.dot}></div>
                    </div>
                </div>
            </div>

            {/* Điểm xét hạng & Ưu đãi */}
            <div className={styles.benefitBox}>
                <div className={styles.benefitHeader}>
                    <div>
                        <h4>Điểm xét hạng</h4>
                        <div className={styles.tpValue}>
                            <span className={styles.tpNumber}>{employer.tpPoint}</span>
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
                                alt="coin"
                                className={styles.tpIcon}
                            />
                        </div>
                    </div>

                    <button className={styles.rewardBtn}>Ưu đãi của tôi</button>
                </div>

                {!employer.isVerified && (
                    <>
                        <p className={styles.verifyNote}>
                            Bạn cần đạt tối thiểu cấp độ xác thực{" "}
                            <strong>2</strong> để thực hiện xét hạng khách hàng và sử dụng các
                            quyền lợi tương ứng.
                        </p>

                        <div className={styles.actions}>
                            <a href="#" className={styles.link}>
                                Tìm hiểu thêm
                            </a>
                            <button className={styles.verifyBtn}>Xác thực ngay</button>
                        </div>
                    </>
                )}
            </div>
        </motion.div>
    );
}

EmployerMemberCard.propTypes = {
    employer: PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        tpPoint: PropTypes.number.isRequired,
        isVerified: PropTypes.bool,
    }).isRequired,
};
