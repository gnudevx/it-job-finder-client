import React from "react";
import styles from "./VerificationForm.module.scss";
import { FaArrowRight } from "react-icons/fa";
import { Circle } from "lucide-react";
export default function VerificationForm() {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h4>
                    Tài khoản xác thực: <span className={styles.level}>Cấp 1/3</span>
                </h4>
                <p>
                    Nâng cấp tài khoản lên <b>cấp 2/3</b> để nhận{" "}
                    <span className={styles.highlight}>100 lượt xem CV</span> ứng viên từ công cụ tìm kiếm CV.
                </p>
            </div>

            <div className={styles.verifySection}>
                <p className={styles.subTitle}>Xác thực thông tin</p>
                <div className={styles.optionList}>
                    <div className={styles.option}>
                        <Circle size={15} />
                        <label htmlFor="phone">Xác thực số điện thoại</label>
                        <div className={styles.arrowWrapper}>
                            <FaArrowRight className={styles.arrowIcon} />
                        </div>
                    </div>

                    <div className={styles.option}>
                        <Circle size={15} />
                        <label htmlFor="company">Cập nhật thông tin công ty</label>
                        <div className={styles.arrowWrapper}>
                            <FaArrowRight className={styles.arrowIcon} />
                        </div>
                    </div>

                    <div className={styles.option}>
                        <Circle size={15} />
                        <label htmlFor="license">Xác thực Giấy đăng ký doanh nghiệp</label>
                        <div className={styles.arrowWrapper}>
                            <FaArrowRight className={styles.arrowIcon} />
                        </div>
                    </div>
                </div>
                <div className={styles.actions}>

                    <button className={styles.moreBtn}>Tìm hiểu thêm</button>
                </div>
            </div>
        </div>
    );
}
