import React from "react";
import PropTypes from "prop-types";
import styles from "./Sidebar.module.scss";
import SidebarStepSubitems from "./SidebarStepSubitems";


export default function Sidebar({ steps = [], current = 0, onClick, validation = {} }) {
    const step1Fields = [
        { key: "title", label: "Tiêu đề tin", valid: validation.title },
        { key: "specialization", label: "Vị trí chuyên môn", valid: validation.specialization },
        { key: "level", label: "Cấp bậc", valid: validation.level },
        { key: "jobType", label: "Loại công việc", valid: validation.jobType },
        { key: "salary", label: "Mức lương", valid: validation.salary },
    ];

    const doneCountStep1 = step1Fields.filter(f => f.valid).length;
    const step2Fields = [
        { key: "jobDescription", label: "Mô tả công việc", valid: validation.jobDescription },
        { key: "requirements", label: "Yêu cầu", valid: validation.requirements },
        { key: "benefits", label: "Quyền lợi", valid: validation.benefits },
        { key: "city", label: "Tỉnh/Thành phố", valid: validation.city },
        { key: "address", label: "Địa chỉ làm việc", valid: validation.address },
    ];

    const doneCountStep2 = step2Fields.filter(f => f.valid).length;
    const step3Fields = [
        { key: "education", label: "Học vấn", valid: validation.education },
        { key: "experience", label: "Kinh nghiệm", valid: validation.experience },
        { key: "ageRange", label: "Độ tuổi", valid: validation.ageRange },
    ];
    const step4Fields = [
        { key: "applicationDeadline", label: "Hạn nhận hồ sơ", valid: validation.applicationDeadline },
        { key: "quantity", label: "Số lượng tuyển", valid: validation.quantity },
        { key: "receiverName", label: "Họ và tên người nhận", valid: validation.receiverName },
        { key: "receiverPhone", label: "Số điện thoại", valid: validation.receiverPhone },
        { key: "receiverEmail", label: "Email nhận hồ sơ", valid: validation.receiverEmail },
    ];
    const doneCountStep4 = step4Fields.filter(f => f.valid).length;

    const doneCountStep3 = step3Fields.filter(f => f.valid).length;
    return (
        <div className={styles.sidebarCard}>
            <ol className={styles.stepsList}>
                {steps.map((st, i) => (
                    <li
                        key={st}
                        className={`${styles.step} ${i === current ? styles.active : ""}`}
                        onClick={() => onClick(i)}
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
    current: PropTypes.number,
    onClick: PropTypes.func,
    validation: PropTypes.object,
};
