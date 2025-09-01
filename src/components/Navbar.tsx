import React from 'react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden bg-gradient-to-r from-premium-600 via-premium-500 to-accent-600 shadow-premium px-6 py-4 mb-8"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/10 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="relative max-w-7xl mx-auto">
        <div className="flex items-center">
          <div className="flex items-center space-x-3">
            <motion.div 
              className="w-12 h-12 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </motion.div>
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">Finance Tracker</h1>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
