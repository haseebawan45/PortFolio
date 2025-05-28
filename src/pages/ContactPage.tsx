import { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=haseebawang4545@gmail.com&su=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`;
    window.open(gmailUrl, '_blank');
  };

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
      transition: { type: "spring", stiffness: 50 }
    }
  };

  return (
    <motion.div 
      className="contact-page"
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      variants={containerVariants}
    >
      <motion.h1 
        className="page-title"
        variants={itemVariants}
      >
        GET IN TOUCH
      </motion.h1>

      <div className="contact-content">
        <motion.div 
          className="contact-info"
          variants={itemVariants}
        >
          <motion.h2 variants={itemVariants}>Contact Information</motion.h2>
          <motion.p variants={itemVariants}>
            Feel free to reach out to me for any questions or collaborations.
            I'm always open to discussing new projects, creative ideas, or opportunities.
          </motion.p>
          
          <motion.div className="contact-details" variants={itemVariants}>
            <div className="contact-item">
              <h3>Email</h3>
              <p>haseebawang4545@gmail.com</p>
            </div>
            <div className="contact-item">
              <h3>Location</h3>
              <p>Available Remotely</p>
            </div>
            <div className="contact-item">
              <h3>Social Media</h3>
              <div className="social-links">
                <motion.a 
                  href="https://instagram.com/haseeb_awan45" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Instagram
                </motion.a>
                <motion.a 
                  href="https://x.com/haseeb_awan45" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Twitter
                </motion.a>
                <motion.a 
                  href="https://snapchat.com/haseeb_awan45" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Snapchat
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.form 
          className="contact-form"
          onSubmit={handleSubmit}
          variants={itemVariants}
        >
          <h2>Send a Message</h2>
          
          <div className="form-group">
            <motion.input 
              type="text" 
              name="name" 
              placeholder="Your Name" 
              required
              value={formData.name}
              onChange={handleChange}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            />
          </div>
          
          <div className="form-group">
            <motion.input 
              type="email" 
              name="email" 
              placeholder="Your Email" 
              required
              value={formData.email}
              onChange={handleChange}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            />
          </div>
          
          <div className="form-group">
            <motion.input 
              type="text" 
              name="subject" 
              placeholder="Subject" 
              required
              value={formData.subject}
              onChange={handleChange}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            />
          </div>
          
          <div className="form-group">
            <motion.textarea 
              name="message" 
              placeholder="Your Message" 
              required
              value={formData.message}
              onChange={handleChange}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            ></motion.textarea>
          </div>
          
          <motion.button 
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            SEND MESSAGE
          </motion.button>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default ContactPage;