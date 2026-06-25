import axiosClient from '@/services/axiosClient';

const paymentService = {
  createMoMoPayment: (packageId) => axiosClient.post('/api/payments/momo/create', { packageId }),

  createStripePayment: (packageId) =>
    axiosClient.post('/api/payments/stripe/create', { packageId }),

  createVNPayPayment: (packageId) => axiosClient.post('/api/payments/vnpay/create', { packageId }),

  createQRDemoPayment: (packageId) => axiosClient.post('/api/payments/qr/create', { packageId }),

  confirmQRDemoPayment: (orderId) => axiosClient.post(`/api/payments/qr/confirm/${orderId}`),
};

export default paymentService;
