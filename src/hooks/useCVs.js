import { useEffect, useState } from "react";
import { getCVs, saveCV, deleteCV } from "@/api/cvService";

export default function useCVs() {
  const [cvs, setCVs] = useState([]);

  useEffect(() => {
    setCVs(getCVs());
  }, []);

  const addCV = (cv) => {
    saveCV(cv);
    setCVs(getCVs());
  };

  const removeCV = (id) => {
    deleteCV(id);
    setCVs(getCVs());
  };

  return { cvs, addCV, removeCV };
}
