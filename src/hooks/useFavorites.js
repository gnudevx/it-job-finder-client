import { useEffect, useState } from "react";
import { getMyFavorites, addFavorite, removeFavorite } from "@/api/favoriteService";

export default function useFavorites() {
    const [favorites, setFavorites] = useState([]);

    // 🔥 Load danh sách favorites từ DB khi login
    useEffect(() => {
        async function load() {
            try {
                const res = await getMyFavorites();

                const ids = res.data.data.map(item => item.jobID._id);
                setFavorites(ids);
            } catch (err) {
                console.log("Not logged in or cannot load favorites");
                setFavorites([]);
            }
        }
        load();
    }, []);

    // Toggle yêu thích
    const toggleFavorite = async (jobID) => {
        try {
            if (favorites.includes(jobID)) {
                await removeFavorite(jobID);

                setFavorites(prev => prev.filter(id => id !== jobID));
            } else {
                await addFavorite(jobID);

                setFavorites(prev => [...prev, jobID]);
            }
        } catch (err) {
            alert("Bạn cần đăng nhập để lưu công việc!");
        }
    };

    const isFavorite = (jobID) => favorites.includes(jobID);

    return { favorites, toggleFavorite, isFavorite };
}
