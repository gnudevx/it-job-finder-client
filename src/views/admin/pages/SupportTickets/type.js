export const SupportTicketStatus = {
  OPEN: 'OPEN',
  RESPONDED: 'RESPONDED',
  RESOLVED: 'RESOLVED',
  CLOSED: 'CLOSED',
};

export const normalizeSupportTicketStatus = (status) => {
  const normalized = String(status || '').toUpperCase();

  switch (normalized) {
    case 'PENDING':
    case 'NEW':
    case 'WAITING':
    case SupportTicketStatus.OPEN:
      return SupportTicketStatus.OPEN;
    case 'REVIEWING':
    case SupportTicketStatus.RESPONDED:
    case 'ANSWERED':
    case 'IN_PROGRESS':
      return SupportTicketStatus.RESPONDED;
    case SupportTicketStatus.RESOLVED:
    case 'DONE':
      return SupportTicketStatus.RESOLVED;
    case SupportTicketStatus.CLOSED:
      return SupportTicketStatus.CLOSED;
    default:
      return SupportTicketStatus.OPEN;
  }
};

export const getSupportTicketStatusLabel = (status) => {
  const normalized = normalizeSupportTicketStatus(status);

  switch (normalized) {
    case SupportTicketStatus.RESPONDED:
      return 'Đang xem xét';
    case SupportTicketStatus.RESOLVED:
      return 'Đã giải quyết';
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
