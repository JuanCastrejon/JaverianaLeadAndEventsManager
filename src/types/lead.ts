export interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  program_id: string;
  created_at: string;
  updated_at: string;
}

export interface LeadFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  program_id: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}
