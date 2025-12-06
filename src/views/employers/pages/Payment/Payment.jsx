import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PACKAGES } from '@/views/employers/pages/BuyService/constants.js';
import { QrCode, CreditCard, ArrowLeft, Loader2 } from 'lucide-react';
import styles from './Payment.module.scss';

const Payment = () => {
    const { pkgId } = useParams();
    const navigate = useNavigate();
    const pkg = PACKAGES.find(p => p.id === pkgId);

    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('qr');

    const handlePayment = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            alert('Thanh toán thành công!');
            navigate('/employer/dashboard');
        }, 2000);
    };

    if (!pkg) return <div>Gói không tồn tại</div>;

    return (
        <div className={styles.section}>
            <button onClick={() => navigate(-1)} className={styles.backBtn}>
                <ArrowLeft /> Quay lại
            </button>

            <div className={styles.grid}>
                <div className={styles.left}>
                    <h2>Thông tin thanh toán</h2>
                    <div className={styles.paymentMethods}>
                        <button
                            onClick={() => setPaymentMethod('qr')}
                            className={paymentMethod === 'qr' ? styles.selected : ''}
                        >
                            <QrCode /> QR
                        </button>
                        <button
                            onClick={() => setPaymentMethod('card')}
                            className={paymentMethod === 'card' ? styles.selected : ''}
                        >
                            <CreditCard /> Card
                        </button>
                    </div>

                    {paymentMethod === 'qr' ? (
                        <div className={styles.qrContainer}>
                            <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${pkg.id}`}
                                alt="QR"
                            />
                        </div>
                    ) : (
                        <div className={styles.cardForm}>
                            <input placeholder="Số thẻ" />
                            <input placeholder="MM/YY" />
                            <input placeholder="CVC" />
                        </div>
                    )}
                </div>

                <div className={styles.right}>
                    <h3>Đơn hàng</h3>
                    <p>{pkg.name}</p>
                    <p>{pkg.price}</p>
                    <button onClick={handlePayment} disabled={isProcessing}>
                        {isProcessing ? <Loader2 className="animate-spin" /> : 'Thanh toán ngay'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Payment;