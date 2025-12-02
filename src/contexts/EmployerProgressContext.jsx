import React, { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import getEmployerProgress from "@/services/employerSerivce.js";

const EmployerProgressContext = createContext();

export function EmployerProgressProvider({ children }) {
    const [steps, setSteps] = useState({
        phoneVerified: false,
        companyInfoUpdated: false,
        licenseUploaded: false,
    });

    // Fetch trạng thái từ backend (gọi 1 lần sau khi đăng nhập)
    const fetchSteps = async () => {
        try {
            const res = await getEmployerProgress.getEmployerProgressService();

            // backend trả { steps: {...} }
            console.log("fetchSteps success", res.steps);
            setSteps(res.steps);
        } catch (err) {
            console.error("fetchSteps failed", err);
        }
    };

    // Cho phép component update một field bất kỳ
    const setStep = (key, val = true) => {
        setSteps((prev) => ({ ...prev, [key]: val }));
    };

    return (
        <EmployerProgressContext.Provider value={{ steps, setStep, fetchSteps }}>
            {children}
        </EmployerProgressContext.Provider>
    );
}

export const useEmployerProgress = () => useContext(EmployerProgressContext);

EmployerProgressProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
