import React, { useState } from 'react';
import styles from './FilterBar.module.scss';


const options = [
    'Tất cả chiến dịch',
    'Chỉ chiến dịch đang mở',
    'Có CV ứng tuyển mới cần xem',
    'Đã kích hoạt tính năng CV đề xuất',
    'Tin tuyển dụng đang hiển thị',
    'Có dịch vụ đang chạy',
];


const FilterBar = () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(options[0]);
    const [clicked, setClicked] = useState(false);

    return (
        <div
            className={`${styles.wrap} ${clicked ? styles.active : ""}`}
            onClick={() => {
                setClicked(!clicked);
            }}
        >
            <div className={styles.left}>
                <div
                    className={styles.selectWrap}
                    onClick={() => {
                        setOpen(!open);
                    }}
                >
                    <span className={styles.selectLabel}>{selected}</span>
                    <svg className={styles.chev} width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9l6 6 6-6" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    {open && (
                        <ul className={styles.dropdown}>
                            {options.map((o) => (
                                <li key={o} onClick={() => { setSelected(o); setOpen(false); }}>{o}</li>
                            ))}
                        </ul>
                    )}
                </div>


                <div className={styles.searchBox}>
                    <svg className={styles.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 21l-4.35-4.35" stroke="#9CA3AF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><circle cx="11" cy="11" r="6" stroke="#9CA3AF" strokeWidth="1.6" /></svg>
                    <input placeholder="Tìm chiến dịch (Nhấn enter để tìm kiếm)" />
                </div>
            </div>


            <div className={styles.right} />
        </div>
    );
};


export default FilterBar;