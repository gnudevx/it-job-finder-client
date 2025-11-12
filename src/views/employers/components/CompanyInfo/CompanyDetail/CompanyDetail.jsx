import React from "react";
import PropTypes from "prop-types";
import styles from "./CompanyDetail.module.scss";

export default function CompanyDetail({ company, onEdit }) {
    if (!company) return null;

    return (
        <div className={styles.card}>
            <div className={styles.topRow}>
                <div className={styles.avatar}>
                    {company.name ? company.name.slice(0, 2).toUpperCase() : "CN"}
                </div>
                <div className={styles.title}>
                    <h2>{company.name}</h2>
                    <p className={styles.address}>{company.address}</p>
                </div>
                <div className={styles.action}>
                    <button className={styles.btnEdit} onClick={onEdit}>Chỉnh sửa</button>
                </div>
            </div>

            <div className={styles.warn}>
                Bạn đang sử dụng logo mặc định. <a> Cập nhật ngay</a>
            </div>

            <div className={styles.infoGrid}>
                <div className={styles.row}>
                    <div className={styles.cellLabel}>Mã số thuế:</div>
                    <div className={styles.cellValue}>{company.taxCode}</div>

                    <div className={styles.cellLabel}>Website:</div>
                    <div className={styles.cellValue}>{company.website || "--"}</div>
                </div>

                <div className={styles.row}>
                    <div className={styles.cellLabel}>Lĩnh vực hoạt động:</div>
                    <div className={styles.cellValue}>{company.field || "--"}</div>

                    <div className={styles.cellLabel}>Quy mô:</div>
                    <div className={styles.cellValue}>{company.size || "--"}</div>
                </div>

                <div className={styles.row}>
                    <div className={styles.cellLabel}>Email:</div>
                    <div className={styles.cellValue}>{company.email || "--"}</div>

                    <div className={styles.cellLabel}>Số điện thoại:</div>
                    <div className={styles.cellValue}>{company.phone || "--"}</div>
                </div>

                <div className={styles.rowFull}>
                    <div className={styles.cellLabel}>Địa chỉ:</div>
                    <div className={styles.cellValueFull}>{company.address}</div>
                </div>
            </div>

            <div className={styles.description}>
                <h4>Mô tả công ty:</h4>
                <p>{company.description || "Chưa có mô tả."}</p>
            </div>
        </div>
    );
}

CompanyDetail.propTypes = {
    company: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired,
};