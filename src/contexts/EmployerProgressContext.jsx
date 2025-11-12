// contexts/EmployerProgressContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { getEmployerSteps, updateEmployerStep } from "@/utils/stepProgress";
import PropTypes from "prop-types";
const EmployerProgressContext = createContext();

export function EmployerProgressProvider({ children }) {
    const [steps, setSteps] = useState(getEmployerSteps());

    useEffect(() => {
        // mỗi lần mount lấy từ localStorage (phòng trường hợp user đã có sẵn)
        setSteps(getEmployerSteps());
    }, []);

    const setStep = (key, val = true) => {
        updateEmployerStep(key, val);           // persist vào localStorage
        setSteps((s) => ({ ...s, [key]: val })); // cập nhật context state
    };

    return (
        <EmployerProgressContext.Provider value={{ steps, setStep }}>
            {children}
        </EmployerProgressContext.Provider>
    );
}

export const useEmployerProgress = () => useContext(EmployerProgressContext);

EmployerProgressProvider.propTypes = {
    children: PropTypes.node.isRequired,
};