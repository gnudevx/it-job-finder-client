import React, { useState } from "react";
import styles from "./JobManagementPage.module.scss";
import JobFilters from "@/views/employers/components/JobManagementPage/JobFilters/JobFilters";
import JobTable from "@/views/employers/components/JobManagementPage/JobTable/JobTable";

export default function JobManagementPage() {
    // State lưu bộ lọc
    const [filters, setFilters] = useState({
        search: "",
        visibility: "all",
        approval: "all",
        expired: "all",
        runningService: false
    });

    // State lưu danh sách tin (mock)
    const [jobs] = useState([
        {
            id: 1953110,
            title: "Ádasdsads",
            campaign: "Ádasdsads",
            visibility: "hidden",
            approval: "pending",
            latestDisplay: null,
            totalDisplay: null,
            service: null,
        }
    ]);

    return (
        <div className={styles.wrapper}>
            {/* Header Filters */}
            <JobFilters filters={filters} setFilters={setFilters} />

            {/* Job Table */}
            <JobTable jobs={jobs} />
        </div>
    );
}
