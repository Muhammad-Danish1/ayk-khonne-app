import { BloodGroup } from '../utils/constants';

export interface BloodRequest {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  patientName: string;
  bloodGroup: BloodGroup;
  units: number;
  hospital: string;
  hospitalAddress: string;
  location: {
    latitude: number;
    longitude: number;
  };
  urgency: 'normal' | 'urgent';
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  distance?: number;
  createdAt: Date;
  acceptedBy?: string;
  completedAt?: Date;
}

export interface CreateRequestData {
  patientName: string;
  bloodGroup: BloodGroup;
  units: number;
  hospital: string;
  urgency: 'normal' | 'urgent';
}
