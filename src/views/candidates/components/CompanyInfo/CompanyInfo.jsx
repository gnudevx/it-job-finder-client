import PropTypes from 'prop-types';
import styles from './CompanyInfo.module.scss';

const COMPANY_SIZE_MAP = {
  small: 'Dưới 50 nhân viên',
  medium: '50–199 nhân viên',
  large: '200+ nhân viên',
};

export default function CompanyInfo({ company }) {
  return (
    <div className={styles.companyPage}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.logoBox}>
          <img src={company.logo} alt={company.name} />
        </div>

        <div className={styles.headerInfo}>
          <h1>{company.name}</h1>

          {company.website && (
            <a href={`https://${company.website}`} target="_blank" rel="noreferrer">
              🌐 {company.website}
            </a>
          )}

          <div className={styles.meta}>
            <span>👥 {COMPANY_SIZE_MAP[company.size] || 'Chưa cập nhật'}</span>
          </div>
          <div className={styles.meta}>
            <span>🏭 {company.industry}</span>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className={styles.body}>
        <div className={styles.left}>
          <section className={styles.block}>
            <h2>Giới thiệu công ty</h2>
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{
                __html: company.description,
              }}
            />
          </section>
        </div>

        <div className={styles.right}>
          <section className={styles.block}>
            <h2>Thông tin liên hệ</h2>
            <ul className={styles.contact}>
              <li>
                <strong>Địa chỉ:</strong> {company.address}
              </li>
              <li>
                <strong>Điện thoại:</strong> {company.phone}
              </li>
              <li>
                <strong>Email:</strong> {company.email}
              </li>
              <li>
                <strong>MST:</strong> {company.taxCode}
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

CompanyInfo.propTypes = {
  company: PropTypes.shape({
    name: PropTypes.string.isRequired,
    logo: PropTypes.string,
    website: PropTypes.string,
    size: PropTypes.string,
    field: PropTypes.string,
    industry: PropTypes.string,
    description: PropTypes.string,
    address: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    taxCode: PropTypes.string,
  }).isRequired,
};
