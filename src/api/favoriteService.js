import axiosClient from "@/services/axiosClient";

export const getMyFavorites = () => {
    return axiosClient.get("/favorites");
};

export const addFavorite = (jobID) => {
    return axiosClient.post("/favorites", { jobID });
};

export const removeFavorite = (jobID) => {
    return axiosClient.delete(`/favorites/${jobID}`);
};
