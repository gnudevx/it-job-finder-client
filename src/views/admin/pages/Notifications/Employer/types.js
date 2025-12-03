export const UserRole = {
  CANDIDATE: "CANDIDATE",
  EMPLOYER: "EMPLOYER",
};

export const NotificationType = {
  SYSTEM: "SYSTEM",
  FEATURE: "FEATURE",
  PROMOTION: "PROMOTION",
  ALERT: "ALERT",
};

/**
 * Optional utility (nếu bạn vẫn muốn giữ)
 */
export const createNotification = (
  id,
  recipientRole,
  recipientId,
  title,
  message,
  sentAt
) => ({
  id,
  recipientRole,
  recipientId,
  title,
  message,
  sentAt,
});
