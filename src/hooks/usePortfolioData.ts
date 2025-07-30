import { useState, useEffect } from 'react';

interface PersonalInfo {
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

interface Skill {
  name: string;
  level: number;
  category: string;
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  image: string;
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
  image: string;
}

interface Education {
  degree: string;
  institution: string;
  year: string;
  location: string;
}

interface Experience {
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
}

const STORAGE_KEY = 'portfolio_data';

export const usePortfolioData = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    // Clear cache on page reload since no authentication system
    localStorage.removeItem(STORAGE_KEY);
    loadPortfolioData();
  }, []);

  const loadPortfolioData = async () => {
    try {
      // First check localStorage for saved data
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setPortfolioData(parsedData);
        setHasData(true);
        setLoading(false);
        return;
      }

      // If no saved data, load default from portfolio.json
      const response = await fetch('/src/data/portfolio.json');
      const defaultData = await response.json();
      setPortfolioData(defaultData);
      setHasData(false);
      setLoading(false);
    } catch (error) {
      console.error('Error loading portfolio data:', error);
      setLoading(false);
    }
  };

  const savePortfolioData = (data: PortfolioData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setPortfolioData(data);
      setHasData(true);
    } catch (error) {
      console.error('Error saving portfolio data:', error);
    }
  };

  const clearPortfolioData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setHasData(false);
    loadPortfolioData();
  };

  return {
    portfolioData,
    loading,
    hasData,
    savePortfolioData,
    clearPortfolioData,
    refreshData: loadPortfolioData
  };
};