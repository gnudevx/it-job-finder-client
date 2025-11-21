import axios from "axios";

const API_URL = "http://localhost:5000/api/jobs";

export const getAllJobs = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getJobDetail = async (id) => {
    const res = await axios.get(`http://localhost:5000/api/jobs/${id}`);
    return res.data;
};
