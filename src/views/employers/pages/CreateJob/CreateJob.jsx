import React, { useState } from 'react';
import styles from './CreateJob.module.scss';

import Preview from '@views/employers/components/Createjob/Preview/Preview.jsx';
import Sidebar from '@views/employers/components/Createjob/Sidebar/Sidebar.jsx';
import StepForms from '@views/employers/components/Createjob/StepForms/StepForms.jsx';

import { validateStep1 } from "@/viewmodels/ValidateStepEmployer/validateStep1Fields";
import { validateStep2 } from "@/viewmodels/ValidateStepEmployer/validateStep2Fields";
import { validateStep3 } from '@/viewmodels/ValidateStepEmployer/validateStep3Fields';
import { validateStep4 } from '@/viewmodels/ValidateStepEmployer/validateStep4Fields';

export default function CreateJob() {
    const steps = [
        'Thông tin chung',
        'Mô tả công việc',
        'Kỳ vọng về ứng viên',
        'Thông tin nhận hồ sơ',
    ];

    const fieldStepMap = {
        // step 1
        title: 1,
        specialization: 1,
        level: 1,
        jobType: 1,
        salaryFrom: 1,
        salaryTo: 1,

        // step 2
        jobDescription: 2,
        requirements: 2,
        benefits: 2,
        city: 2,
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

    const [currentStep, setCurrentStep] = useState(0);

    const [form, setForm] = useState({
        title: '',
        specialization: '',
        level: '',
        jobType: '',
        salaryFrom: '',
        salaryTo: '',

        jobDescription: '',
        requirements: '',
        benefits: '',
        city: '',
        address: '',
        domainKnowledge: [],
    });

    const [openSteps, setOpenSteps] = useState([0]);

    function updateField(path, value) {
        setForm(prev => ({ ...prev, [path]: value }));
    }

    function toggleStep(index) {
        setOpenSteps(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    }

    const [validatedFields, setValidatedFields] = useState({});

    const handleFieldBlur = (fieldName) => {
        let result;

        if (fieldStepMap[fieldName] === 1) {
            const step1Fields = validateStep1(form);
            result = step1Fields[fieldName];
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

        setValidatedFields(prev => ({
            ...prev,
            [fieldName]: result
        }));
    };

    return (
        <div className={styles.pageWrap}>
            <div className={styles.container}>
                <aside className={styles.leftSidebar}>
                    <Sidebar
                        steps={steps}
                        current={currentStep}
                        onClick={(i) => {
                            setCurrentStep(i);
                            toggleStep(i); // nếu muốn mở/đóng step content
                        }}
                        validation={validatedFields}
                    />
                </aside>

                <main className={styles.body}>
                    <div className={styles.header}></div>

                    <div className={styles.formArea}>
                        <StepForms
                            openSteps={openSteps}
                            onToggleStep={toggleStep}
                            steps={steps}
                            form={form}
                            onChange={updateField}
                            onFieldBlur={handleFieldBlur}
                            onNext={() => setCurrentStep(s => Math.min(s + 1, steps.length - 1))}
                            onPrev={() => setCurrentStep(s => Math.max(s - 1, 0))}
                        />
                    </div>
                </main>

                <aside className={styles.rightPreview}>
                    <Preview form={form} />
                </aside>
            </div>
        </div>
    );
}
