import api from "@/services/axiosClient";

export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return api.raw.post("/api/resumes/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });
};

export const getResumes = async () => {
  return api.get("/api/resumes");
};

export const deleteResume = async (id) => {
  return api.delete(`/api/resumes/${id}`);
};
