import React, { useState, useEffect, useMemo } from "react";
import styles from "./JobManagementPage.module.scss";
import JobFilters from "@/views/employers/components/JobManagementPage/JobFilters/JobFilters";
import JobTable from "@/views/employers/components/JobManagementPage/JobTable/JobTable";
import axios from "axios";

export default function JobManagementPage() {
    const [filters, setFilters] = useState({
        search: "",
        visibility: "all",
        approval: "all",
        expired: "all",
        runningService: false
    });

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const res = await axios.get(
                `/employer/jobs?employer_id=64e2b9b2d3f4a7c1e3b12345`
            );
            setJobs(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    // filter jobs dựa vào filters
    const filteredJobs = useMemo(() => {
        return jobs.filter(job => {
            // 1. Search theo title
            const matchSearch = job.title
                .toLowerCase()
                .includes(filters.search.toLowerCase());

            // 2. Filter visibility
            const matchVisibility =
                filters.visibility === "all" || job.visibility === filters.visibility;

            // 3. Filter approval
            const matchApproval =
                filters.approval === "all" || job.publishStatus === filters.approval;

            // 4. Filter expired
            const now = new Date();
            let matchExpired = true;
            if (filters.expired === "expired") {
                matchExpired = new Date(job.deadline) < now;
            } else if (filters.expired === "not_expired") {
                matchExpired = new Date(job.deadline) >= now;
            }

            // 5. Filter runningService checkbox
            const matchService = !filters.runningService || job.runningService;

            return matchSearch && matchVisibility && matchApproval && matchExpired && matchService;
        });
    }, [jobs, filters]);

    return (
        <div className={styles.wrapper}>
            <JobFilters filters={filters} setFilters={setFilters} />
            <JobTable jobs={filteredJobs} setJobs={setJobs} />
        </div>
    );
}
