import axiosClient from "@/services/axiosClient.js";

export const getMyFavorites = () => {
    return axiosClient.get("/api/favorites");
};

export const addFavorite = (jobID) => {
    return axiosClient.post("/api/favorites", { jobID });
};

export const removeFavorite = (jobID) => {
    return axiosClient.delete(`/api/favorites/${jobID}`);
};
