import axiosClient from '@/services/axiosClient';

export const getUnreadMessageCount = async (role) => {
  try {
    const res = await axiosClient.get(`/${role}/connect/conversations/unread-count`);
    // Assuming the API returns { unreadCount: number }
    return res.unreadCount ?? 0;
  } catch (error) {
    console.error('Failed to fetch unread message count', error);
    return 0;
  }
};
