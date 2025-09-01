import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Transaction } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDeleteTransaction }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = [
      'bg-premium-100 text-premium-800 border-premium-200',
      'bg-success-100 text-success-800 border-success-200',
      'bg-accent-100 text-accent-800 border-accent-200',
      'bg-warning-100 text-warning-800 border-warning-200',
      'bg-red-100 text-red-800 border-red-200',
      'bg-indigo-100 text-indigo-800 border-indigo-200',
      'bg-pink-100 text-pink-800 border-pink-200',
      'bg-gray-100 text-gray-800 border-gray-200'
    ];
    
    const index = category.charCodeAt(0) % colors.length;
    return colors[index];
  };

  if (transactions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden bg-gradient-to-br from-premium-50 via-white to-accent-50 rounded-2xl shadow-premium p-8 text-center border border-premium-100"
      >
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-premium-200/30 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
        
        <div className="relative text-premium-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="relative text-lg font-semibold text-premium-700 mb-2">No transactions yet</h3>
        <p className="relative text-premium-600">Add your first transaction to get started!</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="relative overflow-hidden bg-gradient-to-br from-premium-50 via-white to-accent-50 rounded-2xl shadow-premium p-6 border border-premium-100"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-premium-200/30 to-transparent rounded-full -translate-y-10 -translate-x-10"></div>
      
      <h3 className="relative text-xl font-semibold text-premium-800 mb-6 flex items-center">
        <span className="w-8 h-8 bg-gradient-to-br from-premium-500 to-premium-600 rounded-lg flex items-center justify-center mr-3">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </span>
        Transaction History
      </h3>
      
      <div className="relative space-y-3">
        <AnimatePresence>
          {transactions.map((transaction) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="relative flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-xl hover:bg-white hover:shadow-md transition-all duration-200 border border-premium-100/50 hover:border-premium-200"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-premium-800">{transaction.description}</h4>
                  <span className={`text-lg font-bold ${
                    transaction.amount >= 0 
                      ? 'text-success-600 drop-shadow-sm' 
                      : 'text-warning-600 drop-shadow-sm'
                  }`}>
                    {transaction.amount >= 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(transaction.category)}`}>
                    {transaction.category}
                  </span>
                  <span className="text-premium-600 font-medium">{formatDate(transaction.date)}</span>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onDeleteTransaction(transaction.id)}
                className="relative ml-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-all duration-200 hover:shadow-md"
                title="Delete transaction"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TransactionList;
