import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PACKAGES } from '@/views/employers/pages/BuyService/constants.js';
import { ArrowLeft, Loader2, CheckCircle2, ShieldCheck, Wallet, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import paymentService from '@/api/paymentService';
import styles from './Payment.module.scss';

const Payment = () => {
  const { pkgId } = useParams();
  const navigate = useNavigate();
  const pkg = PACKAGES.find((p) => p.id === pkgId);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('momo');

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      if (paymentMethod === 'momo') {
        // ─── MOMO ────────────────────────
        const data = await paymentService.createMoMoPayment(pkg.id);
        if (!data.payUrl) {
          toast.error('Backend không trả về URL thanh toán MoMo');
          return;
        }
        window.location.href = data.payUrl;
      } else if (paymentMethod === 'stripe') {
        // ─── STRIPE ──────────────────────
        const data = await paymentService.createStripePayment(pkg.id);
        if (!data.url) {
          toast.error('Backend không trả về URL thanh toán Stripe');
          return;
        }
        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.message || 'Lỗi tạo thanh toán. Vui lòng thử lại.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!pkg) {
    return <div className={styles.notFound}>Gói dịch vụ không tồn tại</div>;
  }

  const getPayBtnLabel = () => {
    if (isProcessing) return null;
    if (paymentMethod === 'momo') return 'Thanh toán bằng MoMo';
    return 'Thanh toán bằng Stripe';
  };

  const payBtnClass = paymentMethod === 'stripe' ? styles.payBtnStripe : styles.payBtn;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* TEST MODE BADGE */}
        <div className={styles.testBadge}>
          <span>🧪 TEST MODE</span>
        </div>

        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Quay lại
        </button>

        <div className={styles.layout}>
          {/* LEFT – Payment Methods */}
          <div className={styles.card}>
            <h2 className={styles.title}>
              <Wallet size={18} /> Phương thức thanh toán
            </h2>

            {/* MoMo */}
            <div
              className={`${styles.method} ${paymentMethod === 'momo' ? styles.activeMomo : ''}`}
              onClick={() => setPaymentMethod('momo')}
            >
              <div className={styles.methodInfo}>
                <div className={styles.methodIcon} style={{ background: '#a50064' }}>
                  <span style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>M</span>
                </div>
                <div>
                  <span className={styles.methodName}>Ví MoMo</span>
                  <span className={styles.methodDesc}>Thanh toán qua ví điện tử MoMo</span>
                </div>
              </div>
              {paymentMethod === 'momo' && <CheckCircle2 className={styles.checkMomo} />}
            </div>

            {/* Stripe */}
            <div
              className={`${styles.method} ${paymentMethod === 'stripe' ? styles.activeStripe : ''}`}
              onClick={() => setPaymentMethod('stripe')}
            >
              <div className={styles.methodInfo}>
                <div className={styles.methodIcon} style={{ background: '#635bff' }}>
                  <CreditCard size={16} color="#fff" />
                </div>
                <div>
                  <span className={styles.methodName}>Stripe (Visa / Mastercard)</span>
                  <span className={styles.methodDesc}>Thanh toán quốc tế bằng thẻ tín dụng</span>
                </div>
              </div>
              {paymentMethod === 'stripe' && <CheckCircle2 className={styles.checkStripe} />}
            </div>

            <div className={styles.security}>
              <ShieldCheck size={16} />
              <span>Thanh toán an toàn qua cổng đối tác được mã hóa SSL</span>
            </div>

            {/* Test Info */}
            <div className={styles.testInfo}>
              {paymentMethod === 'momo' ? (
                <>
                  <strong>Thông tin test MoMo:</strong>
                  <p>SĐT: 0000000000 | OTP: 000000 | PIN: 000000</p>
                </>
              ) : (
                <>
                  <strong>Thông tin test Stripe:</strong>
                  <p>Card: 4242 4242 4242 4242 | Exp: 12/34 | CVC: 123</p>
                </>
              )}
            </div>
          </div>

          {/* RIGHT – Order Summary */}
          <div className={styles.card}>
            <h3>Thông tin đơn hàng</h3>
            <p className={styles.pkgName}>{pkg.name}</p>
            <p className={styles.desc}>{pkg.description}</p>

            <div className={styles.divider} />

            <div className={styles.total}>
              <span>Tổng thanh toán</span>
              <strong>{pkg.price}</strong>
            </div>

            <button className={payBtnClass} onClick={handlePayment} disabled={isProcessing}>
              {isProcessing ? <Loader2 className={styles.spin} size={20} /> : getPayBtnLabel()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
