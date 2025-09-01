import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Balance from './components/Balance';
import IncomeExpense from './components/IncomeExpense';
import AddTransaction from './components/AddTransaction';
import TransactionList from './components/TransactionList';
import Chart from './components/Chart';
import { Transaction } from './types';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Set document title
  useEffect(() => {
    document.title = 'Finance Tracker';
  }, []);

  // Load transactions from localStorage on component mount
  useEffect(() => {
    try {
      const savedTransactions = localStorage.getItem('finance-tracker-transactions');
      if (savedTransactions) {
        const parsedTransactions = JSON.parse(savedTransactions);
        // Validate the data structure
        if (Array.isArray(parsedTransactions)) {
          const validTransactions = parsedTransactions.filter(t => 
            t && 
            typeof t.id === 'string' && 
            typeof t.description === 'string' && 
            typeof t.amount === 'number' && 
            typeof t.category === 'string' && 
            typeof t.type === 'string' && 
            typeof t.date === 'string'
          );
          setTransactions(validTransactions);
        } else {
          console.warn('Invalid data structure in localStorage, starting fresh');
          setTransactions([]);
        }
      }
    } catch (error) {
      console.error('Error loading transactions from localStorage:', error);
      setError('Failed to load saved transactions');
      // Clear corrupted data
      localStorage.removeItem('finance-tracker-transactions');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save transactions to localStorage whenever transactions change
  useEffect(() => {
    try {
      localStorage.setItem('finance-tracker-transactions', JSON.stringify(transactions));
    } catch (error) {
      console.error('Error saving transactions to localStorage:', error);
      setError('Failed to save transactions');
    }
  }, [transactions]);

  // Calculate totals with error handling
  const totalIncome = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  const totalExpense = Math.abs(transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + (t.amount || 0), 0));

  const balance = totalIncome - totalExpense;

  // Add new transaction with validation
  const handleAddTransaction = (transactionData: Omit<Transaction, 'id' | 'date'>) => {
    try {
      // Validate input data
      if (!transactionData.description.trim()) {
        throw new Error('Description is required');
      }
      if (!transactionData.amount || transactionData.amount === 0) {
        throw new Error('Amount must not be zero');
      }
      if (!transactionData.category.trim()) {
        throw new Error('Category is required');
      }

      const newTransaction: Transaction = {
        ...transactionData,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9), // More unique ID
        date: new Date().toISOString()
      };
      
      console.log('Adding new transaction:', newTransaction);
      setTransactions(prev => [newTransaction, ...prev]);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error adding transaction:', error);
      setError(error instanceof Error ? error.message : 'Failed to add transaction');
    }
  };

  // Delete transaction with confirmation
  const handleDeleteTransaction = (id: string) => {
    try {
      if (window.confirm('Are you sure you want to delete this transaction?')) {
        setTransactions(prev => prev.filter(t => t.id !== id));
        setError(null);
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
      setError('Failed to delete transaction');
    }
  };

  // Clear all transactions
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all transactions? This action cannot be undone.')) {
      setTransactions([]);
      localStorage.removeItem('finance-tracker-transactions');
      setError(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-premium-50 via-white to-accent-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-premium-200 border-t-premium-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-premium-600 font-medium">Loading your finances...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-premium-50 via-white to-accent-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 pb-8">
        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between"
          >
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-red-700 font-medium">{error}</span>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-500 hover:text-red-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}

        {/* Balance Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Balance balance={balance} />
        </motion.div>

        {/* Income & Expense Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <IncomeExpense income={totalIncome} expense={totalExpense} />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Add Transaction & Transaction List */}
          <div className="lg:col-span-2 space-y-8">
            <AddTransaction onAddTransaction={handleAddTransaction} />
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-premium-800">Transaction Management</h2>
              {transactions.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClearAll}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                >
                  Clear All
                </motion.button>
              )}
            </div>
            <TransactionList 
              transactions={transactions} 
              onDeleteTransaction={handleDeleteTransaction} 
            />
          </div>

          {/* Right Column - Charts */}
          <div className="lg:col-span-1">
            <Chart transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;