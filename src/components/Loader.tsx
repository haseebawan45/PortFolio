import { motion } from 'framer-motion';
import '../styles/Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <motion.div 
        className="loader"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="circle"
          animate={{ 
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360],
            borderRadius: ["20%", "50%", "20%"]
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
            repeatDelay: 0.5
          }}
        />
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          LOADING
        </motion.h1>
      </motion.div>
    </div>
  );
};

export default Loader; 