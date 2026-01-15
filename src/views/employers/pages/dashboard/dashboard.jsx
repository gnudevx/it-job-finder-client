import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.scss";
import GreetingCard from "@/views/employers/components/Dashboard/GreetingCard/GreetingCard.jsx";
import ProgressCard from "@/views/employers/components/Dashboard/ProgressCard/ProgressCard.jsx";
import ExploreCard from "@/views/employers/components/Dashboard/ExploreCard/ExploreCard.jsx";
import SectionTitle from "@/views/employers/components/Dashboard/SectionTitle/SectionTitle.jsx";
import EmployerMemberCard from "@/views/employers/components/Dashboard/EmployerMemberCard/EmployerMemberCard.jsx";
import { useEmployerProgress } from "@/contexts/EmployerProgressContext";
import dangtin from "@/assets/dangtin.png";
import timkiemcv from "@/assets/timkiem.png";
import muadichvu from "@/assets/muadichvu.png";
import employerService from "@/api/employerSerivce.js";
export default function Dashboard() {
    const { steps, fetchSteps } = useEmployerProgress();
    const [employer, setEmployer] = useState(null);
    const [jobCount, setJobCount] = useState(0);
    useEffect(() => {
        fetchSteps();
        const fetchEmployer = async () => {
            try {
                const res = await employerService.getMe();
                console.log("Employer data:", res);
                setEmployer(res.user); // giả sử API trả về { user: {...} }
                setJobCount(res.jobCount || 0);

            } catch (err) {
                console.error("Không thể lấy thông tin employer:", err);
            }
        };
        fetchEmployer();
    }, []);
    const actions = [
        { title: "Xác thực số điện thoại", link: "/employer/account/phone-verify", completed: steps.phoneVerified },
        { title: "Cập nhật thông tin công ty", link: "/employer/account/settings/company-info", completed: steps.companyInfoUpdated },
        { title: "Cập nhật Giấy đăng ký doanh nghiệp", link: "/employer/account/settings/license", completed: steps.licenseUploaded },
        { title: "Đăng tin tuyển dụng đầu tiên", link: "/employer/jobs/create", completed: jobCount > 0, disabled: true },
    ];

    const exploreData = [
        {
            title: "Đăng tin tuyển dụng",
            btnText: "Thử ngay",
            imageUrl: dangtin,
            link: "/employer/jobs/create", // 👈 thêm dòng này
        },
        {
            title: "Tìm kiếm CV",
            btnText: "Thử ngay",
            imageUrl: timkiemcv,
            link: "/employer/search-cv",
        },
        {
            title: "Mua dịch vụ",
            btnText: "Thử ngay",
            imageUrl: muadichvu,
            link: "/employer/buy-services",
        },
    ];
    const isLastStepDisabled = () => {
        const previous = actions.slice(0, actions.length - 1);
        return !previous.every((a) => a.completed);
    };
    const completedCount = actions.filter((a) => a.completed).length;
    const progressPercent = Math.round((completedCount / actions.length) * 100);
    if (!employer) return <div>Đang tải thông tin của nhà tuyển dụng...</div>;
    return (
        <div className={styles.dashboard}>

            {/* Section 1 */}
            <div className={styles.section}>
                <GreetingCard username={employer.fullName} points={8} progress={progressPercent} />
                <div className={styles.cardGrid}>
                    {actions.map((item, i) => {
                        const isLast = i === actions.length - 1;
                        const disabled =
                            isLast ? isLastStepDisabled() || item.completed : false;
                        return (
                            <ProgressCard
                                key={i}
                                title={item.title}
                                link={item.link}
                                completed={item.completed}
                                disabled={disabled}
                            />
                        );
                    })}
                </div>
            </div>

            {/* Section 2 */}
            <div className={styles.section}>
                <SectionTitle title="Khám phá HireIT dành cho nhà tuyển dụng" />
                <div className={styles.exploreGrid}>
                    {exploreData.map((item, index) => (
                        <ExploreCard
                            key={index}
                            title={item.title}
                            btnText={item.btnText}
                            imageUrl={item.imageUrl}
                            link={item.link} // 👈 thêm prop link
                        />
                    ))}
                </div>
            </div>
            <div className={styles.section}>
                <EmployerMemberCard employer={employer} />
            </div>
        </div>
    );
}
