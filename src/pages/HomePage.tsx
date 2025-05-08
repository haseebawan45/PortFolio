import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 50,
        damping: 10
      }
    }
  };

  return (
    <motion.div 
      className="home-page"
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      variants={containerVariants}
    >
      <div className="hero-section">
        <motion.h1 className="main-title" variants={itemVariants}>
          HASEEB TARIQ
        </motion.h1>
        <motion.h2 className="subtitle" variants={itemVariants}>
          MOBILE DEVELOPER WITH FULL-STACK EXPERTISE
        </motion.h2>
        <motion.p className="description" variants={itemVariants}>
          I build intuitive, functional applications that blend performance with elegant user experiences.
          Specializing in Flutter, React, and native Android development, I create solutions 
          that make a positive impact on users' lives.
        </motion.p>
        <motion.div className="cta-buttons" variants={itemVariants}>
          <Link to="/projects">
            <motion.button 
              className="primary-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              VIEW PROJECTS
            </motion.button>
          </Link>
          <Link to="/contact">
            <motion.button 
              className="secondary-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              CONTACT ME
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HomePage; 