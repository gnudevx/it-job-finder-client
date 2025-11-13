import { Routes, Route, Navigate } from "react-router-dom";
import CandidateLayout from "@views/candidates/layouts/CandidateLayout.jsx";
import candidateRoutes from "../routerConfig/candidateRoutes";

const CandidateApp = () => {
    return (
        <Routes>
            <Route element={<CandidateLayout />}>
                {candidateRoutes.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} />
                ))}
                {/* /candidate -> home */}
                <Route path="" element={<Navigate to="home" replace />} />
                {/* fallback */}
                <Route path="*" element={<Navigate to="home" replace />} />
            </Route>
        </Routes>
    );
};

export default CandidateApp;
