import React, { useRef } from "react";
import styles from "./FileUpload.module.scss";
import PropTypes from "prop-types";

export default function FileUpload({ files, onChange, accept, note }) {
    const inputRef = useRef();

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (!selectedFiles.length) return;

        const validFormats = [
            "image/gif",
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/bmp",
            "application/pdf",
        ];

        let newFiles = [...files];

        for (let file of selectedFiles) {
            if (!validFormats.includes(file.type)) {
                alert(`File ${file.name} có định dạng không hợp lệ.`);
                continue;
            }
            if (file.size > 5 * 1024 * 1024) {
                alert(`File ${file.name} vượt quá 5MB.`);
                continue;
            }
            newFiles.push(file);
        }

        if (newFiles.length > 2) {
            alert("Chỉ được tải tối đa 2 file!");
            newFiles = newFiles.slice(0, 2);
        }

        onChange(newFiles);
        e.target.value = ""; // reset input
    };

    return (
        <div
            className={`${styles.uploadBox} ${files?.length ? styles.hasFile : ""}`}
            onClick={() => inputRef.current.click()}
        >
            {files?.length > 0 ? (
                <div className={styles.fileInfo}>
                    {files.map((f, i) => (
                        <p key={i}>{f.name}</p>
                    ))}
                </div>
            ) : (
                <div className={styles.placeholder}>
                    <p>Chọn hoặc kéo file vào đây</p>
                    <small>{note}</small>
                </div>
            )}

            <input
                ref={inputRef}
                type="file"
                accept={accept}
                multiple
                hidden
                onChange={handleFileChange}
            />
        </div>
    );
}

FileUpload.propTypes = {
    files: PropTypes.array,
    onChange: PropTypes.func.isRequired,
    accept: PropTypes.string,
    note: PropTypes.string,
};
