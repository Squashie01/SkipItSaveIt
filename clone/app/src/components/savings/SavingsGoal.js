import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../theme';
import { FiRefreshCw } from 'react-icons/fi';

const Container = styled.div`
  padding: ${theme.spacing.md};
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.md};
  box-shadow: ${theme.shadows.sm};
`;

const SectionTitle = styled.h2`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RefreshButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.9rem;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background 0.2s;
  
  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }
`;

const StatItem = styled.div`
  margin-bottom: ${theme.spacing.md};
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 4px;
`;

const StatValue = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const SuggestionCard = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
  margin-top: ${theme.spacing.md};
  border-left: 3px solid ${({ theme }) => theme.colors.primary};
`;

const SuggestionTitle = styled.h4`
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 0 ${theme.spacing.xs} 0;
  font-size: 0.95rem;
`;

const SuggestionText = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
`;

const suggestions = [
  "Consider investing in a low-cost index fund for long-term growth.",
  "This amount could cover a month's worth of groceries for a family.",
  "You could start an emergency fund with these savings.",
  "This could be a down payment on a high-yield savings account.",
  "Consider using these savings to pay down high-interest debt."
];

export const SavingsGoal = () => {
  const [skippedItems, setSkippedItems] = useState([]);
  const [totalSaved, setTotalSaved] = useState(0);
  const [suggestion, setSuggestion] = useState('');

  useEffect(() => {
    loadSkippedItems();
    getRandomSuggestion();
  }, []);

  const loadSkippedItems = () => {
    const items = JSON.parse(localStorage.getItem('skippedItems') || '[]');
    setSkippedItems(items);
    
    const saved = items.reduce((sum, item) => sum + (item.price || 0), 0);
    setTotalSaved(saved);
  };

  const getRandomSuggestion = () => {
    const randomIndex = Math.floor(Math.random() * suggestions.length);
    setSuggestion(suggestions[randomIndex]);
  };

  const handleRefresh = () => {
    loadSkippedItems();
    getRandomSuggestion();
  };

  return (
    <Container>
      <Card>
        <SectionTitle>
          Your Savings
          <RefreshButton onClick={handleRefresh}>
            <FiRefreshCw size={14} /> Refresh
          </RefreshButton>
        </SectionTitle>
        
        <StatItem>
          <StatLabel>Total Skipped Purchases</StatLabel>
          <StatValue>{skippedItems.length} items</StatValue>
        </StatItem>
        
        <StatItem>
          <StatLabel>Total Saved</StatLabel>
          <StatValue>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            }).format(totalSaved)}
          </StatValue>
        </StatItem>
        
        {suggestion && (
          <SuggestionCard>
            <SuggestionTitle>💡 Smart Suggestion</SuggestionTitle>
            <SuggestionText>{suggestion}</SuggestionText>
          </SuggestionCard>
        )}
      </Card>
    </Container>
  );
};
