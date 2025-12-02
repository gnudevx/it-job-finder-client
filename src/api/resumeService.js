import client from "./client.js"; // client.js của bạn

export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return client.raw.post("/resumes/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });
};

export const getResumes = async () => {
  return client.get("/resumes");
};

export const deleteResume = async (id) => {
  return client.delete(`/resumes/${id}`);
};
