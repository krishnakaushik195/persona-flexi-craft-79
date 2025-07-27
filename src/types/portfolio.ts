export interface PersonalInfo {
  name: string;
  role: string;
  tagline: string;
  photo_url: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  twitter: string;
}

export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  image: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  image: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  location: string;
}

export interface Experience {
  position: string;
  company: string;
  duration: string;
  description: string;
}

export interface PortfolioData {
  personal_info: PersonalInfo;
  about: string;
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  education: Education[];
  experience: Experience[];
  achievements: string[];
  template?: string;
}