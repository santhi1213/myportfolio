// import React, { createContext, useContext, useState, useEffect } from 'react';
// import Calculator from '../assets/calculator.png';
// import Clock from '../assets/digital clock.png';
// import AgeCalc from '../assets/age-calculator.png';
// import ShoppingCart from '../assets/E-commerce React.png';
// import Film from '../assets/MoviesAPIReact .png';
// import Gamepad2 from '../assets/Tic Tac Toe React.png';
// import ListTodo from '../assets/To Do List React.png';
// import CalendarClock from '../assets/Agecalculator.png';
// import ImageIcon from '../assets/img gallery.png';
// import Music from '../assets/music player.png';
// import StickyNote from '../assets/Notes JS.png';
// import FileText from '../assets/OfferLetterGenerator.png';
// import ShieldCheck from '../assets/password strength.png';
// import KeyRound from '../assets/password generator JS.png';
// import Square from '../assets/popup JS.png';
// import User from '../assets/Profile-card.png';
// import Eye from '../assets/PWD hide n visible JS.png';
// import QrCode from '../assets/QR code generator.png';
// import HelpCircle from '../assets/quiz.png';
// import Timer from '../assets/stop watch.png';
// import Bell from '../assets/toast notification.png';
// import ClipboardList from '../assets/todo list.png';
// import Store from '../assets/E-commerce wordpress.png';
// import Hourglass from '../assets/countdown.png';

// export interface Skill {
//   id: string;
//   name: string;
//   level: number;
//   category: 'frontend' | 'backend' | 'tools';
// }

// import type { LucideIcon } from "lucide-react";

// export interface Project {
//   id: string;
//   title: string;
//   description: string;
//   image: string | LucideIcon;
//   technologies: string[];
//   category: 'fullstack' | 'frontend' | 'backend';
//   github: string;
//   live: string;
//   featured: boolean;
// }

// export interface ContactInfo {
//   email: string;
//   phone: string;
//   location: string;
//   github: string;
//   linkedin: string;
//   twitter: string;
// }

// export interface AboutInfo {
//   name: string;
//   title: string;
//   bio: string;
//   experience: string;
//   projectsCompleted: string;
//   availability: string;
// }

// interface DataContextType {
//   skills: Skill[];
//   projects: Project[];
//   contactInfo: ContactInfo;
//   aboutInfo: AboutInfo;
//   addSkill: (skill: Omit<Skill, 'id'>) => void;
//   updateSkill: (id: string, skill: Partial<Skill>) => void;
//   deleteSkill: (id: string) => void;
//   addProject: (project: Omit<Project, 'id'>) => void;
//   updateProject: (id: string, project: Partial<Project>) => void;
//   deleteProject: (id: string) => void;
//   updateContactInfo: (info: ContactInfo) => void;
//   updateAboutInfo: (info: AboutInfo) => void;
// }

// const DataContext = createContext<DataContextType | undefined>(undefined);

// export const useData = () => {
//   const context = useContext(DataContext);
//   if (context === undefined) {
//     throw new Error('useData must be used within a DataProvider');
//   }
//   return context;
// };

// const defaultSkills: Skill[] = [
//   { id: '1', name: 'React.js', level: 95, category: 'frontend' },
//   { id: '2', name: 'TypeScript', level: 90, category: 'frontend' },
//   { id: '3', name: 'Next.js', level: 88, category: 'frontend' },
//   { id: '4', name: 'Node.js', level: 92, category: 'backend' },
//   { id: '5', name: 'Express.js', level: 90, category: 'backend' },
//   { id: '6', name: 'MongoDB', level: 88, category: 'backend' },
//   { id: '7', name: 'Git/GitHub', level: 93, category: 'tools' },
//   { id: '8', name: 'Docker', level: 82, category: 'tools' },
// ];


