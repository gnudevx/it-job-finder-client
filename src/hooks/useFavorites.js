import { useState, useEffect } from "react";

export default function useFavorites(authToken) {
    // Nếu không có token → guest → không cho lưu
    const storageKey = authToken ? `favorites_${authToken}` : null;

    const [favorites, setFavorites] = useState(() => {
        if (!storageKey) return [];
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        if (storageKey) {
            localStorage.setItem(storageKey, JSON.stringify(favorites));
        }
    }, [favorites, storageKey]);

    const toggleFavorite = (jobId) => {
        if (!storageKey) {
            alert("Bạn cần đăng nhập để lưu việc!");
            return;
        }

        setFavorites((prev) =>
            prev.includes(jobId)
                ? prev.filter((id) => id !== jobId)
                : [...prev, jobId]
        );
    };

    const isFavorite = (jobId) =>
        storageKey ? favorites.includes(jobId) : false;

    return { favorites, toggleFavorite, isFavorite };
}