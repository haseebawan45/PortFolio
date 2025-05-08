import { motion } from 'framer-motion';
import '../styles/AboutPage.css';

const AboutPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 50 
      }
    }
  };

  const skills = [
    { name: 'Flutter', level: 90 },
    { name: 'React', level: 85 },
    { name: 'HTML/CSS', level: 88 },
    { name: 'JavaScript', level: 82 },
    { name: 'Kotlin', level: 78 },
    { name: 'Java', level: 75 },
    { name: 'UI/UX Design', level: 80 },
    { name: 'API Integration', level: 85 },
  ];

  return (
    <motion.div 
      className="about-page"
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      variants={containerVariants}
    >
      <motion.h1 
        className="page-title"
        variants={itemVariants}
      >
        ABOUT ME
      </motion.h1>

      <div className="about-content">
        <motion.div 
          className="about-text"
          variants={itemVariants}
        >
          <motion.h2 variants={itemVariants}>My Story</motion.h2>
          <motion.p variants={itemVariants}>
            I'm Haseeb Tariq, a passionate mobile and web developer focused on creating intuitive and functional applications. With expertise in Flutter, React, and native Android development, I build solutions that blend performance with elegant user experiences.
          </motion.p>
          <motion.p variants={itemVariants}>
            My development approach emphasizes clean code, responsive design, and seamless user experiences. Whether I'm building mobile apps or web platforms, I strive to create technology that makes a positive impact on users' lives.
          </motion.p>
          <motion.p variants={itemVariants}>
            When I'm not coding, you can find me exploring new technologies, contributing to the developer community, and constantly improving my skills through continuous learning.
          </motion.p>
        </motion.div>

        <motion.div 
          className="skills-section"
          variants={itemVariants}
        >
          <motion.h2 variants={itemVariants}>Skills</motion.h2>
          <div className="skills-container">
            {skills.map((skill, index) => (
              <motion.div 
                className="skill-item" 
                key={index}
                variants={itemVariants}
                custom={index}
              >
                <div className="skill-info">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <motion.div
                    className="skill-progress"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutPage; 