// const defaultProjects: Project[] = [
//   {
//     id: '1',
//     title: 'E-commerce website',
//     description: 'A responsive e-commerce site with product browsing and cart functionality.',
//     image: ShoppingCart, // icon instead of image
//     technologies: ['React JS', 'HTML', 'CSS'],
//     category: 'frontend',
//     github: '#',
//     live: 'https://e-commerce-phi-five-89.vercel.app',
//     featured: true
//   },
//   {
//     id: '2',
//     title: 'Movies Website',
//     description: 'Movie listing app fetching data from an external API.',
//     image: Film,
//     technologies: ['React JS', 'HTML', 'CSS'],
//     category: 'frontend',
//     github: '#',
//     live: 'https://movie-site-three-snowy.vercel.app',
//     featured: true
//   },
//   {
//     id: '3',
//     title: 'Tic Tac Toe Game',
//     description: 'Interactive tic-tac-toe game built with React.',
//     image: Gamepad2,
//     technologies: ['React JS', 'HTML', 'CSS'],
//     category: 'frontend',
//     github: '#',
//     live: 'https://tic-iota-sage.vercel.app/',
//     featured: false
//   },
//   {
//     id: '4',
//     title: 'ToDo List',
//     description: 'Task management application to add and track todos.',
//     image: ListTodo,
//     technologies: ['React JS', 'HTML', 'CSS'],
//     category: 'frontend',
//     github: '#',
//     live: 'https://to-do-liists.netlify.app',
//     featured: false
//   },
//   {
//     id: '5',
//     title: 'Age Calculator',
//     description: 'Tool to calculate age based on date of birth input.',
//     image: CalendarClock,
//     technologies: ['HTML', 'CSS', 'JavaScript'],
//     category: 'frontend',
//     github: '#',
//     live: 'https://agecalculatr.netlify.app',
//     featured: false
//   },
//   {
//     id: '6',
//     title: 'Calculator',
//     description: 'Basic calculator for performing arithmetic operations.',
//     image: Calculator,
//     technologies: ['HTML', 'CSS', 'JavaScript'],
//     category: 'frontend',
//     github: '#',
//     live: 'https://starlit-capybara-d4dee5.netlify.app',
//     featured: false
//   },
//   {
//     id: '7',
//     title: 'Digital Clock',
//     description: 'Live updating digital clock application.',
//     image: Clock,
//     technologies: ['HTML', 'CSS', 'JavaScript'],
//     category: 'frontend',
//     github: '#',
//     live: 'https://digclk.netlify.app',
//     featured: false
//   },
//   {
//     id: '8',
//     title: 'Image Gallery',
//     description: 'Gallery to view and showcase images.',
//     image: ImageIcon,
//     technologies: ['HTML', 'CSS', 'JavaScript'],
//     category: 'frontend',
//     github: '#',
//     live: 'https://imgalaree.netlify.app',
//     featured: false
//   },
//   {
//     id: '9',
//     title: 'Music Player',
//     description: 'Web-based music player with controls.',
//     image: Music,
//     technologies: ['HTML', 'CSS', 'JavaScript'],
//     category: 'frontend',
//     github: '#',
//     live: 'https://muscplayer.netlify.app',
//     featured: false
//   },
//   {
//     id: '10',
//     title: 'Notes',
//     description: 'Simple notes-taking app with local storage.',
//     image: StickyNote,
//     technologies: ['HTML', 'CSS', 'JavaScript'],
//     category: 'frontend',
//     github: '#',
//     live: 'https://noteslists.netlify.app',
//     featured: false
//   },
//   {
//     id: '11',
//     title: 'Offer Letter Generator',
//     description: 'Generates formatted offer letters dynamically.',
//     image: FileText,
//     technologies: ['HTML', 'CSS', 'JavaScript'],
//     category: 'frontend',
//     github: '#',
//     live: 'https://offer-letter-generatr.netlify.app',
//     featured: false
//   },
//   {
//     id: '12',
//     title: 'Password Strength Check',
//     description: 'Tool to check and validate password strength.',
//     image: ShieldCheck,
//     technologies: ['HTML', 'CSS', 'JavaScript'],
//     category: 'frontend',
//     github: '#',
//     live: 'https://pwdstrength.netlify.app',
//     featured: false
//   },
//   {
//     id: '13',
//     title: 'Password Generator',
//     description: 'Generates secure random passwords.',
//     image: KeyRound,
//     technologies: ['HTML', 'CSS', 'JavaScript'],
//     category: 'frontend',
//     github: '#',
//     live: 'https://pwd-generatr.netlify.app',
//     featured: false
//   },
//   {
//     id: '14',
//     title: 'Pop Up',
//     description: 'Interactive pop-up window demo.',
//     image: Square,
//     technologies: ['HTML', 'CSS', 'JavaScript'],
//     category: 'frontend',
//     github: '#',
//     live: 'https://popup-s.netlify.app',
//     featured: false
//   },
//   {
//     id: '15',
//     title: 'Profile Card',
//     description: 'Responsive profile card component.',
//     image: User,
//     technologies: ['HTML', 'CSS', 'JavaScript'],
//     category: 'frontend',
//     github: '#',
//     live: 'https://profile-ecard.netlify.app',
//     featured: false
//   },
//   {
//     id: '16',
//     title: 'Password Hide and Visible',
//     description: 'Input field with password visibility toggle.',
//     image: Eye,
//     technologies: ['HTML', 'CSS', 'JavaScript'],
//     category: 'frontend',
//     github: '#',
//     live: 'https://pwdhidenvisible.netlify.app',
//     featured: false
//   },
//   {
//     id: '17',
//     title: 'QR Code Generator',
//     description: 'Generates QR codes for given input.',
//     image: QrCode,
//     technologies: ['HTML', 'CSS', 'JavaScript'],
//     category: 'frontend',
//     github: '#',
//     live: 'https://qr-code-generatr.netlify.app',
//     featured: false
//   },
//   {
//     id: '18',
//     title: 'Quiz',
//     description: 'Quiz app with multiple-choice questions.',
//     image: HelpCircle,
//     technologies: ['HTML', 'CSS', 'JavaScript'],
//     category: 'frontend',
//     github: '#',
//     live: 'https://quizzzyy-task.netlify.app',
//     featured: false
//   },
//   {
//     id: '19',
//     title: 'Stop Watch',
//     description: 'Stopwatch app to track elapsed time.',
//     image: Timer,
//     technologies: ['HTML', 'CSS', 'JavaScript'],
//     category: 'frontend',
//     github: '#',
//     live: 'https://stp-watch.netlify.app',
//     featured: false
//   },
//   {
//     id: '20',
//     title: 'Toast Notification',
//     description: 'Toast notifications for web apps.',
//     image: Bell,
//     technologies: ['HTML', 'CSS', 'JavaScript'],
//     category: 'frontend',
//     github: '#',
//     live: 'https://toast-notificationss.netlify.app',
//     featured: false
//   },
//   {
//     id: '21',
//     title: 'Todo List (JS)',
//     description: 'Todo list app built using vanilla JavaScript.',
//     image: ClipboardList,
//     technologies: ['HTML', 'CSS', 'JavaScript'],
//     category: 'frontend',
//     github: '#',
//     live: 'https://to-do-listssss.netlify.app',
//     featured: false
//   },
//   {
//     id: '22',
//     title: 'E-commerce Website (WordPress)',
//     description: 'E-commerce website built using WordPress.',
//     image: Store,
//     technologies: ['WordPress'],
//     category: 'frontend',
//     github: '#',
//     live: 'https://dev-shopstraight.pantheonsite.io',
//     featured: false
//   },
//   {
//     id: '23',
//     title: 'CountDown Website',
//     description: 'Countdown timer app for events.',
//     image: Hourglass,
//     technologies: ['HTML', 'CSS', 'JavaScript'],
//     category: 'frontend',
//     github: '#',
//     live: 'https://countdn.netlify.app',
//     featured: false
//   },
//   {
//     id: '24',
//     title: 'Sri Bala Ganesh Youth Committe',
//     description: 'Website for committe members.',
//     image: Hourglass,
//     technologies: ['MERN'],
//     category: 'Fullstack',
//     github: 'https://github.com/santhi1213/sri-bala-ganesh-youth.git',
//     live: 'https://sri-bala-ganesh-youth-six.vercel.app',
//     featured: false
//   },
//   {
//     id: '24',
//     title: 'Udaan Tech Academy',
//     description: 'Website for Institute.',
//     image: Hourglass,
//     technologies: ['MERN'],
//     category: 'Fullstack',
//     github: '',
//     live: 'https://udaan.x-fuzion.com',
//     featured: false
//   },
//   {
//     id: '24',
//     title: 'Freelancer Platform',
//     description: 'Website for Freelancer and clients.',
//     image: Hourglass,
//     technologies: ['MERN'],
//     category: 'Fullstack',
//     github: 'https://github.com/santhi1213/freelance-SaaS.git',
//     live: 'https://freelance-saa-s-jvxs.vercel.app/login',
//     featured: false
//   }
// ];


