import React, { useState } from "react";
import styles from "./AppliedJobs.module.scss";

export default function AppliedJobs() {
    const [search] = useState("");
    const jobs = [
        { id: 1, title: "Frontend Developer (ReactJS)", company: "FPT Software", location: "Hà Nội", salary: "20 - 30 triệu", type: "Toàn thời gian" },
        { id: 2, title: "Tester / QA Engineer", company: "VNG Corporation", location: "TP.HCM", salary: "15 - 25 triệu", type: "Hybrid" },
    ];

    const filtered = jobs.filter(
        (job) =>
            job.title.toLowerCase().includes(search.toLowerCase()) ||
            job.company.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className={styles["home-container"]}>

            <div className={styles["jobs-grid"]}>
                {filtered.map((job) => (
                    <div key={job.id} className={styles["job-card"]}>
                        <div className={styles["job-header"]}>
                            <img src="/logo192.png" alt={job.company} />
                            <div className={styles["job-title"]}>{job.title}</div>
                        </div>
                        <div className={styles["company-name"]}>{job.company}</div>
                        <div className={styles["job-meta"]}>
                            <span className={styles.salary}>{job.salary}</span>
                            <span className={styles.location}>{job.location}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}