import { BloodGroup } from '../utils/constants';

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  bloodGroup: BloodGroup;
  avatar?: string;
  mode: 'user' | 'bloodbank';
  bloodbankId?: string;
  createdAt: Date;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}
