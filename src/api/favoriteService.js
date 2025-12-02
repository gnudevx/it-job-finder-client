import api from "./axiosInstance";

export const getMyFavorites = () => {
    return api.get("/favorites");
};

export const addFavorite = (jobID) => {
    return api.post("/favorites", { jobID });
};

export const removeFavorite = (jobID) => {
    return api.delete(`/favorites/${jobID}`);
};
