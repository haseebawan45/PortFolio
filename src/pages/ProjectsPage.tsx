import { motion, useInView } from 'framer-motion';
import { useState, useRef } from 'react';
import '../styles/ProjectsPage.css';
import specialistImg from '../assets/images/specialist.jpg';

interface Project {
  id: number;
  title: string;
  shortDescription: string;
  description: string[];
  technologies: string[];
  details: Record<string, string>;
  imageUrl: string;
  link: string;
}

const ProjectsPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(projectsRef, { once: true, amount: 0.2 });
  
  const projects: Project[] = [
    {
      id: 1,
      title: 'Bloodline',
      shortDescription: 'A blood donation app connecting donors with those in need.',
      description: [
        'Bloodline is a comprehensive mobile application designed to streamline the blood donation process. The app connects potential donors with patients and hospitals in need, creating an efficient ecosystem for blood donation.',
        'The app features real-time requests, donor matching based on blood type and location, notification alerts for urgent needs, and a donor reward system to encourage regular donations. The intuitive interface makes it easy for users to register, schedule donations, and track their donation history.'
      ],
      technologies: ['Flutter', 'Firebase', 'Geolocation', 'Push Notifications'],
      details: {
        'Platform': 'Android & iOS',
        'Built with': 'Flutter, Firebase',
        'Features': 'Real-time matching, Geolocation, Push notifications',
        'Timeline': '3 months',
        'Role': 'Full-stack mobile developer'
      },
      imageUrl: 'https://via.placeholder.com/500x300/ff7b29/ffffff?text=Bloodline+App',
      link: '#'
    },
    {
      id: 2,
      title: 'Tiklarm',
      shortDescription: 'A modern, feature-rich clock and alarm application.',
      description: [
        'Tiklarm reimagines the traditional alarm clock with creative wake-up methods and sleep analysis features. The app includes customizable alarm sounds, gradual wake-up options that increase volume slowly, and puzzle-based alarm deactivation to ensure users fully wake up.',
        'The app also incorporates sleep tracking functionality, providing users with insights about their sleep patterns and offering recommendations for better rest. The clean, intuitive interface makes setting multiple alarms and timers simple and efficient.'
      ],
      technologies: ['Flutter', 'Local Storage', 'Sleep Tracking', 'UI/UX Design'],
      details: {
        'Platform': 'Android & iOS',
        'Built with': 'Flutter, Local Storage',
        'Features': 'Sleep tracking, Smart alarms, Custom sounds',
        'Timeline': '2 months',
        'Role': 'UI/UX Designer and Developer'
      },
      imageUrl: 'https://via.placeholder.com/500x300/f9a66c/ffffff?text=Tiklarm+App',
      link: '#'
    },
    {
      id: 3,
      title: 'Specialist Doctors',
      shortDescription: 'A healthcare platform connecting patients with specialized medical professionals.',
      description: [
        'Specialist Doctors simplifies the process of finding and booking appointments with specialized healthcare providers. The app features an extensive database of medical professionals categorized by specialty, location, and availability.',
        'Patients can browse doctor profiles with credentials, reviews, and ratings, book appointments directly through the app, receive reminders, and manage their medical history. The platform also includes secure messaging for pre-appointment questions and follow-up care.'
      ],
      technologies: ['Flutter', 'Node.js', 'FireBase', 'Healthcare API'],
      details: {
        'Platform': 'Android & iOS',
        'Built with': 'Flutter, FireBase backend',
        'Features': 'Appointment scheduling, Doctor reviews, Secure messaging',
        'Timeline': '4 months',
        'Role': 'Lead Mobile Developer'
      },
      imageUrl: specialistImg,
      link: '#'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: (index: number) => ({
      x: index % 2 === 0 ? -100 : 100,
      y: 50,
      opacity: 0,
      scale: 0.8,
      rotateY: index % 2 === 0 ? -10 : 10
    }),
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 15,
        duration: 0.8
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent, id: number) => {
    if (activeIndex !== id) return;
    
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    const target = e.currentTarget as HTMLElement;
    target.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    
    const glare = target.querySelector('.card-glare') as HTMLElement;
    if (glare) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 40%, rgba(255, 255, 255, 0) 60%)`;
    }
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.style.transform = '';
    setActiveIndex(null);
    
    const glare = target.querySelector('.card-glare') as HTMLElement;
    if (glare) {
      glare.style.background = '';
    }
  };

  return (
    <motion.div 
      className="projects-page"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      exit={{ opacity: 0 }}
      variants={containerVariants}
      ref={projectsRef}
    >
      <motion.h1 
        className="page-title"
        variants={titleVariants}
      >
        MY PROJECTS
      </motion.h1>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.div 
            key={project.id}
            className={`project-card ${activeIndex === project.id ? 'active' : ''}`}
            custom={index}
            variants={cardVariants}
            whileHover={{ 
              scale: 1.02, 
              transition: { duration: 0.2 } 
            }}
            onMouseMove={(e) => handleMouseMove(e, project.id)}
            onMouseEnter={() => setActiveIndex(project.id)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="card-content">
              <div className="card-glare"></div>
              <div className="card-image">
                <img src={project.imageUrl} alt={project.title} />
              </div>
              <div className="card-details">
                <h2>{project.title}</h2>
                <p>{project.shortDescription}</p>
                <div className="technologies">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <a href={project.link} className="view-project" target="_blank" rel="noopener noreferrer">
                  View Project
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectsPage;