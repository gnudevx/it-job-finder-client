import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowUpRight, Lock } from "lucide-react";
import styles from "./ProgressCard.module.scss";
import PropTypes from "prop-types";

export default function ProgressCard({ title, link, completed, disabled }) {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleClick = (e) => {
        if (disabled) e.preventDefault(); // chặn click khi bị khóa
    };

    return (
        <motion.div
            className={`${styles.card} ${completed ? styles.completed : ""} ${disabled ? styles.disabled : ""}`}
            whileHover={!disabled ? { scale: 1.02 } : {}}
            transition={{ type: "spring", stiffness: 250 }}
            onMouseEnter={() => disabled && setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            <div className={styles.left}>
                {completed ? (
                    <CheckCircle className={styles.iconCompleted} size={20} />
                ) : (
                    <div className={styles.iconCircle}></div>
                )}
                <span className={styles.title}>{title}</span>
            </div>

            <a href={link} onClick={handleClick} className={styles.linkBtn}>
                {disabled ? <Lock size={18} /> : <ArrowUpRight size={18} />}
            </a>

            {/* Tooltip tùy chỉnh */}
            {disabled && showTooltip && (
                <motion.div
                    className={styles.tooltip}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    Hãy hoàn thành tất cả các bước trước để thực hiện bước này.
                </motion.div>
            )}
        </motion.div>
    );
}

ProgressCard.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
};
