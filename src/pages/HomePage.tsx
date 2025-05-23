import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
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

  const glowVariants = {
    initial: { scale: 1, opacity: 0.5 },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
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
        <div className="content-wrapper">
          <motion.div 
            className="glow-effect"
            variants={glowVariants}
            initial="initial"
            animate="animate"
          />
          
          <motion.h1 className="main-title" variants={itemVariants}>
            HASEEB TARIQ
          </motion.h1>
          
          <motion.h2 className="subtitle" variants={itemVariants}>
            MOBILE DEVELOPER WITH FULL-STACK EXPERTISE
          </motion.h2>
          
          <motion.div 
            className="description-container"
            variants={itemVariants}
          >
            <p className="description">
              I build intuitive, scalable applications that blend cutting-edge technology 
              with elegant user experiences. Specializing in Flutter, React, and native 
              Android development, I create solutions that make a lasting impact.
            </p>
          </motion.div>
          
          <motion.div 
            className="stats-container"
            variants={itemVariants}
          >
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Projects<br/>Completed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5+</span>
              <span className="stat-label">Years of<br/>Experience</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Client<br/>Satisfaction</span>
            </div>
          </motion.div>

          <motion.div className="cta-buttons" variants={itemVariants}>
            <Link to="/projects">
              <motion.button 
                className="primary-button"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 8px 25px rgba(255, 180, 0, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                VIEW PROJECTS
              </motion.button>
            </Link>
            <Link to="/contact">
              <motion.button 
                className="secondary-button"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(255, 180, 0, 0.1)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                CONTACT ME
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default HomePage;