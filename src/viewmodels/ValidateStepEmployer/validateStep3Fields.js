// Step3.validate.js
export function validateStep3Fields(form) {
    const ageValid =
        !form.ageRange ||
        /^[0-9]{1,2}\s*-\s*[0-9]{1,2}$/.test(form.ageRange.trim()); // dạng 22-30

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
