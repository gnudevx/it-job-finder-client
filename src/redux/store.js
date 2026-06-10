/**
 * store.js
 * Đăng ký globalSlice vào Redux store.
 * File này thường đã có sẵn trong project — chỉ cần thêm globalReducer vào.
 */

import { configureStore } from '@reduxjs/toolkit';
import globalReducer from '@/redux/slices/globalSlice.js';
// import các slice khác của bạn ở đây...

export const store = configureStore({
  reducer: {
    global: globalReducer, // ← key "global" khớp với state.global trong selector
    // auth: authReducer,
    // resume: resumeReducer,
  },
});
