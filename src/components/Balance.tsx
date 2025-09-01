import React from 'react';
import { motion } from 'framer-motion';

interface BalanceProps {
  balance: number;
}

const Balance: React.FC<BalanceProps> = ({ balance }) => {
  const isPositive = balance >= 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden bg-gradient-to-br from-premium-50 via-white to-accent-50 rounded-3xl shadow-premium p-8 text-center border border-premium-100"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-premium-200/30 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent-200/30 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
      
      <h2 className="relative text-premium-700 text-lg font-semibold mb-4">Current Balance</h2>
      <motion.div
        className={`relative text-5xl font-bold ${
          isPositive 
            ? 'text-success-600 drop-shadow-lg' 
            : 'text-warning-600 drop-shadow-lg'
        }`}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, type: "spring" }}
      >
        ${Math.abs(balance).toFixed(2)}
      </motion.div>
      
      {balance < 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative text-warning-600 text-sm mt-3 font-medium bg-warning-50 px-3 py-1 rounded-full inline-block"
        >
          ⚠️ Negative Balance
        </motion.div>
      )}
      
      {balance >= 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative text-success-600 text-sm mt-3 font-medium bg-success-50 px-3 py-1 rounded-full inline-block"
        >
          ✅ Positive Balance
        </motion.div>
      )}
      
      {/* Glow effect */}
      <div className={`absolute inset-0 rounded-3xl ${
        isPositive ? 'shadow-glow-green' : 'shadow-glow-red'
      } opacity-0 hover:opacity-100 transition-opacity duration-300`}></div>
    </motion.div>
  );
};

export default Balance;