// const defaultContactInfo: ContactInfo = {
//   email: 'santhiraju32@gmail.com',
//   phone: '+91 9705675817',
//   location: 'Andhra Pradesh, India',
//   github: 'https://github.com/santhi1213',
//   linkedin: 'https://www.linkedin.com/in/santhi-raju-0364ba248',
//   twitter: '#'
// };

// const defaultAboutInfo: AboutInfo = {
//   name: 'Santhi Raju',
//   title: 'MERN Stack Developer',
//   bio: 'Passionate about creating scalable web applications with modern technologies. Specialized in MongoDB, Express.js, React, and Node.js with 1+ years of experience.',
//   experience: '1+ Years Experience',
//   projectsCompleted: '20+ Projects Completed',
//   availability: 'Available for new projects'
// };

// export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [skills, setSkills] = useState<Skill[]>([]);
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [contactInfo, setContactInfo] = useState<ContactInfo>(defaultContactInfo);
//   const [aboutInfo, setAboutInfo] = useState<AboutInfo>(defaultAboutInfo);

//   useEffect(() => {
//     // Load data from localStorage or use defaults
//     const savedSkills = localStorage.getItem('portfolio_skills');
//     const savedProjects = localStorage.getItem('portfolio_projects');
//     const savedContactInfo = localStorage.getItem('portfolio_contact');
//     const savedAboutInfo = localStorage.getItem('portfolio_about');

