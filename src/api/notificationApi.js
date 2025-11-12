
import { mockNotifications } from "@models/mockNotifications.js";

export function fetchNotifications(page = 1, limit = 10) {
    return new Promise(resolve => {
        setTimeout(() => {
            const start = (page - 1) * limit;
            const end = start + limit;
            const pageData = mockNotifications.slice(start, end);

            resolve({
                data: pageData,
                total: mockNotifications.length,
                page,
                totalPages: Math.ceil(mockNotifications.length / limit)
            });
        }, 300); // mô phỏng API delay
    });
}