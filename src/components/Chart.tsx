import React from 'react';
import { motion } from 'framer-motion';
import { Transaction } from '../types';

interface ChartProps {
  transactions: Transaction[];
}

const Chart: React.FC<ChartProps> = ({ transactions }) => {
  // Calculate expense categories data for pie chart
  const getExpenseCategoriesData = () => {
    const expenseTransactions = transactions.filter(t => t.amount < 0);
    const categoryMap = new Map<string, number>();
    
    expenseTransactions.forEach(transaction => {
      const category = transaction.category;
      const amount = Math.abs(transaction.amount);
      categoryMap.set(category, (categoryMap.get(category) || 0) + amount);
    });
    
    return Array.from(categoryMap.entries()).map(([name, value]) => ({
      name,
      value: parseFloat(value.toFixed(2))
    }));
  };

  // Calculate income vs expense data for bar chart
  const getIncomeExpenseData = () => {
    const totalIncome = transactions
      .filter(t => t.amount > 0)
      .reduce((sum, t) => sum + (t.amount || 0), 0);
    
    const totalExpense = Math.abs(transactions
      .filter(t => t.amount < 0)
      .reduce((sum, t) => sum + (t.amount || 0), 0));
    
    return {
      income: totalIncome,
      expense: totalExpense
    };
  };

  const expenseData = getExpenseCategoriesData();
  const incomeExpenseData = getIncomeExpenseData();
  
  const COLORS = [
    '#0EA5E9', // premium-500
    '#10B981', // success-500
    '#D946EF', // accent-500
    '#F59E0B', // warning-500
    '#EF4444', // red-500
    '#8B5CF6', // violet-500
    '#EC4899', // pink-500
    '#6B7280'  // gray-500
  ];

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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="relative text-lg font-semibold text-premium-700 mb-2">No data to display</h3>
        <p className="relative text-premium-600">Add some transactions to see charts!</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Income vs Expense Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="relative overflow-hidden bg-gradient-to-br from-premium-50 via-white to-accent-50 rounded-2xl shadow-premium p-6 border border-premium-100"
      >
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-bl from-premium-200/30 to-transparent rounded-full -translate-y-10 -translate-x-10"></div>
        
        <h3 className="relative text-xl font-semibold text-premium-800 mb-6 flex items-center">
          <span className="w-8 h-8 bg-gradient-to-br from-premium-500 to-premium-600 rounded-lg flex items-center justify-center mr-3">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </span>
          Income vs Expense
        </h3>
        
        {/* Custom Bar Chart */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-premium-700">Income</span>
            <span className="text-lg font-bold text-success-600">${incomeExpenseData.income.toFixed(2)}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((incomeExpenseData.income / Math.max(incomeExpenseData.income, incomeExpenseData.expense)) * 100, 100)}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="bg-gradient-to-r from-success-400 to-success-600 h-4 rounded-full"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-premium-700">Expense</span>
            <span className="text-lg font-bold text-warning-600">${incomeExpenseData.expense.toFixed(2)}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((incomeExpenseData.expense / Math.max(incomeExpenseData.income, incomeExpenseData.expense)) * 100, 100)}%` }}
              transition={{ duration: 1, delay: 0.7 }}
              className="bg-gradient-to-r from-warning-400 to-warning-600 h-4 rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Expense Categories Pie Chart */}
      {expenseData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="relative overflow-hidden bg-gradient-to-br from-premium-50 via-white to-accent-50 rounded-2xl shadow-premium p-6 border border-premium-100"
        >
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-accent-200/30 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
          
          <h3 className="relative text-xl font-semibold text-premium-800 mb-6 flex items-center">
            <span className="w-8 h-8 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
            </span>
            Expense by Category
          </h3>
          
          {/* Custom Category Breakdown */}
          <div className="space-y-3">
            {expenseData.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                className="flex items-center justify-between p-3 bg-white/60 rounded-lg border border-premium-100"
              >
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm font-medium text-premium-800">{category.name}</span>
                </div>
                <span className="text-sm font-bold text-premium-600">${category.value.toFixed(2)}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Chart;
