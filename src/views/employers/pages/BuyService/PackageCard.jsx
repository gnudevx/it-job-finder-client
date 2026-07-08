import React from 'react';
import { Check, X } from 'lucide-react';
import PropTypes from 'prop-types';
import styles from './PackageCard.module.scss';

const PackageCard = ({ pkg, isSelected, onCheckout, isLoading }) => {
  const actionLabel = pkg.tier === 'FREE' ? 'Chọn' : 'Thanh toán';
  const buttonLabel = isLoading
    ? 'Đang cập nhật...'
    : isSelected && pkg.tier !== 'FREE'
      ? 'Đang chọn'
      : isSelected && pkg.tier === 'FREE'
        ? 'Đã chọn'
        : actionLabel;
  const buttonClass = isSelected
    ? pkg.tier === 'FREE'
      ? styles.btnSelectedFree
      : styles.btnSelected
    : pkg.highlight
      ? styles.btnHighlight
      : styles.btn;

  return (
    <div className={`${styles.card} ${pkg.highlight ? styles.highlight : ''}`}>
      {pkg.highlight && <div className={styles.popularBadge}>Phổ biến nhất</div>}
      <div className={styles.header}>
        <h3>{pkg.name}</h3>
        <p>{pkg.tier}</p>
      </div>
      <div className={styles.price}>
        <span>{pkg.price}</span>
        <span>/tháng</span>
      </div>
      <p className={styles.description}>{pkg.description}</p>
      <ul className={styles.features}>
        {pkg.features.map((feature, idx) => (
          <li key={idx} className={styles.featureItem}>
            {feature.included ? (
              <Check className={styles.iconIncluded} />
            ) : (
              <X className={styles.iconExcluded} />
            )}
            <span className={feature.included ? styles.featureText : styles.featureTextExcluded}>
              {feature.text}
            </span>
          </li>
        ))}
      </ul>
      <button className={buttonClass} onClick={onCheckout} disabled={isLoading}>
        {buttonLabel}
      </button>
    </div>
  );
};

PackageCard.propTypes = {
  pkg: PropTypes.object.isRequired,
  onCheckout: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
};

export default PackageCard;
