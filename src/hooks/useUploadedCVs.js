import { useEffect, useState } from "react";
import {
  getUploadedCVs,
  saveUploadedCV,
  deleteUploadedCV,
} from "@/api/cvUploadService";

export default function useUploadedCVs() {
  const [uploadedCVs, setUploadedCVs] = useState([]);

  useEffect(() => {
    setUploadedCVs(getUploadedCVs());
  }, []);

  const addUploadedCV = (cv) => {
    saveUploadedCV(cv);
    setUploadedCVs(getUploadedCVs());
  };

  const removeUploadedCV = (id) => {
    deleteUploadedCV(id);
    setUploadedCVs(getUploadedCVs());
  };

  return { uploadedCVs, addUploadedCV, removeUploadedCV };
}
