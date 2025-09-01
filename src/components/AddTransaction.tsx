import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Transaction } from '../types';

interface AddTransactionProps {
  onAddTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
}

const AddTransaction: React.FC<AddTransactionProps> = ({ onAddTransaction }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    type: 'expense' as 'income' | 'expense'
  });

  const categories = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Healthcare',
    'Education',
    'Housing',
    'Utilities',
    'Salary',
    'Freelance',
    'Investment',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Form submitted with data:', formData);
    
    if (!formData.description || !formData.amount || !formData.category) {
      alert('Please fill in all fields');
      console.log('Validation failed - missing fields');
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount greater than 0');
      console.log('Validation failed - invalid amount:', amount);
      return;
    }

    // For expenses, we store the amount as negative; for income, as positive
    const finalAmount = formData.type === 'expense' ? -amount : amount;
    
    console.log('Processing transaction:', {
      description: formData.description,
      amount: finalAmount,
      category: formData.category,
      type: formData.type
    });

    try {
      onAddTransaction({
        description: formData.description,
        amount: finalAmount,
        category: formData.category,
        type: formData.type
      });
      
      console.log('Transaction added successfully');
      
      setFormData({
        description: '',
        amount: '',
        category: '',
        type: 'expense'
      });
    } catch (error) {
      console.error('Error adding transaction:', error);
      alert('Failed to add transaction. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="relative overflow-hidden bg-gradient-to-br from-premium-50 via-white to-accent-50 rounded-2xl shadow-premium p-6 border border-premium-100"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-premium-200/30 to-transparent rounded-full -translate-y-12 translate-x-12"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-accent-200/30 to-transparent rounded-full translate-y-10 -translate-x-10"></div>
      
      <h3 className="relative text-xl font-semibold text-premium-800 mb-6 flex items-center">
        <span className="w-8 h-8 bg-gradient-to-br from-premium-500 to-premium-600 rounded-lg flex items-center justify-center mr-3">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </span>
        Add New Transaction
      </h3>
      
      <form onSubmit={handleSubmit} className="relative space-y-4">
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-premium-700 mb-2">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-premium-200 rounded-lg focus:ring-2 focus:ring-premium-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm hover:bg-white"
            placeholder="Enter transaction description"
            required
          />
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-semibold text-premium-700 mb-2">
            Amount <span className="text-sm font-normal text-premium-600">(Enter positive amount)</span>
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-premium-200 rounded-lg focus:ring-2 focus:ring-premium-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm hover:bg-white"
            placeholder="0.00"
            step="0.01"
            min="0.01"
            required
          />
          <p className="text-xs text-premium-600 mt-1">
            {formData.type === 'expense' 
              ? '💸 Amount will be recorded as an expense (negative value)'
              : '💰 Amount will be recorded as income (positive value)'
            }
          </p>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-premium-700 mb-2">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-premium-200 rounded-lg focus:ring-2 focus:ring-premium-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm hover:bg-white"
            required
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-premium-700 mb-2">
            Transaction Type
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              formData.type === 'expense' 
                ? 'border-warning-300 bg-warning-50' 
                : 'border-premium-200 bg-white/60'
            }`}>
              <input
                type="radio"
                name="type"
                value="expense"
                checked={formData.type === 'expense'}
                onChange={handleInputChange}
                className="w-4 h-4 text-warning-500 focus:ring-warning-500 border-premium-300"
              />
              <span className={`ml-2 font-medium ${
                formData.type === 'expense' ? 'text-warning-700' : 'text-premium-700'
              }`}>💸 Expense</span>
            </label>
            <label className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              formData.type === 'income' 
                ? 'border-success-300 bg-success-50' 
                : 'border-premium-200 bg-white/60'
            }`}>
              <input
                type="radio"
                name="type"
                value="income"
                checked={formData.type === 'income'}
                onChange={handleInputChange}
                className="w-4 h-4 text-success-500 focus:ring-success-500 border-premium-300"
              />
              <span className={`ml-2 font-medium ${
                formData.type === 'income' ? 'text-success-700' : 'text-premium-700'
              }`}>💰 Income</span>
            </label>
          </div>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative w-full bg-gradient-to-r from-premium-500 to-premium-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-premium-600 hover:to-premium-700 transition-all duration-200 focus:ring-2 focus:ring-premium-500 focus:ring-offset-2 shadow-lg hover:shadow-xl"
        >
          <span className="flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Transaction
          </span>
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddTransaction;
