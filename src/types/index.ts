export type TalentCategory =
  | 'Music'
  | 'Dance'
  | 'Art'
  | 'Photography'
  | 'Writing'
  | 'Film'
  | 'Crafts'
  | 'Speaking';

export interface PortfolioItem {
  id: string;
  title: string;
  type: 'image' | 'video' | 'audio' | 'article';
  url: string;
  thumbnail: string;
  description: string;
  year?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  organization?: string;
  rating: number;
  comment: string;
  date: string;
}

export interface TalentProfile {
  id: string;
  name: string;
  category: TalentCategory;
  skill: string;
  city: string;
  locationDetails: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  rating: number;
  reviewsCount: number;
  experience: string;
  bio: string;
  avatar: string;
  coverImage?: string;
  availability: string;
  tags: string[];
  hourlyRate?: string;
  verified: boolean;
  featured?: boolean;
  trending?: boolean;
  viewsCount: number;
  socials: {
    instagram?: string;
    youtube?: string;
    behance?: string;
    spotify?: string;
    linkedin?: string;
  };
  portfolio: PortfolioItem[];
  reviews: ReviewItem[];
  achievements: string[];
}

export type OpportunityType =
  | 'Event'
  | 'Competition'
  | 'Workshop'
  | 'Audition'
  | 'Gig'
  | 'Collaboration'
  | 'Internship';

export interface Opportunity {
  id: string;
  title: string;
  organizer: string;
  category: TalentCategory;
  type: OpportunityType;
  city: string;
  venue: string;
  date: string;
  time?: string;
  deadline: string;
  compensation: string;
  eligibility: string;
  description: string;
  perks: string[];
  bannerImage: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  applicantsCount: number;
}

export interface ChallengeSubmission {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorCity: string;
  title: string;
  mediaUrl: string;
  likes: number;
  submittedAt: string;
}

export interface Challenge {
  id: string;
  title: string;
  category: TalentCategory;
  icon: string;
  tagline: string;
  description: string;
  rules: string[];
  participantsCount: number;
  deadline: string;
  prize: string;
  featuredJudge?: string;
  submissions: ChallengeSubmission[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  type: 'profile_view' | 'collaboration' | 'opportunity' | 'challenge' | 'system';
  targetId?: string;
}
