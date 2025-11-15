export function validateStep4Fields(form) {
    return {
        applicationDeadline: !!form.applicationDeadline,
        quantity: form.quantity > 0,
        receiverName: !!(form.receiverName && form.receiverName.trim()),
        receiverPhone: /^[0-9]{10,11}$/.test(form.receiverPhone),
        receiverEmail: !!form.receiverEmail && form.receiverEmail.includes('@'),
    };
}
export function validateStep4(form) {
    return validateStep4Fields(form);
}
