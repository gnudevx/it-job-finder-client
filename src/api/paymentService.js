import axiosClient from '@/services/axiosClient';

const paymentService = {
  createMoMoPayment: (packageId) => axiosClient.post('/api/payments/momo/create', { packageId }),

  createStripePayment: (packageId) =>
    axiosClient.post('/api/payments/stripe/create', { packageId }),

  createVNPayPayment: (packageId) => axiosClient.post('/api/payments/vnpay/create', { packageId }),
};

export default paymentService;
