export type NewsStatus = "draft" | "published";

export interface News {
  id: string;
  title: string;
  slug: string;
  description: string;
  location?: string;
  image?: {
    url: string;
    alt: string;
    caption?: string;
  };
  createdAt: Date;
  eventDate?: Date;
  eventTime?: string;
  eventEndDate?: Date;
  eventEndTime?: string;
  calendarExport: boolean;
  status: NewsStatus;
}

export type ServiceCategory = "loisirs_culture" | "jeunesse" | "medical";

export interface Service {
  id: string;
  title: string;
  slug: string;
  category: ServiceCategory;
  description: string;
  icon?: string;
}

export interface MunicipalTeamMember {
  id: string;
  name: string;
  role: string;
  photo?: {
    url: string;
    alt: string;
  };
  email?: string;
  order: number;
}

export interface CouncilMinute {
  id: string;
  title: string;
  date: Date;
  pdf: {
    url: string;
    filename: string;
  };
  summary?: string;
  tags?: string[];
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
}

export type AssociationCategory =
  | "culture"
  | "sport"
  | "social"
  | "environnement"
  | "autres";

export interface Association {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: AssociationCategory;
  contact: {
    email?: string;
    phone?: string;
    website?: string;
  };
  president?: string;
  foundedYear?: number;
  logo?: {
    url: string;
    alt: string;
  };
  activities?: string;
  meetingSchedule?: string;
}

export type BusinessCategory =
  | "alimentation"
  | "restauration"
  | "artisanat"
  | "services"
  | "autres";

export interface Business {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: BusinessCategory;
  contact: {
    email?: string;
    phone?: string;
    website?: string;
  };
  address: string;
  openingHours?: OpeningHours;
  owner?: string;
  logo?: {
    url: string;
    alt: string;
  };
  services?: string;
  specialities?: string[];
}

export interface OpeningHours {
  monday?: { open: string; close: string };
  tuesday?: { open: string; close: string };
  wednesday?: { open: string; close: string };
  thursday?: { open: string; close: string };
  friday?: { open: string; close: string };
  saturday?: { open: string; close: string };
  sunday?: { open: string; close: string };
}

export type BannerSeverity = "info" | "warning" | "alert";
export type SocialPlatform = "facebook" | "twitter" | "instagram" | "youtube";

export interface SiteSettings {
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  openingHours: OpeningHours;
  banner: {
    enabled: boolean;
    message: string;
    severity: BannerSeverity;
  };
  hero: {
    title: string;
    subtitle: string;
    image?: {
      url: string;
      alt: string;
    };
  };
  footer: {
    links: Array<{ label: string; href: string }>;
    socials: Array<{ platform: SocialPlatform; url: string }>;
  };
  municipality: {
    name: string;
    population: number;
    mayor: string;
    foundedYear: number;
  };
  emergency: {
    phone: string;
    email: string;
  };
}
