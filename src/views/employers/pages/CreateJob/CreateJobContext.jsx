import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from "sonner";
import { validateStep1 } from "@/viewmodels/ValidateStepEmployer/validateStep1Fields";
import { validateStep2 } from "@/viewmodels/ValidateStepEmployer/validateStep2Fields";
import { validateStep3 } from "@/viewmodels/ValidateStepEmployer/validateStep3Fields";
import { validateStep4 } from "@/viewmodels/ValidateStepEmployer/validateStep4Fields";
import jobApiService from '@api/jobApiService.js';
import { checkJobLimit } from "@/utils/jobUtils";
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
        education: 3, experience: 3, gender: 3, ageRange: 3, portfolioRequired: 3, mustHaveSkills: 3, optionalSkills: 3, languages: 3,
        applicationDeadline: 4, quantity: 4, receiverName: 4, receiverPhone: 4, receiverEmail: 4
    };

    const [form, setForm] = useState({
        title: '', specialization: '',
        level: '', jobType: '',
        salaryFrom: '',
        salaryTo: '',
        salaryType: '',
        workingType: '',
        experience: '',
        jobDescription: '',
        requirements: '',
        benefits: '',
        workingTime: { dayFrom: '', dayTo: '', timeFrom: '', timeTo: '' },
        province: '', district: '', ward: '', address: '',
        domainKnowledge: [],
        education: '',
        gender: '',
        ageRange: '',
        portfolioRequired: false, mustHaveSkills: [], optionalSkills: [], languages: [],
        applicationDeadline: '', quantity: '', receiverName: '', receiverPhone: '', receiverEmail: '', allowOnlineApply: true,
    });
    const [jobLimitVersion, setJobLimitVersion] = useState(0);
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
    const [initialPublishStatus, setInitialPublishStatus] = useState("draft");
    const [originalJob, setOriginalJob] = useState(null);
    useEffect(() => {
        if (isEditing && originalJob) {
            setInitialPublishStatus(originalJob.publishStatus);
        }
    }, [isEditing, originalJob]);
    const handleSubmitJob = async (type = "publish") => {
        const jobLimit = await checkJobLimit();
        if (!jobLimit) return; // Nếu không thể kiểm tra, không tiếp tục

        if (jobLimit.limitReached) {
            toast.error(`Gói FREE chỉ có thể đăng ${jobLimit.maxPosts} tin/tháng.`);
            return; // Nếu đã hết hạn mức, không cho phép tạo thêm tin
        }
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
        if (!isEditing) {
            // Tạo mới
            payload.publishStatus = type === "publish" ? "pending" : "draft";
        } else {
            // Chỉnh sửa
            payload.publishStatus =
                initialPublishStatus === "draft" ? "draft" : "pending";
        }

        try {
            let res;

            if (isEditing && jobId) {
                // UPDATE JOB
                res = await jobApiService.updateJob(jobId, payload);
            } else {
                // CREATE JOB
                res = await jobApiService.createJob(payload);
            }
            console.log("asdasdsad: ", res.data)
            if (res.success) {
                setJobLimitVersion(v => v + 1); // Cập nhật phiên bản hạn mức tin đăng
                toast.success(
                    isEditing
                        ? "Cập nhật tin thành công!"
                        : `🎉 ${type === "publish" ? "Tin đã được lưu, đợi phản hồi từ admin" : "Lưu nháp"} thành công!`
                );
            } else {
                toast.error(res.data.message || "Có lỗi xảy ra");
            }
        } catch (err) {
            console.error(err);
            toast.error("Có lỗi xảy ra, vui lòng thử lại!");
        }
    };

    useEffect(() => {
        if (!jobId) return;
        let cancelled = false;
        const fetchJobDetail = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`/employer/jobs/edit/${jobId}`);

                if (res.data) {

                    const job = res.data;
                    console.log("hi", res, job.province, job.district, job.ward);
                    const mappedForm = {
                        title: job.title || "",
                        specialization: job.specialization || "",
                        level: job.level || "",
                        jobType: job.jobType || "",
                        salaryNegotiable: job.salary_raw === "Thỏa thuận",

                        salaryFrom: job.salary_raw === "Thỏa thuận" ? "" : (job.salaryFrom || ""),
                        salaryTo: job.salary_raw === "Thỏa thuận" ? "" : (job.salaryTo || ""),
                        salaryCurrency: job.currency_unit || "VND",
                        workingType: job.workingType || "",
                        experience: job.experience || "",
                        jobDescription: Array.isArray(job.jobDescription)
                            ? job.jobDescription.join("\n")
                            : (job.jobDescription || ""),
                        requirements: Array.isArray(job.requirements)
                            ? job.requirements.join("\n")
                            : (job.requirements || ""),
                        benefits: Array.isArray(job.benefits)
                            ? job.benefits.join("\n")
                            : (job.benefits || ""),
                        // benefits: job.benefits || "",
                        workingTime: job.workingTime || { dayFrom: '', dayTo: '', timeFrom: '', timeTo: '' },
                        province: job.province || "",
                        district: job.district || "",
                        ward: job.ward || "",
                        address: job.work_location_detail || "",
                        domainKnowledge: job.domainKnowledge || [],
                        education: job.education || "",
                        experienceLevel: job.experienceLevel || "",
                        gender: job.gender || "",
                        ageRange: job.ageRange || "",
                        portfolioRequired: job.portfolioRequired ?? false,

                        // Map kỹ năng/ngôn ngữ cho đúng định dạng React-Select
                        mustHaveSkills: Array.isArray(job.mustHaveSkills)
                            ? job.mustHaveSkills.map(s => (typeof s === 'object' ? s : { value: s, label: s }))
                            : [],
                        optionalSkills: Array.isArray(job.optionalSkills)
                            ? job.optionalSkills.map(s => (typeof s === 'object' ? s : { value: s, label: s }))
                            : [],
                        languages: Array.isArray(job.languages)
                            ? job.languages.map(l => (typeof l === 'object' ? l : { value: l, label: l }))
                            : [],

                        applicationDeadline: job.applicationDeadline || "",
                        quantity: job.quantity || "",
                        receiverName: job.receiverName || "",
                        receiverPhone: job.receiverPhone || "",
                        receiverEmail: job.receiverEmail || "",
                        receiverAddress: job.receiverAddress || "",
                        allowOnlineApply: job.allowOnlineApply ?? true,
                    };
                    setOriginalJob(job);
                    // 2. Cập nhật State Form
                    setForm(prev => ({ ...prev, ...mappedForm }));
                    setCurrentStep(0);
                }
            } catch (err) { console.error(err); }
            finally { if (!cancelled) setLoading(false); }
        };
        fetchJobDetail();
        return () => { cancelled = true; };
    }, [isEditing, jobId]);
    useEffect(() => {
        // chỉ tự validate automatic nếu đang edit hoặc khi jobId tồn tại
        if (!isEditing && !jobId) return;

        // tránh validate trên form rỗng ban đầu (optional)
        const shouldSkip = Object.values(form).every(v =>
            v === '' || (Array.isArray(v) && v.length === 0)
        );
        if (shouldSkip) return;

        const v1 = validateStep1(form);
        const v2 = validateStep2(form);
        const v3 = validateStep3(form);
        const v4 = validateStep4(form);
        setValidatedFields({ ...v1, ...v2, ...v3, ...v4 });
    }, [form, isEditing, jobId]);


    return (
        <CreateJobContext.Provider value={{
            form, updateField, validatedFields, setValidatedFields,
            currentStep, setCurrentStep, openSteps, toggleStep,
            handleFieldBlur, handleSubmitJob, isEditing, jobId, loading, jobLimitVersion, setJobLimitVersion
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
