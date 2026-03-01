// User type matching AWS Cognito backend response
export interface User {
  user_id: number;
  full_name: string;
  email: string;
  emirates_id?: string | null;
  phone_no?: string | null;
  whatsapp_no?: string | null;
  photo_url?: string | null;
  auth_provider: "cognito" | "uaepass";
  status: "active" | "inactive";
  created_at: string;
  last_login_at?: string | null;
}

export interface UserProfile extends User {
  preferences?: {
    currency: string;
    language: string;
    notifications: boolean;
  };
  verified: boolean;
}
