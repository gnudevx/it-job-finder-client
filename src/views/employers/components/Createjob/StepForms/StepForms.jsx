import React, { useEffect, useRef, useState, useContext } from 'react';
import { IoChevronDown, IoChevronForwardSharp } from 'react-icons/io5';
import styles from './StepForms.module.scss';

import Step1Form from './Step1Form';
import Step2Form from './Step2Form';
import Step3Form from './Step3Form';
import Step4Form from './Step4Form';

import ConfirmPublishModal from "./ConfirmPublishModal";
import { CreateJobContext } from '@views/employers/pages/CreateJob/CreateJobContext';
import PropTypes from 'prop-types';

export default function StepForms({ steps }) {
    const {
        form,
        updateField,
        validatedFields,
        openSteps,
        toggleStep,
        handleFieldBlur,
        handleSubmitJob, isEditing
    } = useContext(CreateJobContext);

    const sectionRefs = useRef([]);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        if (openSteps.length > 0) {
            const lastOpened = openSteps[openSteps.length - 1];
            const element = sectionRefs.current[lastOpened];
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [openSteps]);


    const handleSubmit = () => {
        setShowConfirm(true);
    };
    const handleDraftSubmit = () => {
        handleSubmitJob("draft");
    }

    const handleConfirmPublish = () => {
        setShowConfirm(false);
        handleSubmitJob("publish");
    }


    return (
        <div className={styles.accordionWrap}>
            {steps.map((label, index) => {
                const isOpen = openSteps.includes(index);
                return (
                    <div
                        key={index}
                        className={styles.accordionItem}
                        ref={el => (sectionRefs.current[index] = el)}
                    >
                        <div
                            className={`${styles.accordionHeader} ${isOpen ? styles.active : ''}`}
                            onClick={() => toggleStep(index)}
                        >
                            <div className={styles.headerLeft}>
                                <span className={styles.stepNumber}>{index + 1}</span>
                                <span className={styles.stepLabel}>{label}</span>
                            </div>

                            <span className={styles.arrowIcon}>
                                {isOpen ? <IoChevronForwardSharp /> : <IoChevronDown />}
                            </span>
                        </div>

                        {isOpen && (
                            <div className={styles.accordionBody}>
                                {index === 0 && <Step1Form form={form} onChange={updateField} onBlur={handleFieldBlur} validatedFields={validatedFields} />}
                                {index === 1 && <Step2Form form={form} onChange={updateField} onBlur={handleFieldBlur} validatedFields={validatedFields} />}
                                {index === 2 && <Step3Form form={form} onChange={updateField} onBlur={handleFieldBlur} validatedFields={validatedFields} />}
                                {index === 3 && <Step4Form form={form} onChange={updateField} onBlur={handleFieldBlur} validatedFields={validatedFields} />}
                            </div>
                        )}
                    </div>
                );
            })}

            <div className={styles.btnWrapper}>

                {!isEditing && (
                    <button className={styles.draftButton} onClick={handleDraftSubmit}>
                        Lưu nháp
                    </button>
                )}
                <button className={styles.submitButton} onClick={handleSubmit}>
                    {isEditing ? "Cập nhật" : "Hoàn thành"}
                </button>
            </div>

            <ConfirmPublishModal
                open={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={handleConfirmPublish}
            />
        </div>
    );
}

StepForms.propTypes = {
    steps: PropTypes.arrayOf(PropTypes.string).isRequired
};