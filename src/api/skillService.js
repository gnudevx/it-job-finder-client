import axiosClient from '@/services/axiosClient';

const skillService = {
  getAllSkills: () => axiosClient.get('/api/skills'),
};

export default skillService;
