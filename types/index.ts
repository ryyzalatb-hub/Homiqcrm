export type UserRole = 'super_admin' | 'owner' | 'company_admin' | 'marketing_manager' | 'marketing_staff';
export type LeadStatus = 'new_lead' | 'contacted' | 'interested' | 'site_visit' | 'negotiation' | 'booking' | 'closing' | 'lost';
export type UnitStatus = 'available' | 'booked' | 'sold';
export type PriorityLevel = 'low' | 'medium' | 'high';

export interface Project {
  id: string;
  name: string;
  location: string;
  city: string;
  description: string;
  facilities: string[];
  total_units: number;
  available_units: number;
}

export interface Unit {
  id: string;
  project_id: string;
  unit_code: string;
  type_name: string;
  land_area: number;
  building_area: number;
  price: number;
  status: UnitStatus;
}

export interface Lead {
  id: string;
  full_name: string;
  phone: string;
  source: string;
  assigned_to_name: string;
  project_name: string;
  budget: number;
  priority: PriorityLevel;
  status: LeadStatus;
  last_contacted: string;
  next_follow_up: string;
  notes?: string;
}

export interface Booking {
  id: string;
  booking_code: string;
  customer_name: string;
  customer_phone: string;
  project_name: string;
  unit_code: string;
  marketing_name: string;
  price: number;
  booking_fee: number;
  payment_method: string;
  payment_status: string;
  akad_status: string;
  booked_at: string;
}
