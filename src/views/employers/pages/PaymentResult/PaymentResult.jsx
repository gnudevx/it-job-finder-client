import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, ArrowRight, ShieldCheck, Calendar, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './PaymentResult.module.scss';
import axiosClient from '@/services/axiosClient';

const PaymentResult = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [, setLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState(null);

  const provider = searchParams.get('provider') || 'stripe';
  const status = searchParams.get('status') || 'success';
  const orderId = searchParams.get('orderId') || searchParams.get('requestId');
  const sessionId = searchParams.get('sessionId');

  useEffect(() => {
    // Nếu có orderId, ta fetch thông tin payment từ backend để hiển thị chính xác hơn
    const fetchPaymentStatus = async () => {
      if (!orderId) {
        setLoading(false);
        return;
      }
      try {
        // Fetch trạng thái thanh toán từ backend qua API (nếu backend có hỗ trợ)
        // Nếu chưa có API chi tiết, ta fallback dùng query params
        const url =
          `/api/payments/status/${orderId}` + (sessionId ? `?sessionId=${sessionId}` : '');
        const response = await axiosClient.get(url).catch(() => null);
        if (response) {
          setPaymentDetails(response);
        }
      } catch (err) {
        console.error('Lỗi khi fetch chi tiết thanh toán:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentStatus();
  }, [orderId, sessionId]);

  const isSuccess =
    status === 'success' ||
    (paymentDetails && paymentDetails.status === 'paid') ||
    (paymentDetails && paymentDetails.status === 'approved');

  // Format số tiền VND
  const formatVND = (amount) => {
    if (!amount) return '0 VNĐ';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className={styles.page}>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Status Header */}
        <div className={styles.header}>
          {isSuccess ? (
            <motion.div
              className={styles.iconWrapperSuccess}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            >
              <CheckCircle2 size={72} className={styles.iconSuccess} />
            </motion.div>
          ) : (
            <motion.div
              className={styles.iconWrapperFail}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            >
              <XCircle size={72} className={styles.iconFail} />
            </motion.div>
          )}

          <h1 className={styles.title}>
            {isSuccess ? 'Thanh toán thành công!' : 'Thanh toán thất bại'}
          </h1>
          <p className={styles.subtitle}>
            {isSuccess
              ? 'Tài khoản của bạn đã được nâng cấp. Cảm ơn bạn đã tin dùng dịch vụ của chúng tôi.'
              : 'Giao dịch không được hoàn tất hoặc đã bị hủy từ phía người dùng.'}
          </p>
        </div>

        <div className={styles.divider} />

        {/* Payment Details */}
        <div className={styles.detailsList}>
          <div className={styles.detailRow}>
            <span className={styles.label}>Mã đơn hàng</span>
            <span className={styles.value}>{orderId || 'N/A'}</span>
          </div>

          <div className={styles.detailRow}>
            <span className={styles.label}>Cổng thanh toán</span>
            <span className={styles.value}>
              {provider.toUpperCase() === 'STRIPE' ? 'Stripe (Thẻ quốc tế)' : 'Ví điện tử MoMo'}
            </span>
          </div>

          {paymentDetails && (
            <>
              <div className={styles.detailRow}>
                <span className={styles.label}>Gói dịch vụ</span>
                <span className={`${styles.value} ${styles.tierHighlight}`}>
                  Gói {paymentDetails.tier}
                </span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.label}>Số tiền</span>
                <span className={styles.value}>{formatVND(paymentDetails.amount)}</span>
              </div>
              {paymentDetails.expiresAt && (
                <div className={styles.detailRow}>
                  <span className={styles.label}>Hạn dùng đến</span>
                  <span className={styles.value}>
                    <Calendar size={14} className={styles.inlineIcon} />
                    {new Date(paymentDetails.expiresAt).toLocaleDateString('vi-VN')}
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        {isSuccess && (
          <div className={styles.infoAlert}>
            <Info size={16} />
            <span>
              Thông thường gói sẽ được kích hoạt ngay lập tức. Nếu có sự cố, vui lòng liên hệ hỗ
              trợ.
            </span>
          </div>
        )}

        <div className={styles.divider} />

        {/* Action Buttons */}
        <div className={styles.actions}>
          <button
            className={isSuccess ? styles.primaryBtn : styles.secondaryBtn}
            onClick={() => navigate('/employer/dashboard')}
          >
            Quay lại Dashboard <ArrowRight size={16} />
          </button>

          <button
            className={styles.outlineBtn}
            onClick={() => navigate('/employer/account/activities')}
          >
            Lịch sử giao dịch
          </button>
        </div>

        <div className={styles.footer}>
          <ShieldCheck size={14} />
          <span>Hệ thống bảo mật SSL chứng nhận thanh toán an toàn</span>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentResult;
