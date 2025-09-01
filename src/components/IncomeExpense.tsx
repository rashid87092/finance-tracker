import React from 'react';
import { motion } from 'framer-motion';

interface IncomeExpenseProps {
  income: number;
  expense: number;
}

const IncomeExpense: React.FC<IncomeExpenseProps> = ({ income, expense }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative overflow-hidden bg-gradient-to-br from-success-50 via-white to-success-100/50 rounded-2xl shadow-premium p-6 text-center border border-success-200 hover:shadow-glow-green transition-all duration-300"
      >
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-success-200/40 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
        
        <div className="flex items-center justify-center mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-success-400 to-success-600 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
        </div>
        <h3 className="text-success-700 text-sm font-semibold mb-2">Total Income</h3>
        <p className="text-3xl font-bold text-success-600 drop-shadow-sm">${income.toFixed(2)}</p>
        
        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-2xl shadow-glow-green opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative overflow-hidden bg-gradient-to-br from-warning-50 via-white to-warning-100/50 rounded-2xl shadow-premium p-6 text-center border border-warning-200 hover:shadow-glow-red transition-all duration-300"
      >
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-warning-200/40 to-transparent rounded-full -translate-y-10 -translate-x-10"></div>
        
        <div className="flex items-center justify-center mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-warning-400 to-warning-600 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
        <h3 className="text-warning-700 text-sm font-semibold mb-2">Total Expense</h3>
        <p className="text-3xl font-bold text-warning-600 drop-shadow-sm">${expense.toFixed(2)}</p>
        
        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-2xl shadow-glow-red opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </motion.div>
    </div>
  );
};

export default IncomeExpense;
