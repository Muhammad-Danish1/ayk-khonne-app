export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  createdAt: Date;
  read: boolean;
}

export interface Chat {
  id: string;
  requestId: string;
  participants: {
    id: string;
    name: string;
    avatar?: string;
  }[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Alert {
  id: string;
  type: 'donor_accepted' | 'urgent_request' | 'request_completed' | 'blood_bank_approved';
  title: string;
  message: string;
  createdAt: Date;
  read: boolean;
  actionUrl?: string;
}

export interface HistoryItem {
  id: string;
  type: 'donated' | 'requested';
  bloodGroup: string;
  units: number;
  hospital: string;
  date: Date;
  status: 'completed' | 'pending' | 'cancelled';
}
