export interface PersonalInfo {
  name: string;
  title: string;
  cedula: string;
  phone: string;
  email: string;
  location: string;
  availability: string;
  summary: string;
  goal: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface ProjectItem {
  title: string;
  description: string;
  tags: string[];
  url?: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  tasks: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
}

export interface LanguageItem {
  name: string;
  level: string;
  percent: number;
}

export type SocialPlatformId =
  | 'linkedin'
  | 'github'
  | 'instagram'
  | 'facebook'
  | 'x'
  | 'whatsapp'
  | 'youtube'
  | 'tiktok'
  | 'website';

export interface SocialLink {
  id: string;
  platform: SocialPlatformId;
  url: string;
}

export interface SiteContent {
  personalInfo: PersonalInfo;
  skillGroups: SkillGroup[];
  projects: ProjectItem[];
  experience: ExperienceItem[];
  education: EducationItem[];
  softSkills: string[];
  languages: LanguageItem[];
  socialLinks: SocialLink[];
  photoUrl: string | null;
}
