import React from "react";
import styles from "./Pagination.module.scss";
import PropTypes from "prop-types";

export default function Pagination({ page, totalPages, onChange }) {
    const handleChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            onChange(newPage);
        }
    };

    return (
        <div className={styles.pagination}>
            <button
                onClick={() => handleChange(1)}
                disabled={page === 1}
                className={styles.pageButton}
            >
                «
            </button>
            <button
                onClick={() => handleChange(page - 1)}
                disabled={page === 1}
                className={styles.pageButton}
            >
                ‹
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
                .slice(Math.max(0, page - 3), Math.min(totalPages, page + 2))
                .map((num) => (
                    <button
                        key={num}
                        className={`${styles.pageButton} ${num === page ? styles.active : ""
                            }`}
                        onClick={() => handleChange(num)}
                    >
                        {num}
                    </button>
                ))}

            <button
                onClick={() => handleChange(page + 1)}
                disabled={page === totalPages}
                className={styles.pageButton}
            >
                ›
            </button>
            <button
                onClick={() => handleChange(totalPages)}
                disabled={page === totalPages}
                className={styles.pageButton}
            >
                »
            </button>
        </div>
    );
}

Pagination.propTypes = {
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};
