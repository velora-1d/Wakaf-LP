// src/data/programs/types.ts
// Skema Tipe Data Resmi Program Global Village Fund (GVF) & YPCI

export const S3_BASE = 'https://br-billowing-mountain-aomqpcdy.storage.c-2.ap-southeast-1.aws.neon.tech/gvf-website/gvf/assets';

export interface DeliverableItem {
  bold: string;
  text: string;
}

export interface PricingPackage {
  id: string;
  title: string;
  subtitle: string;
  priceAmount: string;
  pricePrefix?: string;
  priceUnit: string;
  priceDesc: string;
  estimation: string;
  isPopular?: boolean;
  deliverables: DeliverableItem[];
  ctaText: string;
}

export interface ValueBox {
  icon: string;
  title: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  status: string;
  caption: string;
}

export interface WorkflowStep {
  number: string;
  title: string;
  description: string;
}

export interface LeaderPerson {
  name: string;
  role: string;
  credentials: string;
  image: string;
  quote: string;
}

export interface LegalItem {
  institution: string;
  regNumber: string;
  authority: string;
  description: string;
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  code: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface AddonItem {
  name: string;
  desc: string;
  price: string;
  availability: string;
}

export interface ProgramData {
  slug: 'wakaf' | 'zakat' | 'infaq' | 'sedekah';
  title: string;
  heroSubtitle: string;
  categoryBadge: string;
  heroBgImage: string;
  
  pricingHeading: string;
  pricingSubheading: string;
  packages: PricingPackage[];
  addonTitle?: string;
  addonItems?: AddonItem[];
  
  deepDiveBadge: string;
  deepDiveTitle: string;
  deepDiveLead: string;
  deepDiveStory1: string;
  deepDiveStory2: string;
  deepDiveBannerImage: string;
  valueBoxes: ValueBox[];
  deepDiveTwinImages?: [string, string];
  deepDiveSubblock1Title?: string;
  deepDiveSubblock1Desc1?: string;
  deepDiveSubblock1Desc2?: string;
  deepDiveSubblock2Title?: string;
  deepDiveSubblock2Desc1?: string;
  deepDiveSubblock2Desc2?: string;
  portfolioShowcaseItems?: {
    tag: string;
    name: string;
    category: string;
    image: string;
  }[];
  guarantees?: string[];
  
  galleryBadge: string;
  galleryTitle: string;
  gallerySubtitle: string;
  galleryItems: GalleryItem[];
  
  workflowHeading: string;
  workflowSteps: WorkflowStep[];
  
  leadershipBadge: string;
  leadershipTitle: string;
  leadershipQuote: string;
  leaders: LeaderPerson[];
  
  legalitasBadge: string;
  legalitasTitle: string;
  legalities: LegalItem[];
  bankAccounts: BankAccount[];
  
  faqBadge: string;
  faqTitle: string;
  faqs: FaqItem[];
  ctaBannerHeading: string;
  ctaBannerText: string;
}
