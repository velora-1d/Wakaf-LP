export type CampaignCategory = 'all' | 'wakaf' | 'infaq' | 'sedekah' | 'zakat' | 'kemanusiaan';

export interface CampaignItem {
  id: string;
  slug: string;
  title: string;
  category: CampaignCategory;
  institutionName: string;
  bannerUrl: string;
  targetAmount: number;
  collectedAmount: number;
  donorCount: number;
  daysRemaining: number;
  isVerified: boolean;
}
