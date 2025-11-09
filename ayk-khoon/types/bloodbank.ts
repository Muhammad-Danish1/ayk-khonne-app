import { BloodGroup } from '../utils/constants';

export interface BloodBank {
  id: string;
  userId: string;
  name: string;
  licenseNumber: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
  phone: string;
  status: 'pending' | 'approved' | 'rejected';
  stock: BloodStock[];
  createdAt: Date;
  approvedAt?: Date;
}

export interface BloodStock {
  bloodGroup: BloodGroup;
  units: number;
  lowStockThreshold: number;
}

export interface StockUpdate {
  bloodGroup: BloodGroup;
  units: number;
}

export interface BloodBankStats {
  totalStock: number;
  activeRequests: number;
  donorsToday: number;
  lowStockGroups: BloodGroup[];
}