//     setSkills(savedSkills ? JSON.parse(savedSkills) : defaultSkills);
//     setProjects(savedProjects ? JSON.parse(savedProjects) : defaultProjects);
//     setContactInfo(savedContactInfo ? JSON.parse(savedContactInfo) : defaultContactInfo);
//     setAboutInfo(savedAboutInfo ? JSON.parse(savedAboutInfo) : defaultAboutInfo);
//   }, []);

//   const saveToStorage = (key: string, data: any) => {
//     localStorage.setItem(key, JSON.stringify(data));
//   };

//   const addSkill = (skill: Omit<Skill, 'id'>) => {
//     const newSkill = { ...skill, id: Date.now().toString() };
//     const updatedSkills = [...skills, newSkill];
//     setSkills(updatedSkills);
//     saveToStorage('portfolio_skills', updatedSkills);
//   };

//   const updateSkill = (id: string, skillUpdate: Partial<Skill>) => {
//     const updatedSkills = skills.map(skill =>
//       skill.id === id ? { ...skill, ...skillUpdate } : skill
//     );
//     setSkills(updatedSkills);
//     saveToStorage('portfolio_skills', updatedSkills);
//   };

//   const deleteSkill = (id: string) => {
//     const updatedSkills = skills.filter(skill => skill.id !== id);
//     setSkills(updatedSkills);
//     saveToStorage('portfolio_skills', updatedSkills);
//   };

//   const addProject = (project: Omit<Project, 'id'>) => {
//     const newProject = { ...project, id: Date.now().toString() };
//     const updatedProjects = [...projects, newProject];
//     setProjects(updatedProjects);
//     saveToStorage('portfolio_projects', updatedProjects);
//   };

//   const updateProject = (id: string, projectUpdate: Partial<Project>) => {
//     const updatedProjects = projects.map(project =>
//       project.id === id ? { ...project, ...projectUpdate } : project
//     );
//     setProjects(updatedProjects);
//     saveToStorage('portfolio_projects', updatedProjects);
//   };

//   const deleteProject = (id: string) => {
//     const updatedProjects = projects.filter(project => project.id !== id);
//     setProjects(updatedProjects);
//     saveToStorage('portfolio_projects', updatedProjects);
//   };

//   const updateContactInfo = (info: ContactInfo) => {
//     setContactInfo(info);
//     saveToStorage('portfolio_contact', info);
//   };

//   const updateAboutInfo = (info: AboutInfo) => {
//     setAboutInfo(info);
//     saveToStorage('portfolio_about', info);
//   };

//   const value = {
//     skills,
//     projects,
//     contactInfo,
//     aboutInfo,
//     addSkill,
//     updateSkill,
//     deleteSkill,
//     addProject,
//     updateProject,
//     deleteProject,
//     updateContactInfo,
//     updateAboutInfo
//   };

//   return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
// };


import React, { createContext, useContext, useState, useEffect } from 'react';
import Calculator from '../assets/calculator.png';
import Clock from '../assets/digital clock.png';
// import AgeCalc from '../assets/age-calculator.png';
import Freelance from '../assets/Freelance.png';
import SriBalaGanesh from '../assets/SriBalaGanesh.png';
import Udaan from '../assets/Udaan.png'
import ShoppingCart from '../assets/E-commerce React.png';
import Film from '../assets/MoviesAPIReact .png';
import Gamepad2 from '../assets/Tic Tac Toe React.png';
import ListTodo from '../assets/To Do List React.png';
import AgeCalc from '../assets/Agecalculator.png';
import ImageIcon from '../assets/img gallery.png';
import Music from '../assets/music player.png';
import StickyNote from '../assets/Notes JS.png';
import FileText from '../assets/OfferLetterGenerator.png';
import ShieldCheck from '../assets/password strength.png';
import KeyRound from '../assets/password generator JS.png';
import Square from '../assets/popup JS.png';
import User from '../assets/Profile-card.png';
import Eye from '../assets/PWD hide n visible JS.png';
import QrCode from '../assets/QR code generator.png';
import HelpCircle from '../assets/quiz.png';
import Timer from '../assets/stop watch.png';
import Bell from '../assets/toast notification.png';
import ClipboardList from '../assets/todo list.png';
import Store from '../assets/E-commerce wordpress.png';
import Hourglass from '../assets/countdown.png';

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools';
}

import type { LucideIcon } from "lucide-react";

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string | LucideIcon;
  technologies: string[];
  category: 'fullstack' | 'frontend' | 'backend';
  github: string;
  live: string;
  featured: boolean;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  twitter: string;
}

