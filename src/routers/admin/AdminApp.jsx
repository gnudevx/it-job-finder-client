import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "@/views/admin/layouts/AdminLayout.jsx";
import adminRoutes from "../routerConfig/adminRoutes";

const AdminApp = () => {
    return (
        <Routes>
            <Route element={<AdminLayout />}>
                {adminRoutes.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} />
                ))}

                {/* /admin -> dashboard */}
                <Route path="" element={<Navigate to="dashboard" replace />} />

                {/* fallback */}
                <Route path="*" element={<Navigate to="dashboard" replace />} />
            </Route>
        </Routes>
    );
};

export default AdminApp;
