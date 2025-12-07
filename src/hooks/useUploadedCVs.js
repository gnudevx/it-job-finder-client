import { useEffect, useState } from "react";
import * as resumeAPI from "@/api/resumeService";

export default function useUploadedCVs() {
  const [uploadedCVs, setUploadedCVs] = useState([]);

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
        console.error("Lỗi load CV:", err);
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
      alert("Xoá CV thành công!");
    } catch (err) {
      console.error("Xoá CV thất bại:", err);
      alert("Xoá CV thất bại, thử lại");
    }
  };

  return {
    uploadedCVs,
    addUploadedCV,
    removeUploadedCV,
  };
}
