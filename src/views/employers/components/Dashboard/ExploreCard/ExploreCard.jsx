import React from "react";
import { motion } from "framer-motion";
import styles from "./ExploreCard.module.scss";
import PropTypes from "prop-types";

export default function ExploreCard({ title, btnText, imageUrl }) {
    return (
        <motion.div
            className={styles.exploreCard}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.25 }}
        >
            <div className={styles.imageWrapper}>
                <img src={imageUrl} alt={title} />
            </div>
            <div className={styles.textWrapper}>
                <h3>{title}</h3>
                <button>{btnText}</button>
            </div>
        </motion.div>
    );
}

ExploreCard.propTypes = {
    title: PropTypes.string.isRequired,
    btnText: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
};
