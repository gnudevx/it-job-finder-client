// CircleIcon.jsx
import React from "react";
import PropTypes from "prop-types";

const CircleIcon = ({ color = "#9ca3af", size = "20px" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2" // Độ dày nét vẽ cho hình tròn
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ minWidth: size }}
    >
        <circle cx="12" cy="12" r="10"></circle> {/* Hình tròn */}
    </svg>
);

CircleIcon.propTypes = {
    color: PropTypes.string,
    size: PropTypes.string,
};

export default CircleIcon;