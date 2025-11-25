import { createContext, useState } from 'react';

export const CreateJobContext = createContext();
import PropTypes from 'prop-types';
import { toast } from "sonner";
import { validateStep1 } from "@/viewmodels/ValidateStepEmployer/validateStep1Fields";
import { validateStep2 } from "@/viewmodels/ValidateStepEmployer/validateStep2Fields";
import { validateStep3 } from "@/viewmodels/ValidateStepEmployer/validateStep3Fields";
import { validateStep4 } from "@/viewmodels/ValidateStepEmployer/validateStep4Fields";
import axios from 'axios';
export const CreateJobProvider = ({ children }) => {
    const fieldStepMap = {
        // step 1
        title: 1,
        specialization: 1,
        level: 1,
        jobType: 1,
        salary: 1,
        salaryFrom: 1,
        salaryTo: 1,

        // step 2
        jobDescription: 2,
        requirements: 2,
        benefits: 2,
        province: 2,
        address: 2,
        workingTime: 2,

        // step 3
        education: 3,
        experience: 3,
        ageRange: 3,

        applicationDeadline: 4,
        quantity: 4,
        receiverName: 4,
        receiverPhone: 4,
        receiverEmail: 4,
    };

    const [form, setForm] = useState({
        // STEP 1 — Thông tin chung
        title: '',
        specialization: '',
        level: '',
        jobType: '',
        salaryFrom: '',
        salaryTo: '',
        salaryType: '',
        workingType: '',
        experience: '',

        // STEP 2 — Mô tả công việc
        jobDescription: '',
        requirements: '',
        benefits: '',
        workingTime: {
            dayFrom: '',
            dayTo: '',
            timeFrom: '',
            timeTo: '',
        },
        province: '',
        district: '',
        ward: '',        // ward code
        address: '',
        domainKnowledge: [],

        // STEP 3 — Kỳ vọng về ứng viên
        education: '',
        experienceLevel: '',
        gender: '',
        ageRange: '',
        portfolioRequired: false,
        mustHaveSkills: [],
        optionalSkills: [],
        languages: [],

        // STEP 4 — Thông tin nhận hồ sơ
        applicationDeadline: '',
        quantity: '',
        receiverName: '',
        receiverPhone: '',
        receiverEmail: '',
        receiverAddress: '',
        allowOnlineApply: true,
    });

    const [validatedFields, setValidatedFields] = useState({});
    const [currentStep, setCurrentStep] = useState(0);
    const [openSteps, setOpenSteps] = useState([0]);

    const updateField = (path, value) => {
        setForm(prev => ({ ...prev, [path]: value }));
    };

    const toggleStep = (index) => {
        setOpenSteps(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    };

    const handleFieldBlur = (fieldName) => {
        let result;

        // Validate step tương ứng
        if (fieldStepMap[fieldName] === 1) {
            const step1Fields = validateStep1(form);
            result = step1Fields[fieldName]; // string lỗi hoặc null
        }
        else if (fieldStepMap[fieldName] === 2) {
            const step2Fields = validateStep2(form);
            result = step2Fields[fieldName];
        }
        else if (fieldStepMap[fieldName] === 3) {
            const step3Fields = validateStep3(form);
            result = step3Fields[fieldName];
        }
        else if (fieldStepMap[fieldName] === 4) {
            const step4Fields = validateStep4(form);
            result = step4Fields[fieldName];
        }

        // Lưu lỗi vào state
        setValidatedFields(prev => ({
            ...prev,
            [fieldName]: result
        }));
    };
    const handlePublish = async () => {
        // Validate tất cả step
        const stepValidations = [
            validateStep1(form),
            validateStep2(form),
            validateStep3(form),
            validateStep4(form),
        ];

        // Gộp tất cả validation
        const allValidation = Object.assign({}, ...stepValidations);

        // Lọc field đang lỗi
        const errorFields = Object.keys(allValidation).filter(key => !allValidation[key]);

        if (errorFields.length > 0) {
            setValidatedFields(allValidation);

            // Nhóm lỗi theo step
            const stepErrors = {};
            errorFields.forEach(field => {
                const step = fieldStepMap[field];
                if (!stepErrors[step]) stepErrors[step] = [];
                stepErrors[step].push(field);
            });

            // Mở các step có lỗi
            setOpenSteps(Object.keys(stepErrors).map(s => Number(s) - 1));

            // Toast báo lỗi theo từng step
            Object.entries(stepErrors).forEach(([step, fields]) => {
                toast.error(`Bước ${step}: Có lỗi ở các trường: ${fields.join(", ")}`);
            });

            return; // Dừng không publish
        }
        const payload = {
            ...form,
            salaryFrom: form.salaryNegotiable ? '' : form.salaryFrom,
            salaryTo: form.salaryNegotiable ? '' : form.salaryTo,
            salaryCurrency: form.salaryNegotiable ? '' : form.salaryCurrency,
            salary_raw: form.salaryNegotiable
                ? 'Thỏa thuận'
                : `${form.salaryFrom}-${form.salaryTo} ${form.salaryCurrency || 'VND'}`,
            workingTime: {
                dayFrom: form.workingTime?.dayFrom || '',
                dayTo: form.workingTime?.dayTo || '',
                timeFrom: form.workingTime?.timeFrom || '',
                timeTo: form.workingTime?.timeTo || '',
            },
            languages: form.languages?.map(l => l.value) || [],
            mustHaveSkills: form.mustHaveSkills?.map(s => s.value) || [],
            optionalSkills: form.optionalSkills?.map(s => s.value) || []
        };
        // Nếu không có lỗi, gọi API
        try {
            const response = await axios.post(
                '/employer/api/jobs/create',
                payload,
                { withCredentials: true } // nếu backend dùng cookie/auth
            );

            if (response.data.success) {
                toast.success("🎉 Đăng tin thành công! ID: " + response.data.job._id);
            } else {
                console.log("Có lỗi xảy ra: " + response.data.message || "Unknown error")
                toast.error("Có lỗi xảy ra: " + response.data.message || "Unknown error");
            }
        } catch (err) {
            console.error("Có lỗi xảy ra, vui lòng thử lại!", err);
            toast.error("Có lỗi xảy ra, vui lòng thử lại!");
        }
    };
    return (
        <CreateJobContext.Provider value={{
            form,
            updateField,
            validatedFields,
            setValidatedFields,
            currentStep,
            setCurrentStep,
            openSteps,
            toggleStep,
            handleFieldBlur,
            handlePublish,
        }}>
            {children}
        </CreateJobContext.Provider>
    );
};
CreateJobProvider.propTypes = {
    children: PropTypes.node.isRequired
};