export interface AboutInfo {
  name: string;
  title: string;
  bio: string;
  experience: string;
  projectsCompleted: string;
  availability: string;
}

interface DataContextType {
  skills: Skill[];
  projects: Project[];
  contactInfo: ContactInfo;
  aboutInfo: AboutInfo;
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  updateContactInfo: (info: ContactInfo) => void;
  updateAboutInfo: (info: AboutInfo) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

const defaultSkills: Skill[] = [
  // Frontend Skills
  { id: '1', name: 'React.js', level: 95, category: 'frontend' },
  { id: '2', name: 'JavaScript (ES6+)', level: 93, category: 'frontend' },
  { id: '3', name: 'TypeScript', level: 90, category: 'frontend' },
  { id: '4', name: 'HTML5 & CSS3', level: 96, category: 'frontend' },
  { id: '5', name: 'Next.js', level: 88, category: 'frontend' },
  { id: '6', name: 'Tailwind CSS', level: 92, category: 'frontend' },
  { id: '7', name: 'Bootstrap', level: 90, category: 'frontend' },
  { id: '8', name: 'Responsive Design', level: 94, category: 'frontend' },

  // Backend Skills
  { id: '9', name: 'Node.js', level: 92, category: 'backend' },
  { id: '10', name: 'Express.js', level: 90, category: 'backend' },
  { id: '11', name: 'MongoDB', level: 88, category: 'backend' },
  { id: '12', name: 'Mongoose ODM', level: 87, category: 'backend' },
  { id: '13', name: 'RESTful APIs', level: 91, category: 'backend' },
  { id: '14', name: 'JWT Authentication', level: 89, category: 'backend' },
  { id: '15', name: 'MySQL', level: 82, category: 'backend' },

  // Tools & Technologies
  { id: '16', name: 'Git/GitHub', level: 93, category: 'tools' },
  // { id: '17', name: 'Docker', level: 82, category: 'tools' },
  { id: '18', name: 'VS Code', level: 95, category: 'tools' },
  { id: '19', name: 'Postman', level: 88, category: 'tools' },
  { id: '20', name: 'Netlify/Vercel', level: 90, category: 'tools' },
  { id: '21', name: 'WordPress', level: 85, category: 'tools' },
  // { id: '22', name: 'Figma', level: 78, category: 'tools' },
];

const defaultProjects: Project[] = [
  // Fullstack Projects (Priority)
  {
    id: '1',
    title: 'Freelancer Platform',
    description: 'A comprehensive full-stack SaaS platform connecting freelancers with clients. Features include user authentication, project management, secure payment integration, real-time messaging, and dashboard analytics. Built with modern MERN stack architecture.',
    image: Freelance,
    technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT', 'Socket.io'],
    category: 'fullstack',
    github: 'https://github.com/santhi1213/freelance-SaaS.git',
    live: 'https://freelance-saa-s-jvxs.vercel.app/login',
    featured: true
  },
  {
    id: '2',
    title: 'Udaan Tech Academy',
    description: 'A complete educational platform for an institute offering online courses. Features student enrollment, course management, progress tracking, assignment submission, and instructor dashboard. Includes secure payment gateway and certificate generation.',
    image: Udaan,
    technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Stripe API', 'Cloudinary'],
    category: 'fullstack',
    github: '',
    live: 'https://udaan.x-fuzion.com',
    featured: true
  },
  {
    id: '3',
    title: 'Sri Bala Ganesh Youth Committee',
    description: 'A community management website for committee members featuring event management, member registration, news updates, photo galleries, and contact management. Includes admin panel for content management and member verification.',
    image: SriBalaGanesh,
    technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Multer', 'BCrypt'],
    category: 'fullstack',
    github: 'https://github.com/santhi1213/sri-bala-ganesh-youth.git',
    live: 'https://sri-bala-ganesh-youth-six.vercel.app',
    featured: true
  },

  // Featured Frontend Projects
  {
    id: '4',
    title: 'E-commerce Website (React)',
    description: 'A modern, responsive e-commerce platform built with React. Features product catalog with search and filtering, shopping cart with local storage persistence, user-friendly checkout process, and mobile-optimized design with smooth animations.',
    image: ShoppingCart,
    technologies: ['React.js', 'CSS3', 'HTML5', 'Local Storage API', 'Responsive Design'],
    category: 'frontend',
    github: '#',
    live: 'https://e-commerce-phi-five-89.vercel.app',
    featured: true
  },
  {
    id: '5',
    title: 'Movies Discovery Platform',
    description: 'A dynamic movie discovery app integrating with external movie APIs. Features movie search, detailed information display, trending movies, genre filtering, and responsive card-based layout with smooth loading animations.',
    image: Film,
    technologies: ['React.js', 'Movie API', 'CSS3', 'Async/Await', 'Responsive Design'],
    category: 'frontend',
    github: '#',
    live: 'https://movie-site-three-snowy.vercel.app',
    featured: true
  },

  // Additional Frontend Projects
  {
    id: '6',
    title: 'Interactive Tic Tac Toe Game',
    description: 'A fully interactive tic-tac-toe game with React state management. Features player vs player mode, game history tracking, winner detection algorithm, and reset functionality with smooth animations.',
    image: Gamepad2,
    technologies: ['React.js', 'CSS3', 'Game Logic', 'State Management'],
    category: 'frontend',
    github: '#',
    live: 'https://tic-iota-sage.vercel.app/',
    featured: false
  },
  {
    id: '7',
    title: 'Advanced ToDo List Manager',
    description: 'A feature-rich task management application with add, edit, delete, and mark complete functionality. Includes priority levels, due dates, category filtering, and persistent data storage.',
    image: ListTodo,
    technologies: ['React.js', 'CSS3', 'Local Storage', 'Date Handling'],
    category: 'frontend',
    github: '#',
    live: 'https://to-do-liists.netlify.app',
    featured: false
  },
  {
    id: '8',
    title: 'Age Calculator Tool',
    description: 'A precise age calculation tool that computes age in years, months, days, hours, and minutes. Features date validation, leap year handling, and multiple output formats with clean UI design.',
    image: AgeCalc,
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Date API', 'Form Validation'],
    category: 'frontend',
    github: '#',
    live: 'https://agecalculatr.netlify.app',
    featured: false
  },
  {
    id: '9',
    title: 'Scientific Calculator',
    description: 'A comprehensive calculator supporting basic arithmetic, scientific functions, memory operations, and keyboard input. Features error handling, decimal precision, and responsive button layout.',
    image: Calculator,
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Math Functions', 'Event Handling'],
    category: 'frontend',
    github: '#',
    live: 'https://starlit-capybara-d4dee5.netlify.app',
    featured: false
  },
  {
    id: '10',
    title: 'Real-time Digital Clock',
    description: 'A live updating digital clock with customizable time formats, timezone support, date display, and aesthetic design with smooth second transitions and color themes.',
    image: Clock,
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Date/Time API', 'Intervals'],
    category: 'frontend',
    github: '#',
    live: 'https://digclk.netlify.app',
    featured: false
  },
  {
    id: '11',
    title: 'Responsive Image Gallery',
    description: 'An elegant image gallery with lightbox functionality, thumbnail navigation, zoom capabilities, and responsive grid layout. Includes image lazy loading and smooth transitions.',
    image: ImageIcon,
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'CSS Grid', 'Modal Windows'],
    category: 'frontend',
    github: '#',
    live: 'https://imgalaree.netlify.app',
    featured: false
  },
  {
    id: '12',
    title: 'Web Music Player',
    description: 'A feature-complete music player with playlist management, audio controls, progress bar, volume control, shuffle and repeat modes, and responsive design with album artwork display.',
    image: Music,
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Audio API', 'Local Storage'],
    category: 'frontend',
    github: '#',
    live: 'https://muscplayer.netlify.app',
    featured: false
  },
  {
    id: '13',
    title: 'Smart Notes Application',
    description: 'A note-taking app with rich text support, search functionality, category organization, and persistent storage. Features auto-save, export options, and responsive design.',
    image: StickyNote,
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Local Storage', 'Text Processing'],
    category: 'frontend',
    github: '#',
    live: 'https://noteslists.netlify.app',
    featured: false
  },
  {
    id: '14',
    title: 'Offer Letter Generator',
    description: 'An automated offer letter generation tool with customizable templates, PDF export, company branding options, and form validation. Streamlines HR document creation process.',
    image: FileText,
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'PDF Generation', 'Form Handling'],
    category: 'frontend',
    github: '#',
    live: 'https://offer-letter-generatr.netlify.app',
    featured: false
  },
  {
    id: '15',
    title: 'Password Strength Analyzer',
    description: 'A comprehensive password strength checker with real-time feedback, security recommendations, breach detection, and visual strength indicators. Helps users create secure passwords.',
    image: ShieldCheck,
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'RegEx', 'Security Algorithms'],
    category: 'frontend',
    github: '#',
    live: 'https://pwdstrength.netlify.app',
    featured: false
  },
  {
    id: '16',
    title: 'Secure Password Generator',
    description: 'A robust password generator with customizable criteria including length, character types, and complexity rules. Features copy-to-clipboard, strength indication, and multiple password generation.',
    image: KeyRound,
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Crypto API', 'Clipboard API'],
    category: 'frontend',
    github: '#',
    live: 'https://pwd-generatr.netlify.app',
    featured: false
  },
  {
    id: '17',
    title: 'Interactive Pop-up System',
    description: 'A versatile pop-up/modal system with multiple trigger options, customizable animations, overlay effects, and accessibility features. Demonstrates advanced DOM manipulation.',
    image: Square,
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'DOM Manipulation', 'Animations'],
    category: 'frontend',
    github: '#',
    live: 'https://popup-s.netlify.app',
    featured: false
  },
  {
    id: '18',
    title: 'Dynamic Profile Card',
    description: 'A responsive profile card component with hover effects, social media integration, contact information display, and customizable themes. Perfect for personal branding.',
    image: User,
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Flexbox', 'Hover Effects'],
    category: 'frontend',
    github: '#',
    live: 'https://profile-ecard.netlify.app',
    featured: false
  },
  {
    id: '19',
    title: 'Password Visibility Toggle',
    description: 'A user-friendly password input field with show/hide functionality, strength indication, and accessibility features. Demonstrates modern UX patterns for secure input fields.',
    image: Eye,
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'UX Design', 'Accessibility'],
    category: 'frontend',
    github: '#',
    live: 'https://pwdhidenvisible.netlify.app',
    featured: false
  },
  {
    id: '20',
    title: 'QR Code Generator',
    description: 'A versatile QR code generator supporting URLs, text, contact info, and WiFi credentials. Features customizable size, error correction, and download options with real-time preview.',
    image: QrCode,
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'QR API', 'Canvas API'],
    category: 'frontend',
    github: '#',
    live: 'https://qr-code-generatr.netlify.app',
    featured: false
  },
  {
    id: '21',
    title: 'Interactive Quiz Application',
    description: 'A comprehensive quiz app with multiple question types, scoring system, time limits, progress tracking, and result analysis. Features admin panel for question management.',
    image: HelpCircle,
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'JSON Data', 'Timer Functions'],
    category: 'frontend',
    github: '#',
    live: 'https://quizzzyy-task.netlify.app',
    featured: false
  },
  {
    id: '22',
    title: 'Precision Stopwatch',
    description: 'A high-precision stopwatch with lap timing, split times, and multiple timing modes. Features millisecond accuracy, data export, and responsive design for sports and training.',
    image: Timer,
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Performance API', 'Data Export'],
    category: 'frontend',
    github: '#',
    live: 'https://stp-watch.netlify.app',
    featured: false
  },
  {
    id: '23',
    title: 'Toast Notification System',
    description: 'A flexible toast notification library with multiple types, positioning options, auto-dismiss, and queue management. Demonstrates modern notification patterns for web apps.',
    image: Bell,
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Animations', 'Event System'],
    category: 'frontend',
    github: '#',
    live: 'https://toast-notificationss.netlify.app',
    featured: false
  },
  {
    id: '24',
    title: 'Vanilla JS Todo List',
    description: 'A clean todo list implementation using pure JavaScript with CRUD operations, local storage persistence, drag-and-drop reordering, and category filtering.',
    image: ClipboardList,
    technologies: ['HTML5', 'CSS3', 'Vanilla JavaScript', 'Local Storage', 'Drag & Drop'],
    category: 'frontend',
    github: '#',
    live: 'https://to-do-listssss.netlify.app',
    featured: false
  },
  {
    id: '25',
    title: 'E-commerce WordPress Site',
    description: 'A professional e-commerce website built on WordPress with custom theme development, WooCommerce integration, payment gateway setup, and SEO optimization for retail business.',
    image: Store,
    technologies: ['WordPress', 'WooCommerce', 'PHP', 'MySQL', 'Custom Themes'],
    category: 'frontend',
    github: '#',
    live: 'https://dev-shopstraight.pantheonsite.io',
    featured: false
  },
  {
    id: '26',
    title: 'Event Countdown Timer',
    description: 'A versatile countdown timer for events with multiple time formats, timezone support, completion actions, and customizable styling. Perfect for launches, events, and deadlines.',
    image: Hourglass,
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Date Calculations', 'Animations'],
    category: 'frontend',
    github: '#',
    live: 'https://countdn.netlify.app',
    featured: false
  },
  // Backend Projects for your fullstack applications
  {
    id: '27',
    title: 'Freelancer Platform API',
    description: 'RESTful API backend for freelancer platform with JWT authentication, user management, project CRUD operations, payment processing endpoints, real-time messaging with Socket.io, and comprehensive admin dashboard APIs.',
    image: Freelance,
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'Socket.io'],
    category: 'backend',
    github: 'https://github.com/santhi1213/freelance-SaaS.git',
    live: '#',
    featured: true
  },
  {
    id: '28',
    title: 'Udaan Tech Academy API',
    description: 'Educational platform backend with secure authentication, course management APIs, student enrollment system, progress tracking, assignment submission handling, and integrated payment gateway with Stripe.',
    image: Udaan,
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'Multer'],
    category: 'backend',
    github: '#',
    live: '#',
    featured: true
  },
  {
    id: '29',
    title: 'Sri Bala Ganesh Youth Committee API',
    description: 'Community management backend with member authentication, event management APIs, news and gallery CRUD operations, image upload with Cloudinary integration, admin panel APIs, and member verification system.',
    image: SriBalaGanesh,
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'Cloudinary', 'Multer', 'BCrypt'],
    category: 'backend',
    github: 'https://github.com/santhi1213/sri-bala-ganesh-youth.git',
    live: '#',
    featured: true
  }
];

