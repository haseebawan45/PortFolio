import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.header
      className={`header ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 50, damping: 15 }}
    >
      <div className="header-content">
        <motion.div
          className="logo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link to="/">
            HASEEB <span>TARIQ</span>
          </Link>
        </motion.div>

        <div className="mobile-menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
        </div>

        <motion.nav 
          className={`navigation ${menuOpen ? 'open' : ''}`}
          variants={navVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.ul>
            <motion.li variants={itemVariants}>
              <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                HOME
              </Link>
            </motion.li>
            <motion.li variants={itemVariants}>
              <Link to="/projects" className={location.pathname === '/projects' ? 'active' : ''}>
                PROJECTS
              </Link>
            </motion.li>
            <motion.li variants={itemVariants}>
              <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
                ABOUT
              </Link>
            </motion.li>
            <motion.li variants={itemVariants}>
              <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
                CONTACT
              </Link>
            </motion.li>
          </motion.ul>
        </motion.nav>
      </div>
    </motion.header>
  );
};

export default Header; 