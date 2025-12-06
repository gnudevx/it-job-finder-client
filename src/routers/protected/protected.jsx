import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import employerApiService from "@/api/employerSerivce.js";
import PropTypes from "prop-types";
export default function ProtectedRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        const checkProgress = async () => {
            try {
                const res = await employerApiService.getEmployerProgressService();
                const steps = res.steps;

                const verified =
                    steps.phoneVerified && steps.companyInfoUpdated && steps.licenseUploaded;

                setIsVerified(verified);
            } catch (err) {
                console.error("Lấy progress thất bại", err);
                setIsVerified(false);
            } finally {
                setLoading(false);
            }
        };

        checkProgress();
    }, []);

    if (loading) return <div>Đang kiểm tra quyền truy cập...</div>;

    // Nếu chưa xác thực → redirect tới trang xác thực
    if (!isVerified) {
        return <Navigate to="/employer/employer-verify" replace />;
    }

    // Nếu đã xác thực → render Outlet (route con)
    return children ? children : <Outlet />;
}
ProtectedRoute.propTypes = {
    children: PropTypes.node,
};
