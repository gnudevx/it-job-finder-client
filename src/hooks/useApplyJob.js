import { applyJob, getMyAppliedJobs } from "@/api/applicationService/candidateApplication";
import { getResumes } from "@/api/resumeService";
import { useEffect, useState } from "react";

export default function useApplyJob(jobId, token) {
    const [myCVs, setMyCVs] = useState([]);
    const [hasApplied, setHasApplied] = useState(false);
    const [selectedCV, setSelectedCV] = useState("");
    const [note, setNote] = useState("");

    useEffect(() => {
        if (!token) return;

        // load CV
        (async () => {
            const res = await getResumes();
            if (Array.isArray(res)) {
                setMyCVs(
                    res.map((cv) => ({
                        id: cv._id,
                        name: cv.fileName,
                        url: cv.fileUrl,
                    }))
                );
            }
        })();

        // load applied jobs
        (async () => {
            const applications = await getMyAppliedJobs(token);
            const applied = applications.some(
                (app) => String(app.jobId._id) === String(jobId)
            );
            setHasApplied(applied);
        })();
    }, [jobId, token]);

    const submitApplication = async () => {
        try {
            await applyJob({
                jobId,
                resumeId: selectedCV,
                coverLetter: note,
                token,
            });
            setHasApplied(true);
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    return {
        myCVs,
        hasApplied,
        selectedCV,
        setSelectedCV,
        note,
        setNote,
        submitApplication,
    };
}
