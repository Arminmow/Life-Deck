export interface Achievement {
  title: string;
  description: string;
  icon: string;
  locked: boolean;
  createDate: string;
  unlockDate: string;
}

export interface FeedItem {
  description: string;
  date: string;
  icon: string;
  duration: string
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  banner: string;
  icon: string;
  timeSpent: number;
  isActive: boolean;
  lastActive: string;
  lastSessionDuration: string;
  activationDate: string | null;
  feeds : FeedItem[]
}
