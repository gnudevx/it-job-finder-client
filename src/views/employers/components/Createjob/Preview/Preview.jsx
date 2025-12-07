import React, { useContext, useEffect, useState } from "react";
import JobDetailModal from "@/components/common/PreviewJob/JobDetailModal.jsx";
import { CreateJobContext } from "@/views/employers/pages/CreateJob/CreateJobContext";
import styles from "./Preview.module.scss";
import JobLimitStatus from "@/views/employers/pages/CreateJob/JobLimitStatus.jsx";
import companyService from "@/api/companyService";

export default function Preview() {
    const { form } = useContext(CreateJobContext);
    const [open, setOpen] = useState(false);
    const [company, setCompany] = useState(null);

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                const res = await companyService.getMyCompany();
                setCompany(res.company);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCompanyData();
    }, []);

    // 🟦 Tạo jobPreviewData dựa trên state company
    const jobPreviewData = {
        title: form.title || "Tiêu đề công việc của bạn",
        name: company?.name || "Chưa có công ty",     // ⭐ OK

        work_location_detail: form.address,
        applicationDeadline: form.applicationDeadline,
        experience: form.experience,
        numberOfPositions: form.quantity,

        salary:
            form.salaryFrom && form.salaryTo
                ? `${form.salaryFrom} - ${form.salaryTo}`
                : "Thỏa thuận",

        createdAt: new Date(),

        jobDescription: form.jobDescription || "",
        requirements: form.requirements?.split("\n") || [],
        benefits: form.benefits?.split("\n") || [],
    };

    return (
        <div className={styles.previewCard}>
            <div className={styles.badge}>Tin cơ bản</div>
            <h3 className={styles.title}>{form.title || 'Cần Intern'}</h3>
            <div className={styles.meta}>{form.level || 'Thực tập sinh'}</div>

            <div className={styles.chips}>
                {form.domainKnowledge?.length ? (
                    form.domainKnowledge.map(k => <span key={k} className={styles.chip}>{k}</span>)
                ) : (
                    <span className={styles.chip}>IT - Phần cứng và máy tính</span>
                )}
            </div>

            <hr />
            <p className={styles.snippet}>
                {(form.jobDescription && form.jobDescription.substring(0, 160)) ||
                    'Mô tả ngắn về công việc sẽ hiển thị ở đây.'}
            </p>

            <button className={styles.viewBtn} onClick={() => setOpen(true)}>
                Xem trước tin đăng
            </button>

            <div className={styles.limitStatusWrap}>
                <JobLimitStatus />
            </div>

            {open && <JobDetailModal job={jobPreviewData} onClose={() => setOpen(false)} />}
        </div>
    );
}
