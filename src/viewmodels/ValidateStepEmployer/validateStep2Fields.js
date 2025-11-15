// Step2.validate.js
export function validateStep2Fields(form) {
    return {
        jobDescription: !!(form.jobDescription && form.jobDescription.trim()),
        requirements: !!(form.requirements && form.requirements.trim()),
        benefits: !!(form.benefits && form.benefits.trim()),
        city: !!form.city,
        address: !!(form.address && form.address.trim()),
    };
}

export function validateStep2(form) {
    return validateStep2Fields(form);
}
