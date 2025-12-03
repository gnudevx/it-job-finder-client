export const UserRole = {
  CANDIDATE: "CANDIDATE",
  EMPLOYER: "EMPLOYER",
};

export const createNotification = (id, recipientRole, recipientId, title, message, sentAt) => ({
  id,
  recipientRole,
  recipientId,
  title,
  message,
  sentAt,
});