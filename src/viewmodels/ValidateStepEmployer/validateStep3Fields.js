// Step3.validate.js
export function validateStep3Fields(form) {
    const ageValid =
        /^\s*\d{1,2}\s*-\s*\d{1,2}\s*$/.test(form.ageRange);

    return {
        education: !!form.education,
        experience: !!form.experience,
        gender: true,  // Không bắt buộc
        ageRange: ageValid,
        mustHaveSkills: true, // Không bắt buộc
        optionalSkills: true,
        languages: true,
    };
}

export function validateStep3(form) {
    return validateStep3Fields(form);
}
