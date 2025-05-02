export interface Achievement {
  title: string;
  description: string;
  icon: string;
  locked: boolean;
  createDate: string;
  unlockDate: string;
}

export interface FeedItem {
  title: string;
  description: string;
  date: string;
  icon: string;
}

export interface Activity {
  id : string;
  title: string;
  description: string;
  banner: string;
  icon: string;
  timeSpent: string; // You could change to number of minutes for easier calc
  isActive: boolean;
  lastActive: string;
  activationDate : string | null
}
