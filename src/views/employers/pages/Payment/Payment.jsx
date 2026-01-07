import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PACKAGES } from '@/views/employers/pages/BuyService/constants.js';
import {
    ArrowLeft,
    Loader2,
    CheckCircle2,
    ShieldCheck,
    Wallet
} from 'lucide-react';
import styles from './Payment.module.scss';

const Payment = () => {
    const { pkgId } = useParams();
    const navigate = useNavigate();
    const pkg = PACKAGES.find(p => p.id === pkgId);

    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('momo');

    // ✅ LUỒNG MOMO THẬT – GIỮ NGUYÊN
    const handlePayment = async () => {
        if (paymentMethod !== 'momo') {
            alert('ZaloPay hiện chưa được hỗ trợ.');
            return;
        }

        setIsProcessing(true);
        try {
            const res = await fetch('/api/payments/momo/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    packageId: pkg.id,
                    amount: pkg.amount,
                }),
            });

            const data = await res.json();
            if (!data.payUrl) {
                alert('Backend KHÔNG trả về order_url');
                return;
            }

            window.location.href = data.payUrl;
        } catch (err) {
            console.error(err);
            alert('Lỗi tạo thanh toán');
        } finally {
            setIsProcessing(false);
        }
    };

    if (!pkg) {
        return <div className={styles.notFound}>Gói dịch vụ không tồn tại</div>;
    }

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <button className={styles.backBtn} onClick={() => navigate(-1)}>
                    <ArrowLeft size={18} /> Quay lại
                </button>

                <div className={styles.layout}>
                    {/* LEFT */}
                    <div className={styles.card}>
                        <h2 className={styles.title}>
                            <Wallet size={18} /> Phương thức thanh toán
                        </h2>

                        {/* MoMo */}
                        <div
                            className={`${styles.method} ${paymentMethod === 'momo' ? styles.activeMomo : ''
                                }`}
                            onClick={() => setPaymentMethod('momo')}
                        >
                            <span>Ví MoMo1</span>
                            {paymentMethod === 'momo' && <CheckCircle2 />}
                        </div>

                        <div className={styles.security}>
                            <ShieldCheck size={16} />
                            <span>Thanh toán an toàn qua cổng đối tác</span>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className={styles.card}>
                        <h3>Thông tin đơn hàng của bạn</h3>
                        <p className={styles.pkgName}>{pkg.name}</p>
                        <p className={styles.desc}>{pkg.description}</p>

                        <div className={styles.total}>
                            <span>Tổng thanh toán cho đơn hàng</span>
                            <strong>{pkg.price}</strong>
                        </div>

                        <button
                            className={styles.payBtn}
                            onClick={handlePayment}
                            disabled={isProcessing}
                        >
                            {isProcessing ? (
                                <Loader2 className={styles.spin} />
                            ) : (
                                `Thanh toán bằng ${paymentMethod === 'momo' ? 'MoMo' : 'ZaloPay'
                                }`
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
