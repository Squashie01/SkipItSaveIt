import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../theme';
import { FiTrendingUp } from 'react-icons/fi';

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  margin:  0.5rem;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.card};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  width: 100%;
  max-width: 300px;
  text-align: center;
`;

const Amount = styled.div`
  font-size: 40px;
  font-weight: 700;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${theme.spacing.sm};
  display: inline-block;
`;

const Label = styled.div`
  font-size: ${theme.typography.caption};
  color: ${({ theme }) => theme.colors.text};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: ${theme.spacing.xs};
`;

const TimeSavedInfo = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  margin-top: ${theme.spacing.sm};
  padding-top: ${theme.spacing.sm};
  border-top: 1px solid ${theme.colors.border};
`;

const PotentialSavings = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: ${theme.spacing.xs};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.success};
  font-weight: 500;
  
  svg {
    margin-top: 1px;
  }
`;

const TimeSavedContainer = styled.div`
  margin-top: ${theme.spacing.sm};
  padding-top: ${theme.spacing.sm};
  border-top: 1px solid ${theme.colors.border};
  text-align: center;
`;

const TimeSaved = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;

  span:first-child {
    font-size: 16px;
  }
`;

const TimeBreakdown = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textLight};
  margin-top: 4px;
`;

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const TotalSaved = () => {
  const [savingsData, setSavingsData] = useState({
    totalSaved: 0,
    totalPotential: 0,
    totalWorkHours: 0,
    itemCount: 0
  });

  useEffect(() => {
    // Calculate total savings and work hours from skipped items
    const calculateSavings = () => {
      const skippedItems = JSON.parse(localStorage.getItem('skippedItems') || '[]');
      const totalSaved = skippedItems.reduce((sum, item) => sum + (item.price || 0), 0);
      const totalPotential = skippedItems.reduce((sum, item) => sum + (item.potentialSavings || 0), 0);
      const totalWorkHours = skippedItems.reduce((sum, item) => sum + (parseFloat(item.workHours) || 0), 0);
      
      setSavingsData({
        totalSaved,
        totalPotential,
        totalWorkHours: parseFloat(totalWorkHours.toFixed(1)),
        itemCount: skippedItems.length
      });
    };

    // Initial calculation
    calculateSavings();

    // Listen for storage changes to update in real-time
    const handleStorageChange = (e) => {
      if (e.key === 'skippedItems') {
        calculateSavings();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Container>
      <Card>
        <Label>Total Saved</Label>
        <Amount>{formatCurrency(savingsData.totalSaved)}</Amount>
        <TimeSavedInfo>
          From {savingsData.itemCount} skipped purchase{savingsData.itemCount !== 1 ? 's' : ''}
        </TimeSavedInfo>
        {savingsData.totalPotential > 0 && (
          <>
            <PotentialSavings>
              <FiTrendingUp size={16} />
              <span>Potential: {formatCurrency(savingsData.totalPotential)}</span>
            </PotentialSavings>
            <TimeSavedContainer>
              <TimeSaved>
                <span>⏱️</span>
                <span>Time saved: {savingsData.totalWorkHours.toFixed(1)} work hours</span>
              </TimeSaved>
              {savingsData.totalWorkHours > 0 && (
                <TimeBreakdown>
                  {(() => {
                    const workDays = savingsData.totalWorkHours / 8;
                    if (workDays < 0.1) {
                      return 'Less than 1 work day saved';
                    } else if (workDays < 1) {
                      return 'Almost 1 work day saved';
                    } else if (workDays < 2) {
                      return 'Over 1 work day saved';
                    } else {
                      return `That's about ${Math.round(workDays)} work days saved`;
                    }
                  })()}
                </TimeBreakdown>
              )}
            </TimeSavedContainer>
          </>
        )}
      </Card>
    </Container>
  );
};
