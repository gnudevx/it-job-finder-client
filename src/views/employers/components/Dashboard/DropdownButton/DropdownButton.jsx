import { useState, useRef, useEffect } from "react";
import styles from "./DropdownButton.module.scss";
import PropTypes from "prop-types";

export const DropdownButton = ({ icon: Icon, label, content }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <div className={styles.dropdownWrapper} ref={ref}>
            <button
                className={styles.navBtn}
                onClick={() => setOpen((prev) => !prev)}
            >
                <Icon className={styles.icon} />
                <span className={styles.label}>{label}</span>
            </button>
            {open && <div className={styles.dropdownMenu}>{content}</div>}
        </div>
    );
};

DropdownButton.propTypes = {
    icon: PropTypes.elementType.isRequired,
    label: PropTypes.string,
    content: PropTypes.node.isRequired,
};
