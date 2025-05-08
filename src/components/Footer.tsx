import { motion } from 'framer-motion';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <motion.footer 
      className="footer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="footer-content">
        <div className="footer-social">
          <motion.a 
            href="https://instagram.com/haseeb_awan45" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            INSTAGRAM
          </motion.a>
          <motion.a 
            href="https://x.com/haseeb_awan45" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            TWITTER
          </motion.a>
          <motion.a 
            href="https://snapchat.com/haseeb_awan45" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            SNAPCHAT
          </motion.a>
        </div>
        <div className="footer-copyright">
          <p>&copy; {currentYear} Haseeb Tariq. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer; 