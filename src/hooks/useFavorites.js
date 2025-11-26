import { useEffect, useState } from "react";

export default function useFavorites() {
    // 👉 Lấy userId trực tiếp từ localStorage
    const userId = localStorage.getItem("userId");

    const storageKey = userId ? `favorites_${userId}` : null;

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        if (!storageKey) {
            setFavorites([]);
            return;
        }

        const saved = JSON.parse(localStorage.getItem(storageKey)) || [];
        setFavorites(saved);
    }, [storageKey]);

    const toggleFavorite = (jobId) => {
        if (!storageKey) {
            alert("Bạn cần đăng nhập để lưu việc!");
            return;
        }

        const updated = favorites.includes(jobId)
            ? favorites.filter(id => id !== jobId)
            : [...favorites, jobId];

        setFavorites(updated);
        localStorage.setItem(storageKey, JSON.stringify(updated));
    };

    const isFavorite = (jobId) => {
        if (!storageKey) return false;
        return favorites.includes(jobId);
    };

    return { favorites, toggleFavorite, isFavorite };
}