const defaultContactInfo: ContactInfo = {
  email: 'santhiraju32@gmail.com',
  phone: '+91 9705675817',
  location: 'Andhra Pradesh, India',
  github: 'https://github.com/santhi1213',
  linkedin: 'https://www.linkedin.com/in/santhi-raju-0364ba248',
  twitter: '#'
};

const defaultAboutInfo: AboutInfo = {
  name: 'Santhi Raju',
  title: 'MERN Stack Developer',
  bio: 'Passionate full-stack developer specializing in MERN stack technologies with 1+ years of hands-on experience. Expert in building scalable web applications, RESTful APIs, and modern user interfaces. Proven track record of delivering 25+ successful projects ranging from simple utilities to complex full-stack platforms. Strong focus on clean code, performance optimization, and user experience.',
  experience: '1+ Years Experience',
  projectsCompleted: '25+ Projects Completed',
  availability: 'Available for new projects'
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo>(defaultContactInfo);
  const [aboutInfo, setAboutInfo] = useState<AboutInfo>(defaultAboutInfo);

  useEffect(() => {
    // Load data from localStorage or use defaults
    const savedSkills = localStorage.getItem('portfolio_skills');
    const savedProjects = localStorage.getItem('portfolio_projects');
    const savedContactInfo = localStorage.getItem('portfolio_contact');
    const savedAboutInfo = localStorage.getItem('portfolio_about');

    setSkills(savedSkills ? JSON.parse(savedSkills) : defaultSkills);
    setProjects(savedProjects ? JSON.parse(savedProjects) : defaultProjects);
    setContactInfo(savedContactInfo ? JSON.parse(savedContactInfo) : defaultContactInfo);
    setAboutInfo(savedAboutInfo ? JSON.parse(savedAboutInfo) : defaultAboutInfo);
  }, []);

  const saveToStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const addSkill = (skill: Omit<Skill, 'id'>) => {
    const newSkill = { ...skill, id: Date.now().toString() };
    const updatedSkills = [...skills, newSkill];
    setSkills(updatedSkills);
    saveToStorage('portfolio_skills', updatedSkills);
  };

  const updateSkill = (id: string, skillUpdate: Partial<Skill>) => {
    const updatedSkills = skills.map(skill =>
      skill.id === id ? { ...skill, ...skillUpdate } : skill
    );
    setSkills(updatedSkills);
    saveToStorage('portfolio_skills', updatedSkills);
  };

  const deleteSkill = (id: string) => {
    const updatedSkills = skills.filter(skill => skill.id !== id);
    setSkills(updatedSkills);
    saveToStorage('portfolio_skills', updatedSkills);
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject = { ...project, id: Date.now().toString() };
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    saveToStorage('portfolio_projects', updatedProjects);
  };

  const updateProject = (id: string, projectUpdate: Partial<Project>) => {
    const updatedProjects = projects.map(project =>
      project.id === id ? { ...project, ...projectUpdate } : project
    );
    setProjects(updatedProjects);
    saveToStorage('portfolio_projects', updatedProjects);
  };

  const deleteProject = (id: string) => {
    const updatedProjects = projects.filter(project => project.id !== id);
    setProjects(updatedProjects);
    saveToStorage('portfolio_projects', updatedProjects);
  };

  const updateContactInfo = (info: ContactInfo) => {
    setContactInfo(info);
    saveToStorage('portfolio_contact', info);
  };

  const updateAboutInfo = (info: AboutInfo) => {
    setAboutInfo(info);
    saveToStorage('portfolio_about', info);
  };

  const value = {
    skills,
    projects,
    contactInfo,
    aboutInfo,
    addSkill,
    updateSkill,
    deleteSkill,
    addProject,
    updateProject,
    deleteProject,
    updateContactInfo,
    updateAboutInfo
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};


