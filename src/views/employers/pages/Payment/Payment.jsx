import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PACKAGES } from '@/views/employers/pages/BuyService/constants.js';
import { ArrowLeft, Loader2, CheckCircle2, ShieldCheck, Wallet, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import QRCode from 'react-qr-code';
import paymentService from '@/api/paymentService';
import styles from './Payment.module.scss';

const Payment = () => {
  const { pkgId } = useParams();
  const navigate = useNavigate();
  const pkg = PACKAGES.find((p) => p.id === pkgId);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [order, setOrder] = useState(null);

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      if (paymentMethod === 'stripe') {
        // STRIPE
        const data = await paymentService.createStripePayment(pkg.id);
        if (!data.url) {
          toast.error('Backend không trả về URL thanh toán Stripe');
          return;
        }
        window.location.href = data.url;
      } else if (paymentMethod === 'vnpay') {
        // VNPAY
        const data = await paymentService.createVNPayPayment(pkg.id);

        window.location.href = data.payUrl;
      } else if (paymentMethod === 'qr') {
        const data = await paymentService.createQRDemoPayment(pkg.id);

        setOrder(data.payment);

        toast.success('QR đã được tạo');
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.message || 'Lỗi tạo thanh toán. Vui lòng thử lại.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirmQR = async () => {
    try {
      await paymentService.confirmQRDemoPayment(order.orderId);

      toast.success('Thanh toán thành công');

      navigate(`/employer/payment/result?provider=qr&orderId=${order.orderId}&status=success`);
    } catch (err) {
      console.error(err);

      toast.error('Xác nhận thanh toán thất bại');
    }
  };

  if (!pkg) {
    return <div className={styles.notFound}>Gói dịch vụ không tồn tại</div>;
  }

  const getPayBtnLabel = () => {
    if (isProcessing) return null;

    switch (paymentMethod) {
      case 'stripe':
        return 'Thanh toán bằng Stripe';
      case 'vnpay':
        return 'Thanh toán bằng VNPAY';
      case 'qr':
        return 'Thanh toán QR';
      default:
        return 'Thanh toán khi nhận hàng';
    }
  };

  const payBtnClass =
    paymentMethod === 'stripe'
      ? styles.payBtnStripe
      : paymentMethod === 'vnpay'
        ? styles.payBtnVnpay
        : paymentMethod === 'qr'
          ? styles.payBtnQr
          : styles.payBtn;

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

            {/* VNPAY */}
            <div
              className={`${styles.method} ${paymentMethod === 'vnpay' ? styles.activeVnpay : ''}`}
              onClick={() => setPaymentMethod('vnpay')}
            >
              <div className={styles.methodInfo}>
                <div
                  className={styles.methodIcon}
                  style={{
                    background: '#005baa',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: 12,
                  }}
                >
                  VNP
                </div>

                <div>
                  <span className={styles.methodName}>VNPAY</span>

                  <span className={styles.methodDesc}>Thanh toán qua VNPAY</span>
                </div>
              </div>

              {paymentMethod === 'vnpay' && <CheckCircle2 className={styles.checkVnpay} />}
            </div>

            {/* QR */}
            <div
              className={`${styles.method} ${paymentMethod === 'qr' ? styles.activeQr : ''}`}
              onClick={() => setPaymentMethod('qr')}
            >
              <div className={styles.methodInfo}>
                <div
                  className={styles.methodIcon}
                  style={{
                    background: '#16a34a',
                    color: '#fff',
                    fontWeight: 700,
                  }}
                >
                  QR
                </div>

                <div>
                  <span className={styles.methodName}>QR</span>

                  <span className={styles.methodDesc}>Mô phỏng thanh toán QR</span>
                </div>
              </div>

              {paymentMethod === 'qr' && <CheckCircle2 className={styles.checkQr} />}
            </div>

            {/* Test Info */}
            <div className={styles.testInfo}>
              {paymentMethod === 'stripe' && (
                <>
                  <strong>Thông tin test Stripe:</strong>
                  <p>Card: 4242 4242 4242 4242 | Exp: 12/34 | CVC: 123</p>
                </>
              )}

              {paymentMethod === 'vnpay' && (
                <>
                  <strong>Thông tin test VNPAY:</strong>
                  <p>Ngân hàng: NCB</p>
                  <p>Thẻ: 9704198526191432198</p>
                  <p>Tên chủ thẻ: NGUYEN VAN A</p>
                  <p>Ngày phát hành: 07/15</p>
                  <p>OTP: 123456</p>
                  <p>Lựa chọn: Thẻ nội địa và tài khoản ngân hàng</p>
                </>
              )}

              {paymentMethod === 'qr' && order && (
                <div className={styles.qrBox}>
                  <QRCode
                    value={`IT Job Finder\nMa don: ${order.orderId}\nSo tien: ${order.amount}\nNoi dung: Thanh toan ${pkg.name}`}
                    size={180}
                  />
                  <p>Mã đơn: {order.orderId}</p>
                  <p>Số tiền: {order.amount.toLocaleString('vi-VN')}đ</p>
                  <button className={styles.payBtnQr} onClick={handleConfirmQR}>
                    Tôi đã thanh toán
                  </button>
                </div>
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
