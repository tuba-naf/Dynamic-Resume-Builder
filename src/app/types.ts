export interface PersonalInfo {
    name: string;
    email: string;
    phone: string;
  }
  
  export interface Education {
    degree: string;
    institution: string;
    year: string;
  }
  
  export interface WorkExperience {
    position: string;
    company: string;
    duration: string;
  }
  
  export interface Skill {
    skillName: string;
  }
  
  export interface ResumeData {
    personalInfo: PersonalInfo;
    education: Education[];
    workExperience: WorkExperience[];
    skills: Skill[];
  }
  