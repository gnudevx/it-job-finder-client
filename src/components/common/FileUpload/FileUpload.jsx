import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from '@/redux/slices/globalSlice';
import styles from './FileUpload.module.scss';
import PropTypes from 'prop-types';

export default function FileUpload({ files, onChange, accept, note }) {
  const inputRef = useRef();
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (!selectedFiles.length) return;

    const validFormats = [
      'image/gif',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/bmp',
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
      'application/msword', // .doc
    ];

    let newFiles = [...files];

    for (let file of selectedFiles) {
      if (!validFormats.includes(file.type)) {
        dispatch(setNotification({ message: `File ${file.name} có định dạng không hợp lệ.`, type: 'error' }));
        continue;
      }
      if (file.size > 5 * 1024 * 1024) {
        dispatch(setNotification({ message: `File ${file.name} vượt quá 5MB.`, type: 'error' }));
        continue;
      }
      newFiles.push(file);
    }

    if (newFiles.length > 2) {
      dispatch(setNotification({ message: 'Chỉ được tải tối đa 2 file!', type: 'error' }));
      newFiles = newFiles.slice(0, 2);
    }

    onChange(newFiles);
    e.target.value = ''; // reset input
  };

  return (
    <div
      className={`${styles.uploadBox} ${files?.length ? styles.hasFile : ''}`}
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
