import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from "sonner";
import { validateStep1 } from "@/viewmodels/ValidateStepEmployer/validateStep1Fields";
import { validateStep2 } from "@/viewmodels/ValidateStepEmployer/validateStep2Fields";
import { validateStep3 } from "@/viewmodels/ValidateStepEmployer/validateStep3Fields";
import { validateStep4 } from "@/viewmodels/ValidateStepEmployer/validateStep4Fields";

export const CreateJobContext = createContext();

const setNestedPath = (obj, path, value) => {
    const keys = path.split('.');
    const copy = { ...obj };
    let cur = copy;
    for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i];
        cur[k] = { ...(cur[k] || {}) };
        cur = cur[k];
    }
    cur[keys[keys.length - 1]] = value;
    return copy;
};

export const CreateJobProvider = ({ children, isEditing = false, jobId = null }) => {
    const fieldStepMap = {
        title: 1, specialization: 1, level: 1, jobType: 1, salary: 1, salaryFrom: 1, salaryTo: 1,
        jobDescription: 2, requirements: 2, benefits: 2, province: 2, address: 2, workingTime: 2,
        education: 3, experienceLevel: 3, gender: 3, ageRange: 3, portfolioRequired: 3, mustHaveSkills: 3, optionalSkills: 3, languages: 3,
        applicationDeadline: 4, quantity: 4, receiverName: 4, receiverPhone: 4, receiverEmail: 4
    };

    const [form, setForm] = useState({
        title: '', specialization: '', level: '', jobType: '', salaryFrom: '', salaryTo: '', salaryType: '', workingType: '', experience: '',
        jobDescription: '', requirements: '', benefits: '', workingTime: { dayFrom: '', dayTo: '', timeFrom: '', timeTo: '' }, province: '', district: '', ward: '', address: '', domainKnowledge: [],
        education: '', experienceLevel: '', gender: '', ageRange: '', portfolioRequired: false, mustHaveSkills: [], optionalSkills: [], languages: [],
        applicationDeadline: '', quantity: '', receiverName: '', receiverPhone: '', receiverEmail: '', receiverAddress: '', allowOnlineApply: true,
    });

    const [validatedFields, setValidatedFields] = useState({});
    const [currentStep, setCurrentStep] = useState(0);
    const [openSteps, setOpenSteps] = useState([0]);
    const [loading, setLoading] = useState(false);

    const updateField = (path, value) => {
        if (!path) return;
        setForm(prev => path.includes('.') ? setNestedPath(prev, path, value) : { ...prev, [path]: value });
    };

    const toggleStep = (index) => {
        setOpenSteps(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
    };

    const handleFieldBlur = (fieldName) => {
        let result;
        const step = fieldStepMap[fieldName];
        if (step === 1) result = validateStep1(form)[fieldName];
        else if (step === 2) result = validateStep2(form)[fieldName];
        else if (step === 3) result = validateStep3(form)[fieldName];
        else if (step === 4) result = validateStep4(form)[fieldName];
        setValidatedFields(prev => ({ ...prev, [fieldName]: result }));
    };

    const handleSubmitJob = async (type = "publish") => {
        const stepValidations = [validateStep1(form), validateStep2(form), validateStep3(form), validateStep4(form)];
        const allValidation = Object.assign({}, ...stepValidations);
        const errorFields = Object.keys(allValidation).filter(key => !allValidation[key]);
        if (errorFields.length > 0) {
            setValidatedFields(allValidation);
            const stepErrors = {};
            errorFields.forEach(field => { const step = fieldStepMap[field]; if (!stepErrors[step]) stepErrors[step] = []; stepErrors[step].push(field); });
            setOpenSteps(Object.keys(stepErrors).map(s => Number(s) - 1));
            Object.entries(stepErrors).forEach(([step, fields]) => { toast.error(`Bước ${step}: Có lỗi ở các trường: ${fields.join(", ")}`); });
            return;
        }

        const payload = {
            ...form,
            salary_raw: form.salaryNegotiable ? 'Thỏa thuận' : `${form.salaryFrom}-${form.salaryTo} ${form.salaryCurrency || 'VND'}`,
            languages: form.languages?.map(l => l.value) || [],
            mustHaveSkills: form.mustHaveSkills?.map(s => s.value) || [],
            optionalSkills: form.optionalSkills?.map(s => s.value) || [],
            publishStatus: type === "publish" ? "pending" : "draft",
            visibility: "hidden",
            ...(type === "draft" && { approvalStatus: "pending" })
        };

        try {
            const res = await axios.post('/employer/api/jobs/create', payload, { withCredentials: true });
            if (res.data.success) toast.success(`🎉 ${type === "publish" ? "Đăng tin" : "Lưu nháp"} thành công! ID: ${res.data.job._id}`);
            else toast.error("Có lỗi xảy ra: " + res.data.message || "Unknown error");
        } catch (err) {
            console.error(err);
            toast.error("Có lỗi xảy ra, vui lòng thử lại!");
        }
    };

    useEffect(() => {
        if (!isEditing || !jobId) return;
        let cancelled = false;
        const fetchJobDetail = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`/employer/api/jobs/${jobId}`);
                if (cancelled) return;
                if (res.data?.success) {
                    const job = res.data.job;
                    setForm(prev => ({
                        ...prev,
                        title: job.title || "", specialization: job.specialization || "", level: job.level || "", jobType: job.jobType || "",
                        salaryFrom: job.salaryFrom || "", salaryTo: job.salaryTo || "", salaryType: job.salaryType || "", workingType: job.workingType || "", experience: job.experience || "",
                        jobDescription: job.jobDescription || "", requirements: job.requirements || "", benefits: job.benefits || "",
                        workingTime: job.workingTime || { dayFrom: '', dayTo: '', timeFrom: '', timeTo: '' },
                        province: job.province || "", district: job.district || "", ward: job.ward || "", address: job.address || "", domainKnowledge: job.domainKnowledge || [],
                        education: job.education || "", experienceLevel: job.experienceLevel || "", gender: job.gender || "", ageRange: job.ageRange || "", portfolioRequired: job.portfolioRequired ?? false,
                        mustHaveSkills: job.mustHaveSkills?.map(s => ({ value: s, label: s })) || [],
                        optionalSkills: job.optionalSkills?.map(s => ({ value: s, label: s })) || [],
                        languages: job.languages?.map(l => ({ value: l, label: l })) || [],
                        applicationDeadline: job.applicationDeadline || "", quantity: job.quantity || "",
                        receiverName: job.receiverName || "", receiverPhone: job.receiverPhone || "", receiverEmail: job.receiverEmail || "", receiverAddress: job.receiverAddress || "",
                        allowOnlineApply: job.allowOnlineApply ?? true,
                    }));
                    setCurrentStep(0);
                }
            } catch (err) { console.error(err); }
            finally { if (!cancelled) setLoading(false); }
        };
        fetchJobDetail();
        return () => { cancelled = true; };
    }, [isEditing, jobId]);

    return (
        <CreateJobContext.Provider value={{
            form, updateField, validatedFields, setValidatedFields,
            currentStep, setCurrentStep, openSteps, toggleStep,
            handleFieldBlur, handleSubmitJob, isEditing, jobId, loading
        }}>
            {children}
        </CreateJobContext.Provider>
    );
};

CreateJobProvider.propTypes = {
    children: PropTypes.node.isRequired,
    isEditing: PropTypes.bool,
    jobId: PropTypes.string
};
