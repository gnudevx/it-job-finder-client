import axiosClient from "@/services/axiosClient.js";

export default {
    getApplications: () => axiosClient.get("/candidate/connect/applications"),
    createConversation: (employerId, jobId) => axiosClient.post("/candidate/connect/conversations", {
        employerId,
        jobId,
    }),
    getConversationsByCandidate: () => axiosClient.get("/candidate/connect/conversations/candidate"),
};
