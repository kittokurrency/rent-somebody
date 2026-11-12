export type UserRole = 'buyer' | 'seller';

export type TaskCategory = 
  | 'all'
  | 'plants'
  | 'cleaning'
  | 'moving'
  | 'errands'
  | 'assembly'
  | 'tech'
  | 'queuing';

export interface TaskItem {
  id: string;
  title: string;
  category: TaskCategory;
  categoryLabel: string;
  description: string;
  budget: number;
  xpReward?: number;
  estimatedHours: number;
  location: string;
  distance: string;
  urgency: 'flexible' | 'today' | 'urgent';
  postedBy: {
    name: string;
    avatar: string;
    rating: number;
    tasksPosted: number;
    playerLevel?: number;
  };
  bidsCount: number;
  status: 'open' | 'in_progress' | 'completed';
  zeroCommissionNotice: boolean;
  createdAt: string;
}

export interface ProviderItem {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  roleTitle: string;
  heroClass?: string;
  playerLevel?: number;
  rank: number;
  rating: number;
  reviewsCount: number;
  hourlyRate: number;
  completedTasks: number;
  onTimeRate: number; // percentage
  badges: string[];
  specialties: string[];
  equipment?: string[];
  bio: string;
  verifiedIdentity: boolean;
  isVipExclusive: boolean;
}

export interface RoadshowScenario {
  id: string;
  title: string;
  subtitle: string;
  persona: string;
  tagline: string;
  duration: string;
  timeSaved: string;
  steps: {
    stage: string;
    actor: string;
    action: string;
    dialogue: string;
    visualIcon: string;
  }[];
}

export interface ChatMessage {
  id: string;
  sender: 'buyer' | 'seller' | 'system';
  senderName: string;
  text: string;
  timestamp: string;
  attachmentUrl?: string;
  attachmentCaption?: string;
}
