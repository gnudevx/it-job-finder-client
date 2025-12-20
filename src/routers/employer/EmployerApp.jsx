import { Routes, Route, Navigate } from "react-router-dom";
import EmployerLayout from "@/views/employers/layouts/EmployerLayout.jsx";
import employerRoutes from "../routerConfig/employerRoutes";
const EmployerApp = () => {
    return (
        <Routes>
            <Route path="" element={<EmployerLayout />}>
                {employerRoutes.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} />
                ))}

                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="*" element={<Navigate to="dashboard" replace />} />
            </Route>
        </Routes>
    );
};

export default EmployerApp;
