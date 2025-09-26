import { Navigate, Route, Routes } from "react-router-dom";
import publicRoutes from "./routerConfig/publicRoutes.js";
import privateRoutes from "./routerConfig/privateRoutes.js";
import { RouteWrapper } from "./guards/RouteWrapper";
import { Suspense } from "react";
import { Toaster } from "sonner";
import RootRedirect from "./RootRedirect";

// Component loading riêng
const LoadingScreen = () => (
    <div className="flex items-center justify-center h-screen text-lg font-medium">
        Loading...
    </div>
);

export const AppRouter = () => {
    // Gom chung public + private
    const allRoutes = [...publicRoutes, ...privateRoutes];

    return (
        <>
            {/* Toast thông báo toàn cục */}
            <Toaster position="top-right" richColors />

            <Suspense fallback={<LoadingScreen />}>
                <Routes>
                    <Route path="/" element={<RootRedirect />} />

                    {allRoutes.map(({ path, element, guard }) => (
                        <Route
                            key={path}
                            path={path}
                            element={<RouteWrapper element={element} guard={guard} />}
                        />
                    ))}
                    {/* Route không tồn tại */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Suspense>
        </>
    );
};
