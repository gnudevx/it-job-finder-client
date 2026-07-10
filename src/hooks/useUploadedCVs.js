import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from '@/redux/slices/globalSlice';
import * as resumeAPI from '@/api/resumeService';

export default function useUploadedCVs() {
  const [uploadedCVs, setUploadedCVs] = useState([]);
  const dispatch = useDispatch();

  // Load danh sách CV từ server khi mount
  useEffect(() => {
    const fetchCVs = async () => {
      try {
        const data = await resumeAPI.getResumes();
        setUploadedCVs(
          data.map((cv) => ({
            id: cv._id,
            name: cv.fileName,
            url: cv.fileUrl,
            size: cv.size || 0,
          }))
        );
      } catch (err) {
        console.error('Lỗi load CV:', err);
      }
    };

    fetchCVs();
  }, []);

  const addUploadedCV = (cv) => {
    setUploadedCVs((prev) => [...prev, cv]);
  };

  const removeUploadedCV = async (id) => {
    try {
      await resumeAPI.deleteResume(id); // xoá trên backend
      setUploadedCVs((prev) => prev.filter((cv) => cv.id !== id));
      dispatch(setNotification({ message: 'Xoá CV thành công!', type: 'success' }));
    } catch (err) {
      console.error('Xoá CV thất bại:', err);
      dispatch(setNotification({ message: 'Xoá CV thất bại, thử lại', type: 'error' }));
    }
  };

  return {
    uploadedCVs,
    addUploadedCV,
    removeUploadedCV,
  };
}
