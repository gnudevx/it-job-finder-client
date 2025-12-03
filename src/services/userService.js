import axiosClient from './axiosClient';

const userService = {
  getMe: () => axiosClient.get('/users/me'),
  getStories: () => axiosClient.get(`/users/getStories`),
  getPostsByUserId: (page, pageSize) => {
    return axiosClient.get(`/users/getPosts/`, {
      params: { page, pageSize },
    });
  },
  getPostsByUserIdCursor: (lastId, pageSize) => {
    return axiosClient.get(`/users/getPostsByCursor/`, {
      params: { lastId, pageSize },
    });
  },
};

export default userService;
