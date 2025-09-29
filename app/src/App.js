import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { Header } from './components/layout/Header';
import { Navigation } from './components/layout/Navigation';
import { TotalSaved } from './components/savings/TotalSaved';
import { SavingsGoal } from './components/savings/SavingsGoal';
import { TransactionItem } from './components/transactions/TransactionItem';
import Settings from './pages/Settings';
import Calculator from './pages/Calculator';
import { theme as defaultTheme, getTheme, THEMES, media } from './theme';
import { ThemeProvider as AppThemeProvider, useTheme } from './context/ThemeContext';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  position: relative;
  overflow-x: hidden;
  width: 100%;
  max-width: 100vw;
`;

const MainContent = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  max-width: 100%;
  width: 100%;
  padding-top: 1rem;
  position: relative;
  
  ${({ theme }) => media.sm`
    padding: ${theme.spacing.lg} ${theme.spacing.md} ${theme.spacing.xxl};
    max-width: 42rem;
  `}
  
  ${({ theme }) => media.md`
    padding: ${theme.spacing.xl} ${theme.spacing.lg} ${theme.spacing.xxl};
    max-width: 48rem;
  `}
`;

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const NoTransactions = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textLight};
  padding: ${({ theme }) => theme.spacing.md} 0;
  
  ${({ theme }) => media.sm`
    padding: ${theme.spacing.xl};
  `}
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.h2.mobile};
  font-family: ${({ theme }) => theme.typography.h2.fontFamily || 'Poppins, sans-serif'};
  font-weight: ${({ theme }) => theme.typography.h2.fontWeight || 700};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  letter-spacing: -0.5px;
  line-height: 1.2;
  
  ${({ theme }) => media.md`
    font-size: ${theme.typography.h2.desktop};
    margin-bottom: ${theme.spacing.xl};
  `}
`;

// Note: Removed the floating action button since we have it in the Navigation component

// Sample data
const sampleTransactions = [
  { 
    id: 1, 
    title: 'Coffee', 
    amount: 4.50, 
    date: 'Today', 
    type: 'expense', 
    icon: '☕',
    category: 'Food & Drinks'
  },
  { 
    id: 2, 
    title: 'Freelance Work', 
    amount: 250, 
    date: 'Yesterday', 
    type: 'income', 
    icon: '💼',
    category: 'Income'
  },
  { 
    id: 3, 
    title: 'Grocery Shopping', 
    amount: 78.32, 
    date: 'Yesterday', 
    type: 'expense', 
    icon: '🛒',
    category: 'Groceries'
  },
  { 
    id: 4, 
    title: 'Birthday Gift', 
    amount: 45.00, 
    date: '2 days ago', 
    type: 'expense', 
    icon: '🎁',
    category: 'Gifts'
  },
];

const formatDate = (dateString) => {
  // Create dates in local timezone
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const date = new Date(dateString);
  const compareDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
  const diffTime = today - compareDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (compareDate.getTime() === today.getTime()) return 'Today';
  if (compareDate.getTime() === yesterday.getTime()) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  
  return date.toLocaleDateString(undefined, { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

const Home = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Load and combine both skipped and purchased items
    const loadTransactions = () => {
      const skippedItems = JSON.parse(localStorage.getItem('skippedItems') || '[]');
      const purchasedItems = JSON.parse(localStorage.getItem('purchasedItems') || '[]');
      
      // Combine and sort by date (newest first)
      const allTransactions = [
        ...skippedItems.map(item => ({
          ...item,
          type: 'income', // Will show in green
          date: formatDate(item.date)
        })),
        ...purchasedItems.map(item => ({
          ...item,
          type: 'expense', // Will show in red
          date: formatDate(item.date)
        }))
      ].sort((a, b) => new Date(b.date) - new Date(a.date));
      
      setTransactions(allTransactions);
    };

    // Initial load
    loadTransactions();

    // Listen for storage changes
    const handleStorageChange = () => loadTransactions();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <>
      <TotalSaved />
      <MainContent>
        <Section>
          <SectionTitle>Recent Transactions</SectionTitle>
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <TransactionItem
                key={`${transaction.id}-${index}`}
                title={transaction.name}
                amount={transaction.price}
                date={transaction.date}
                type={transaction.type}
                icon={transaction.emoji}
                category={transaction.category}
              />
            ))
          ) : (
            <NoTransactions>No transactions yet. Add some using the calculator!</NoTransactions>
          )}
        </Section>
      </MainContent>
    </>
  );
};

const Savings = () => (
  <MainContent>
    <Section>
      <SectionTitle>Savings Goals</SectionTitle>
      <SavingsGoal />
    </Section>
  </MainContent>
);

function App() {
  return (
    <AppThemeProvider>
      <Router>
        <ThemedApp />
      </Router>
    </AppThemeProvider>
  );
}

function ThemedApp() {
  const { theme: themeName } = useTheme();
  const currentTheme = getTheme(themeName);

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <AppContainer>
        <Header />
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/savings" element={ <Savings /> } />
          <Route path="/settings" element={ <Settings /> } />
          <Route path="/calculator" element={ <Calculator /> } />
          <Route path="*" element={ <Navigate to="/" replace /> } />
        </Routes>
        <Navigation />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
