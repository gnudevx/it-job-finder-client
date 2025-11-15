export function validateStep1Fields(form) {
    return {
        title: !!(form.title && form.title.trim()),
        specialization: !!form.specialization,
        level: !!form.level,
        jobType: !!form.jobType,
        salary:
            form.salaryNegotiable ||
            (!!form.salaryFrom &&
                !!form.salaryTo &&
                Number(form.salaryFrom) <= Number(form.salaryTo)),
    };
}

export function validateStep1(form) {
    return validateStep1Fields(form);
}
