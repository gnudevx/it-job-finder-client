const STORAGE_KEY = "uploadedCVs";

export const getUploadedCVs = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

export const saveUploadedCV = (cv) => {
  const list = getUploadedCVs();
  list.push(cv);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};

export const deleteUploadedCV = (id) => {
  const list = getUploadedCVs().filter((cv) => cv.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};
