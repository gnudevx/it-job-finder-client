export const DEFAULT_STEPS = {
    phoneVerified: false,
    companyInfoUpdated: false,
    licenseUploaded: false,
};

export function getEmployerSteps() {
    try {
        const raw = localStorage.getItem("employerSteps");
        if (!raw) return { ...DEFAULT_STEPS };
        return { ...DEFAULT_STEPS, ...JSON.parse(raw) };
    } catch (e) {
        console.error("getEmployerSteps error", e);
        return { ...DEFAULT_STEPS };
    }
}

export function updateEmployerStep(stepKey, value = true) {
    const steps = getEmployerSteps();
    steps[stepKey] = value;
    localStorage.setItem("employerSteps", JSON.stringify(steps));
}
