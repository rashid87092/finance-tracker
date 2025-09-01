# Finance Tracker

A modern, responsive Personal Finance Tracker built with React, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Clean, Modern UI**: Professional design with soft shadows, rounded corners, and a neutral color palette
- **Real-time Balance Tracking**: Current balance displayed prominently at the top
- **Income & Expense Management**: Track both income and expenses with detailed categorization
- **Transaction History**: Complete history of all transactions with delete functionality
- **Data Persistence**: All data is automatically saved to LocalStorage
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Beautiful Animations**: Smooth transitions and animations using Framer Motion
- **Data Visualization**: Interactive charts using Recharts (pie chart for expenses, bar chart for income vs expense)

## Tech Stack

- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Recharts** for data visualization
- **LocalStorage** for data persistence

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd finance-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx          # Navigation header
│   ├── Balance.tsx         # Current balance display
│   ├── IncomeExpense.tsx   # Income and expense summary cards
│   ├── AddTransaction.tsx  # Form to add new transactions
│   ├── TransactionList.tsx # List of all transactions
│   ├── Chart.tsx          # Data visualization charts
│   └── index.ts           # Component exports
├── types/
│   └── index.ts           # TypeScript interfaces
├── App.tsx                # Main application component
└── index.tsx              # Application entry point
```

## Usage

### Adding Transactions

1. Fill in the transaction description
2. Enter the amount
3. Select a category from the dropdown
4. Choose transaction type (income or expense)
5. Click "Add Transaction"

### Managing Transactions

- View all transactions in the Transaction History section
- Delete transactions using the delete button
- All changes are automatically saved to LocalStorage

### Viewing Analytics

- **Current Balance**: Shows your net financial position
- **Income vs Expense Cards**: Quick overview of totals
- **Charts**: Visual representation of your spending patterns

## Features in Detail

### Transaction Categories

**Expenses:**
- Food & Dining
- Transportation
- Shopping
- Entertainment
- Healthcare
- Education
- Housing
- Utilities

**Income:**
- Salary
- Freelance
- Investment
- Other

### Data Persistence

The application automatically saves all transaction data to your browser's LocalStorage. This means:
- Your data persists between browser sessions
- No need for external databases or accounts
- Data is stored locally on your device

### Responsive Design

The application is fully responsive and provides an optimal experience on:
- Desktop computers
- Tablets
- Mobile phones

## Customization

### Colors

The application uses a professional color palette:
- **Income**: Green (#10B981)
- **Expense**: Red (#EF4444)
- **Neutral**: Light gray (#F8FAFC)

### Styling

All styling is done with Tailwind CSS, making it easy to customize:
- Modify `tailwind.config.js` for theme changes
- Update component classes for styling adjustments
- Add custom CSS in `src/index.css`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please:
1. Check the existing issues
2. Create a new issue with detailed information
3. Include your browser and operating system details

---

Built with ❤️ using React and modern web technologies.
