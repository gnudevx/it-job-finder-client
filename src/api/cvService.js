const STORAGE_KEY = "my_created_cvs";

export const getCVs = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveCV = (cv) => {
  const list = getCVs();
  list.push(cv);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};

export const deleteCV = (id) => {
  const updated = getCVs().filter((cv) => cv.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};
