import styles from "./EmployerList.module.scss";
import PropTypes from "prop-types";

// Lưu ý: Mình đổi tên prop thành 'employers' cho chuẩn nghĩa, 
// nhưng nếu bạn vẫn muốn dùng tên prop là 'candidates' thì cứ đổi lại nhé!
export default function EmployerList({ employers, onSelect }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Tin tuyển dụng đã ứng tuyển</h3>
      </div>

      <div className={styles.list}>
        {employers.map((employer) => (
          <div key={employer.id} className={styles.item}>
            
            <div className={styles.info}>
              {/* Vùng Logo Công ty */}
              <div className={styles.logoWrap}>
                 {/* Giả sử employer.avatar chứa link logo */}
                 <img src={employer.avatar} alt="logo" />
              </div>

              {/* Vùng Text: Tên Job và Tên Công ty */}
              <div className={styles.textContent}>
                {/* Giả sử employer.position là tên Job (VD: Data Engineer) */}
                <h4>{employer.position}</h4>
                {/* Giả sử employer.name là tên Công ty */}
                <span>{employer.name}</span>
              </div>
            </div>

            {/* Nút nhắn tin */}
            <div className={styles.actions}>
              <button onClick={() => onSelect(employer.id)}>
                Nhắn tin
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

EmployerList.propTypes = {
  employers: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};