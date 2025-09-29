import styled from 'styled-components';
import { theme } from '../../theme';

const TransactionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.5rem;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${theme.borderRadius.md};
  margin-bottom: ${theme.spacing.sm};
  box-shadow: ${theme.shadows.sm};
  transition: transform 0.2s ease;
  
  &:active {
    transform: scale(0.98);
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(
  rgba(255, 255, 255, 0.2),
  rgba(255, 255, 255, 0.2)
), ${props => props.background || theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing.md};
  color: white;
  font-size: 20px;
`;

const Info = styled.div``;

const Title = styled.h3`
  font-size: 0.9rem;
  margin: 0 0 ${theme.spacing.xs} 0;
  color: ${({ theme }) => theme.colors.text};
`;

const DateText = styled.p`
  font-size: 0.7rem;
  color: ${theme.colors.textLight};
  margin: 0;
`;

const Amount = styled.span`
  font-weight: 600;
  color: ${props => props.type === 'income' ? theme.colors.success : theme.colors.error};
`;

export const TransactionItem = ({ title, amount, date, type = 'expense', icon = '💰' }) => {
  const getBackgroundColor = () => {
    const colors = ['#6C63FF', '#FF6584', '#48BB78', '#F6E05E', '#9F7AEA'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <TransactionContainer>
      <LeftSection>
        <Icon background={getBackgroundColor()}>
          {icon}
        </Icon>
        <Info>
          <Title>{title}</Title>
          <DateText>{date}</DateText>
        </Info>
      </LeftSection>
      <Amount type={type}>
        {type === 'expense' ? '-' : '+'}${amount.toFixed(2)}
      </Amount>
    </TransactionContainer>
  );
};
