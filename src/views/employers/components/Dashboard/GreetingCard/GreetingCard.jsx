import React from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import styles from "./GreetingCard.module.scss";
import PropTypes from "prop-types";

export default function GreetingCard({ username, points, progress }) {
    return (
        <motion.div
            className={styles.greetingCard}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <div className={styles.left}>
                <h2>
                    Xin chào, <span>{username}</span>
                </h2>
                <p>
                    Hồ sơ của bạn đã hoàn thành{" "}
                    <strong>{progress}%</strong>.
                    Hãy thực hiện các bước sau để gia tăng tính bảo mật cho tài khoản của bạn và nhận ngay {" "}
                    <strong>+{points} Top Points</strong>.
                </p>

                <div className={styles.progressWrapper}>
                    <div className={styles.progressBar}>
                        <motion.div
                            className={styles.progressFill}
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                    </div>
                    <span className={styles.progressText}>{progress}%</span>
                </div>
            </div>

            <div className={styles.right}>
                <div className={styles.pointsBadge}>
                    <Trophy size={22} />
                    <span>+{points}</span>
                </div>
            </div>
        </motion.div>
    );
}

GreetingCard.propTypes = {
    username: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired,
    progress: PropTypes.number.isRequired,
};
