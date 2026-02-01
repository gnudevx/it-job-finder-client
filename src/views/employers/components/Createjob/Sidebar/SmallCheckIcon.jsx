// SmallCheckIcon.jsx
import React from "react";
import PropTypes from "prop-types";

const SmallCheckIcon = ({ color = "#16a34a", size = "20px" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ minWidth: size }}
    >
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);
SmallCheckIcon.propTypes = {
    color: PropTypes.string,
    size: PropTypes.string,
};

export default SmallCheckIcon;