import React from "react";
import styles from "./SectionTitle.module.scss";
import PropTypes from "prop-types";
export default function SectionTitle({ title }) {
    return <h2 className={styles.title}>{title}</h2>;
}
SectionTitle.propTypes = {
    title: PropTypes.string.isRequired,
};