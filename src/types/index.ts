export type UserRole = 'hirer' | 'technician';

export interface UserProfile {
  id: string;
  firebase_uid: string;
  email: string;
  full_name: string;
  phone?: string;
  state?: string;
  lga?: string;
  city?: string;
  account_roles: UserRole[];
  roles?: UserRole[]; // Backwards compatibility alias
  avatar_url?: string;
  is_verified?: boolean;
  email_verified?: boolean;
  bio?: string;
  created_at: string;
  updated_at?: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  price_naira: number;
  duration_estimate?: string;
}

export interface Technician {
  id: string;
  user_id: string;
  full_name: string;
  title: string;
  category: string;
  state: string;
  lga: string;
  city: string;
  rating: number;
  reviews_count: number;
  jobs_completed: number;
  hourly_rate_naira: number;
  bio: string;
  avatar_url: string;
  verified: boolean;
  phone: string;
  available: boolean;
  skills: string[];
  services: ServiceItem[];
  verification_doc_status: 'verified' | 'pending' | 'unverified';
  nin_verified?: boolean;
  joined_date: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  technician_count: number;
  starting_price_naira: number;
  popular_issues: string[];
}

export interface TutorialComment {
  id: string;
  user_name: string;
  user_avatar?: string;
  content: string;
  created_at: string;
  likes: number;
}

export interface Tutorial {
  id: string;
  title: string;
  type: 'video' | 'article' | 'guide';
  category: string;
  read_time: string;
  author: {
    id: string;
    name: string;
    title: string;
    avatar_url: string;
    verified: boolean;
  };
  likes_count: number;
  comments_count: number;
  views_count: number;
  cover_image: string;
  excerpt: string;
  content?: string;
  steps?: {
    step: number;
    title: string;
    detail: string;
    tip?: string;
  }[];
  video_url?: string;
  published_at: string;
  is_saved?: boolean;
  is_liked?: boolean;
  comments?: TutorialComment[];
}

export interface JobRequest {
  id: string;
  hirer_id: string;
  hirer_name: string;
  hirer_phone: string;
  technician_id: string;
  technician_name: string;
  category: string;
  service_title: string;
  description: string;
  state: string;
  lga: string;
  address: string;
  budget_naira: number;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'declined';
  created_at: string;
  preferred_date: string;
}

export interface ChatMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_name: string;
  recipient_id: string;
  content: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  attachment_url?: string;
}

export interface Conversation {
  id: string;
  participant_id: string;
  participant_name: string;
  participant_title: string;
  participant_avatar: string;
  category: string;
  last_message: string;
  last_message_time: string;
  unread_count: number;
  is_online: boolean;
}

export interface StateLgaData {
  state: string;
  lgas: string[];
}
