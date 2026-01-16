// utils/jobUtils.js

import axios from 'axios';
import { toast } from 'sonner';

export const checkJobLimit = async () => {
    try {
        const res = await axios.get('/employer/account/settings/personal/job-limit');
        return res.data; // Trả về dữ liệu { remaining, limitReached }
    } catch (err) {
        console.error(err);
        toast.error("Không thể kiểm tra hạn mức tin trong tháng");
        return null;
    }
};
