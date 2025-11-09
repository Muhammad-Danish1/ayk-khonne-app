import { BloodRequest, Chat, Message, Alert, HistoryItem, BloodBank, BloodStock, User } from '../types';

export const dummyUser: User = {
  id: 'user-1',
  email: 'john@example.com',
  name: 'John Doe',
  phone: '+923001234567',
  bloodGroup: 'O+',
  mode: 'user',
  createdAt: new Date('2024-01-01'),
};

export const dummyRequests: BloodRequest[] = [
  {
    id: 'req-1',
    userId: 'user-2',
    userName: 'Ali Ahmed',
    userPhone: '+923009876543',
    patientName: 'Sara Khan',
    bloodGroup: 'O-',
    units: 2,
    hospital: 'Jinnah Hospital',
    hospitalAddress: 'Ferozepur Road, Lahore',
    location: { latitude: 31.5497, longitude: 74.3436 },
    urgency: 'urgent',
    status: 'pending',
    distance: 2.3,
    createdAt: new Date(Date.now() - 1000 * 60 * 15),
  },
  {
    id: 'req-2',
    userId: 'user-3',
    userName: 'Fatima Malik',
    userPhone: '+923001111111',
    patientName: 'Ahmed Hassan',
    bloodGroup: 'A+',
    units: 1,
    hospital: 'Mayo Hospital',
    hospitalAddress: 'Anarkali, Lahore',
    location: { latitude: 31.5656, longitude: 74.3242 },
    urgency: 'normal',
    status: 'pending',
    distance: 4.7,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: 'req-3',
    userId: 'user-4',
    userName: 'Hassan Ali',
    userPhone: '+923002222222',
    patientName: 'Zainab Sheikh',
    bloodGroup: 'B+',
    units: 3,
    hospital: 'Services Hospital',
    hospitalAddress: 'Jail Road, Lahore',
    location: { latitude: 31.5204, longitude: 74.3587 },
    urgency: 'urgent',
    status: 'pending',
    distance: 1.2,
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
  },
];

export const dummyMessages: Message[] = [
  {
    id: 'msg-1',
    chatId: 'chat-1',
    senderId: 'user-2',
    text: 'Hi, I need O- blood urgently for my sister.',
    createdAt: new Date(Date.now() - 1000 * 60 * 10),
    read: true,
  },
  {
    id: 'msg-2',
    chatId: 'chat-1',
    senderId: 'user-1',
    text: 'I can help! Which hospital?',
    createdAt: new Date(Date.now() - 1000 * 60 * 9),
    read: true,
  },
  {
    id: 'msg-3',
    chatId: 'chat-1',
    senderId: 'user-2',
    text: 'Jinnah Hospital, Emergency ward. Thank you so much!',
    createdAt: new Date(Date.now() - 1000 * 60 * 5),
    read: false,
  },
];

export const dummyChats: Chat[] = [
  {
    id: 'chat-1',
    requestId: 'req-1',
    participants: [
      { id: 'user-1', name: 'John Doe' },
      { id: 'user-2', name: 'Ali Ahmed' },
    ],
    lastMessage: dummyMessages[2],
    unreadCount: 1,
    createdAt: new Date(Date.now() - 1000 * 60 * 60),
    updatedAt: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: 'chat-2',
    requestId: 'req-2',
    participants: [
      { id: 'user-1', name: 'John Doe' },
      { id: 'user-3', name: 'Fatima Malik' },
    ],
    lastMessage: {
      id: 'msg-4',
      chatId: 'chat-2',
      senderId: 'user-3',
      text: 'Are you still available to donate?',
      createdAt: new Date(Date.now() - 1000 * 60 * 30),
      read: true,
    },
    unreadCount: 0,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    updatedAt: new Date(Date.now() - 1000 * 60 * 30),
  },
];

export const dummyAlerts: Alert[] = [
  {
    id: 'alert-1',
    type: 'urgent_request',
    title: 'Urgent: O- Blood Needed',
    message: 'O- blood needed 1.2km away at Services Hospital',
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
  },
  {
    id: 'alert-2',
    type: 'donor_accepted',
    title: 'Donor Accepted Your Request',
    message: 'Ali Ahmed accepted your blood request',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: true,
  },
  {
    id: 'alert-3',
    type: 'request_completed',
    title: 'Request Completed',
    message: 'Your blood donation to Mayo Hospital was successful',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    read: true,
  },
];

export const dummyHistory: HistoryItem[] = [
  {
    id: 'hist-1',
    type: 'donated',
    bloodGroup: 'O+',
    units: 2,
    hospital: 'Jinnah Hospital',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    status: 'completed',
  },
  {
    id: 'hist-2',
    type: 'requested',
    bloodGroup: 'O+',
    units: 1,
    hospital: 'Mayo Hospital',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
    status: 'completed',
  },
  {
    id: 'hist-3',
    type: 'donated',
    bloodGroup: 'O+',
    units: 1,
    hospital: 'Services Hospital',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    status: 'completed',
  },
];

export const dummyBloodStock: BloodStock[] = [
  { bloodGroup: 'A+', units: 8, lowStockThreshold: 5 },
  { bloodGroup: 'A-', units: 3, lowStockThreshold: 5 },
  { bloodGroup: 'B+', units: 6, lowStockThreshold: 5 },
  { bloodGroup: 'B-', units: 2, lowStockThreshold: 5 },
  { bloodGroup: 'AB+', units: 4, lowStockThreshold: 5 },
  { bloodGroup: 'AB-', units: 1, lowStockThreshold: 5 },
  { bloodGroup: 'O+', units: 12, lowStockThreshold: 5 },
  { bloodGroup: 'O-', units: 1, lowStockThreshold: 5 },
];

export const dummyBloodBank: BloodBank = {
  id: 'bb-1',
  userId: 'user-1',
  name: 'Central Blood Bank',
  licenseNumber: 'BB-LHR-12345',
  address: 'Main Boulevard, Lahore',
  location: { latitude: 31.5204, longitude: 74.3587 },
  phone: '+923001234567',
  status: 'approved',
  stock: dummyBloodStock,
  createdAt: new Date('2024-01-01'),
  approvedAt: new Date('2024-01-02'),
};
