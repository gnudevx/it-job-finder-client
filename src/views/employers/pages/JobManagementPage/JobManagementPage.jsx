import React, { useState, useEffect } from "react";
import styles from "./JobManagementPage.module.scss";
import JobFilters from "@views/employers/components/JobManagementPage/JobFilters/JobFilters";
import JobTable from "@views/employers/components/JobManagementPage/JobTable/JobTable";
import axios from "axios";

export default function JobManagementPage() {
    // State lưu bộ lọc
    const [filters, setFilters] = useState({
        search: "",
        visibility: "all",
        approval: "all",
        expired: "all",
        runningService: false
    });

    // State lưu danh sách tin
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const res = await axios.get(
                `/employer/jobs?employer_id=64e2b9b2d3f4a7c1e3b12345`
            );
            console.log(res.data.data)
            setJobs(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={styles.wrapper}>
            <JobFilters filters={filters} setFilters={setFilters} />
            <JobTable jobs={jobs} />
        </div>
    );
}
