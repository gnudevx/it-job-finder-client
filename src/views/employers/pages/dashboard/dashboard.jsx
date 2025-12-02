import React, { useEffect } from "react";
import styles from "./Dashboard.module.scss";
import GreetingCard from "@/views/employers/components/Dashboard/GreetingCard/GreetingCard.jsx";
import ProgressCard from "@/views/employers/components/Dashboard/ProgressCard/ProgressCard.jsx";
import ExploreCard from "@/views/employers/components/Dashboard/ExploreCard/ExploreCard.jsx";
import SectionTitle from "@/views/employers/components/Dashboard/SectionTitle/SectionTitle.jsx";
import EmployerMemberCard from "@/views/employers/components/Dashboard/EmployerMemberCard/EmployerMemberCard.jsx";
import { defaultEmployer } from "@/models/EmployerModel.js";
import { useEmployerProgress } from "@/contexts/EmployerProgressContext";
export default function Dashboard() {
    const { steps, fetchSteps } = useEmployerProgress();
    useEffect(() => {
        fetchSteps();
    }, []);
    const actions = [
        { title: "Xác thực số điện thoại", link: "/employer/account/phone-verify", completed: steps.phoneVerified },
        { title: "Cập nhật thông tin công ty", link: "/employer/account/settings/company-info", completed: steps.companyInfoUpdated },
        { title: "Cập nhật Giấy đăng ký doanh nghiệp", link: "/employer/account/settings/license", completed: steps.licenseUploaded },
        { title: "Đăng tin tuyển dụng đầu tiên", link: "#", completed: false, disabled: true },
    ];
    const employer = {
        ...defaultEmployer,
        id: "771778",
        name: "Nguyen Duc Dung",
        email: "22110301@student.hcmute.edu.vn",
        phone: "0389355133",
        tpPoint: 0,
        credit: { main: 0, bonus: 0 },
        isVerified: false,
    };
    const exploreData = [
        {
            title: "Đăng tin tuyển dụng",
            btnText: "Thử ngay",
            imageUrl: "https://cdn-icons-png.flaticon.com/512/1048/1048953.png",
            link: "/employer/jobs/create", // 👈 thêm dòng này
        },
        {
            title: "Tìm kiếm CV",
            btnText: "Thử ngay",
            imageUrl: "https://cdn-icons-png.flaticon.com/512/3135/3135687.png",
            link: "/employer/search-cv",
        },
        {
            title: "Mua dịch vụ",
            btnText: "Thử ngay",
            imageUrl: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
            link: "/employer/services",
        },
    ];
    const isLastStepDisabled = () => {
        const previous = actions.slice(0, actions.length - 1);
        return !previous.every((a) => a.completed);
    };
    const completedCount = actions.filter((a) => a.completed).length;
    const progressPercent = Math.round((completedCount / actions.length) * 100);
    return (
        <div className={styles.dashboard}>

            {/* Section 1 */}
            <div className={styles.section}>
                <GreetingCard username="Nguyen Duc Dung" points={8} progress={progressPercent} />
                <div className={styles.cardGrid}>
                    {actions.map((item, i) => {
                        const isLast = i === actions.length - 1;
                        const disabled = isLast ? isLastStepDisabled() : false;
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
