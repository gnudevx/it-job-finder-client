import React, { useContext } from "react";
import { CreateJobContext } from '@views/employers/pages/CreateJob/CreateJobContext';
import PropTypes from "prop-types";
import styles from "./Sidebar.module.scss";
import SidebarStepSubitems from "./SidebarStepSubitems";
export default function Sidebar({ steps = [] }) {
    const { currentStep, setCurrentStep, validatedFields } = useContext(CreateJobContext);
    const step1Fields = [
        { key: "title", label: "Tiêu đề tin", valid: validatedFields.title },
        { key: "specialization", label: "Vị trí chuyên môn", valid: validatedFields.specialization },
        { key: "level", label: "Cấp bậc", valid: validatedFields.level },
        { key: "jobType", label: "Loại công việc", valid: validatedFields.jobType },
        { key: "salary", label: "Mức lương", valid: validatedFields.salary },
    ];
    const doneCountStep1 = step1Fields.filter(f => f.valid).length;
    const step2Fields = [
        { key: "jobDescription", label: "Mô tả công việc", valid: validatedFields.jobDescription },
        { key: "requirements", label: "Yêu cầu", valid: validatedFields.requirements },
        { key: "benefits", label: "Quyền lợi", valid: validatedFields.benefits },
        { key: "province", label: "Tỉnh/Thành phố", valid: validatedFields.province },
        { key: "address", label: "Địa chỉ làm việc", valid: validatedFields.address },
    ];

    const doneCountStep2 = step2Fields.filter(f => f.valid).length;
    const step3Fields = [
        { key: "education", label: "Học vấn", valid: validatedFields.education },
        { key: "experience", label: "Kinh nghiệm", valid: validatedFields.experience },
        { key: "ageRange", label: "Độ tuổi", valid: validatedFields.ageRange },
    ];
    const doneCountStep3 = step3Fields.filter(f => f.valid).length;
    const step4Fields = [
        { key: "applicationDeadline", label: "Hạn nhận hồ sơ", valid: validatedFields.applicationDeadline },
        { key: "quantity", label: "Số lượng tuyển", valid: validatedFields.quantity },
        { key: "receiverName", label: "Họ và tên người nhận", valid: validatedFields.receiverName },
        { key: "receiverPhone", label: "Số điện thoại", valid: validatedFields.receiverPhone },
        { key: "receiverEmail", label: "Email nhận hồ sơ", valid: validatedFields.receiverEmail },
    ];
    const doneCountStep4 = step4Fields.filter(f => f.valid).length;
    return (
        <div className={styles.sidebarCard}>
            <ol className={styles.stepsList}>
                {steps.map((st, i) => (
                    <li
                        key={st}
                        className={`${styles.step} ${i === currentStep ? styles.active : ""}`}
                        onClick={() => setCurrentStep(i)}
                    >
                        <div className={styles.stepHeader}>
                            <span className={styles.index}>{i + 1}</span>
                            <span className={styles.label}>{st}</span>

                            {i === 0 && <span className={styles.progress}>{doneCountStep1}/5</span>}
                            {i === 1 && <span className={styles.progress}>{doneCountStep2}/5</span>}
                            {i === 2 && <span className={styles.progress}>{doneCountStep3}/3</span>}
                            {i === 3 && <span className={styles.progress}>{doneCountStep4}/5</span>}
                        </div>

                        {i === 0 && <SidebarStepSubitems fields={step1Fields} />}
                        {i === 1 && <SidebarStepSubitems fields={step2Fields} />}
                        {i === 2 && <SidebarStepSubitems fields={step3Fields} />}
                        {i === 3 && <SidebarStepSubitems fields={step4Fields} />}
                    </li>
                ))}
            </ol>
        </div>
    );
}
Sidebar.propTypes = {
    steps: PropTypes.arrayOf(PropTypes.string),

};
