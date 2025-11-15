import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { IoChevronDown, IoChevronForwardSharp } from 'react-icons/io5';
import styles from './StepForms.module.scss';

import Step1Form from './Step1Form';
import Step2Form from './Step2Form';
import Step3Form from './Step3Form';
import Step4Form from './Step4Form';

import ConfirmPublishModal from "./ConfirmPublishModal";

export default function StepForms({
    openSteps,
    onToggleStep,
    steps,
    form,
    onChange,
    onNext,
    onFieldBlur,
    onSaveDraft,
    onPublish
}) {

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

    const handleConfirmPublish = () => {
        setShowConfirm(false);
        onPublish();   // gọi API publish
    };

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
                            onClick={() => onToggleStep(index)}
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
                                {index === 0 && <Step1Form form={form} onChange={onChange} onNext={onNext} onFieldBlur={onFieldBlur} />}
                                {index === 1 && <Step2Form form={form} onChange={onChange} onNext={onNext} onBlur={onFieldBlur} />}
                                {index === 2 && <Step3Form form={form} onChange={onChange} onNext={onNext} onBlur={onFieldBlur} />}
                                {index === 3 && <Step4Form form={form} onChange={onChange} onBlur={onFieldBlur} />}
                            </div>
                        )}
                    </div>
                );
            })}

            <div className={styles.btnWrapper}>
                <button className={styles.draftButton} onClick={onSaveDraft}>
                    Lưu nháp
                </button>

                <button className={styles.submitButton} onClick={handleSubmit}>
                    Hoàn thành
                </button>
            </div>

            {/* MODAL */}
            <ConfirmPublishModal
                open={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={handleConfirmPublish}
            />
        </div>
    );
}

StepForms.propTypes = {
    openSteps: PropTypes.array.isRequired,
    onToggleStep: PropTypes.func.isRequired,
    steps: PropTypes.array.isRequired,
    form: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onNext: PropTypes.func,
    onFieldBlur: PropTypes.func,
    onSaveDraft: PropTypes.func.isRequired,
    onPublish: PropTypes.func.isRequired
};
