// src/api/recommendService.js
import axiosInstance from '@api/axiosInstance';

/** API service for recommendation features */
const recommendService = {
  /**
   * Get recommended jobs for a given job (job-to-job similarity)
   * @param {string} jobId - Job ID to find similar jobs for
   * @returns {Promise} API response with similar jobs
   */
  getRecommendedJobs: (jobId) => {
    return axiosInstance.get(`/recommend/jobs/${jobId}`);
  },

  /**
   * Get recommended CVs for a given job (job-to-CV similarity)
   * @param {string} jobId - Job ID to find matching CVs for
   * @returns {Promise} API response with matching CVs
   */
  getRecommendedCvs: (jobId) => {
    return axiosInstance.get(`/recommend/jobs/${jobId}/cvs`);
  },
};

export default recommendService;