import { useEffect, useState } from 'react';
import { getMyFavorites, addFavorite, removeFavorite } from '@/api/favoriteService';

export default function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const token = localStorage.getItem('authToken');

  // Load danh sách favorites từ DB khi login
  useEffect(() => {
    if (!token) {
      setFavorites([]);
      return;
    }

    async function load() {
      try {
        const res = await getMyFavorites();
        const ids = res.data.map((item) => item.jobID._id);
        setFavorites(ids);
      } catch (err) {
        setFavorites([]);
      }
    }

    load();
  }, [token]);
  // Toggle yêu thích
  const toggleFavorite = async (jobID) => {
    if (!token) {
      alert('Vui lòng đăng nhập để lưu việc làm!');
      return;
    }

    try {
      if (favorites.includes(jobID)) {
        await removeFavorite(jobID);
        setFavorites((prev) => prev.filter((id) => id !== jobID));
      } else {
        await addFavorite(jobID);
        setFavorites((prev) => [...prev, jobID]);
      }
    } catch (err) {
      console.error('Toggle favorite failed', err);
    }
  };

  const isFavorite = (jobID) => favorites.includes(jobID);

  return { favorites, toggleFavorite, isFavorite };
}
