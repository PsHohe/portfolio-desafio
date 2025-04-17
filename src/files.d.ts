// Type definitions for YAML files

// Project interface matching the structure in projects.yml
interface Project {
  title: string;
  description: string;
  technologies: string[];
  github: string;
  demo: string | null;
}

// Personal data interfaces matching the structure in personal.yml
interface Profile {
  name: string;
  role: string;
  location: string;
  bio: string;
  photo: string;
}

interface Contact {
  email: string;
  phone: string;
}

interface Social {
  github: string;
  linkedin: string;
  twitter: string | null;
}

interface Skill {
  name: string;
  level: string;
}

interface SkillCategories {
  languages: Skill[];
  frameworks: Skill[];
}

interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  description: string[];
}

interface EducationItem {
  period: string;
  degree: string;
  institution: string;
}

interface Welcome {
  greeting: string;
  message: string;
  motd: string;
}

interface AsciiArt {
  text: string;
  font: string;
}

interface PersonalData {
  profile: Profile;
  contact: Contact;
  social: Social;
  skills: SkillCategories;
  experience: ExperienceItem[];
  education: EducationItem[];
  welcome: Welcome;
  'ascii-art': AsciiArt;
}

declare module "*.yml" {
  const value: any;
  export default value;
}
