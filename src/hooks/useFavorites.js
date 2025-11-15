import { useState, useEffect } from "react";

export default function useFavorites() {
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem("favorites");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (jobId) => {
        setFavorites((prev) => {
            if (prev.includes(jobId)) {
                return prev.filter((id) => id !== jobId);
            }
            return [...prev, jobId];
        });
    };

    const isFavorite = (jobId) => favorites.includes(jobId);

    return { favorites, toggleFavorite, isFavorite };
}
