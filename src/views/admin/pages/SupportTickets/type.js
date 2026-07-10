export const SupportTicketStatus = {
  OPEN: 'OPEN',
  RESPONDED: 'RESPONDED',
  CLOSED: 'CLOSED',
  PENDING: 'PENDING',
  REVIEWING: 'REVIEWING',
  RESOLVED: 'RESOLVED',
};

export const normalizeSupportTicketStatus = (status) => {
  const normalized = String(status || '').toUpperCase();

  switch (normalized) {
    case SupportTicketStatus.PENDING:
    case 'NEW':
    case 'WAITING':
    case SupportTicketStatus.OPEN:
      return SupportTicketStatus.OPEN;
    case SupportTicketStatus.REVIEWING:
    case SupportTicketStatus.RESPONDED:
    case 'ANSWERED':
    case 'IN_PROGRESS':
      return SupportTicketStatus.RESPONDED;
    case SupportTicketStatus.RESOLVED:
    case SupportTicketStatus.CLOSED:
    case 'DONE':
      return SupportTicketStatus.CLOSED;
    default:
      return SupportTicketStatus.OPEN;
  }
};

export const getSupportTicketStatusLabel = (status) => {
  const normalized = normalizeSupportTicketStatus(status);

  switch (normalized) {
    case SupportTicketStatus.RESPONDED:
      return 'Đã phản hồi';
    case SupportTicketStatus.CLOSED:
      return 'Đã đóng';
    default:
      return 'Mới';
  }
};

export const SupportTicket = {
  id: '',
  employerName: '',
  subject: '',
  message: '',
  date: '',
  status: SupportTicketStatus.OPEN,
};
