# Tích hợp Thanh toán MoMo + Stripe – Test Mode End-to-End

## Tổng quan

Tích hợp **song song** hai cổng thanh toán:

- **MoMo** (sandbox đã có, sửa lỗi auth + redirect)
- **Stripe** (mới hoàn toàn – Checkout Session + Webhook)

## Proposed Changes

### BACKEND

#### [MODIFY] payment.controller.js

- Thêm Stripe Checkout Session + Webhook handler
- Sửa MoMo redirectUrl/ipnUrl đọc từ env

#### [MODIFY] payments.router.js

- Thêm route `/stripe/create` và `/stripe/webhook`

#### [MODIFY] payment.model.js

- Thêm field `provider: enum ['MOMO', 'STRIPE']`

#### [MODIFY] app.js

- Thêm Stripe webhook route trước express.json()

#### [MODIFY] .env

- Thêm STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, MOMO_REDIRECT_URL, MOMO_IPN_URL

### FRONTEND

#### [NEW] src/api/paymentService.js

- API service layer dùng axiosClient (có auth token)

#### [MODIFY] Payment.jsx

- UI chọn MoMo / Stripe, dùng paymentService thay raw fetch

#### [MODIFY] Payment.module.scss

- Thêm style cho Stripe method card

#### [NEW] PaymentResult.jsx + PaymentResult.module.scss

- Trang kết quả thanh toán (success/fail) cho cả MoMo và Stripe

#### [MODIFY] employerRoutes.js

- Thêm route payment/result
