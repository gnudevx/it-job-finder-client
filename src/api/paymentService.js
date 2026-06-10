import axiosClient from '@/services/axiosClient';

const paymentService = {
  createMoMoPayment: (packageId) => axiosClient.post('/api/payments/momo/create', { packageId }),

  createStripePayment: (packageId) =>
    axiosClient.post('/api/payments/stripe/create', { packageId }),
};

export default paymentService;
