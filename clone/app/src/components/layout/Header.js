import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { theme, media, typography } from '../../theme';

// Icons
const icons = ['💰', '💸', '💳', '📊', '📉'];

// Animation for floating icons
const float = index => keyframes`
  0% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) rotate(${Math.random() * 20 - 10}deg); }
  50% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 30 - 15}px) rotate(${Math.random() * 30 - 15}deg); }
  75% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) rotate(${Math.random() * 20 - 10}deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
`;

const HeaderContainer = styled.header`
  position: relative;
  padding: 1rem 1rem 1rem;
  text-align: center;
  background: linear-gradient(to bottom, ${({ theme }) => theme.colors.card},rgba(255, 182, 193, 0));
  overflow: hidden;
  min-height: 100px;
  
  ${media.md} {
    padding: ${theme.spacing.xl} ${theme.spacing.lg};
  }
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  padding-top: 1rem; /* Add padding to account for absolute positioned settings button */
`;

const LogoGroup = styled.div`
  position: relative;
  display: inline-block;
  margin: 0 auto;
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  min-width: 250px;
  
  ${media.md} {
    padding: ${theme.spacing.md} ${theme.spacing.xl};
    min-width: 300px;
  }
`;

const AppName = styled.h1`
  ${typography('h1')};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  letter-spacing: -0.5px;
  line-height: 1.2;
`;

const Tagline = styled.p`
  ${typography('caption')};
  color: ${theme.colors.textLight};
  margin: ${theme.spacing.xs} 0 0;
  font-weight: 400;
  line-height: 1.4;
`;

const FloatingIcon = styled.span`
  position: absolute;
  opacity: 0.8;
  z-index: 1;
  animation: ${props => float(props.index)} ${props => 5 + Math.random() * 5}s ease-in-out infinite;
  color: ${theme.colors.primary};
  
  /* Position icons with more spread */
  &:nth-child(1) { /* Far Top Left */
    top: -15px;
    left: -10px;
    font-size: 1.5rem;
    ${media.md} {
      top: -20px;
      left: -15px;
      font-size: 1.75rem;
    }
  }
  
  &:nth-child(2) { /* Top Right - Moved further right and down */
    top: 10px;
    right: -30px;
    font-size: 1.5rem;
    ${media.md} {
      top: 15px;
      right: -40px;
      font-size: 1.75rem;
    }
  }
  
  &:nth-child(3) { /* Middle Left - Moved further left and up */
    top: 40%;
    left: -40px;
    font-size: 1.75rem;
    transform: translateY(-50%);
    ${media.md} {
      left: -50px;
      font-size: 2rem;
    }
  }
  
  &:nth-child(4) { /* Middle Right - Moved further right and down */
    top: 60%;
    right: -40px;
    font-size: 1.75rem;
    transform: translateY(-50%);
    ${media.md} {
      right: -50px;
      font-size: 2rem;
    }
  }
  
  &:nth-child(5) { /* Bottom Center - Further Down */
    bottom: -25px;
    left: 50%;
    font-size: 1.75rem;
    transform: translateX(-50%);
    ${media.md} {
      bottom: -30px;
      font-size: 2rem;
    }
  }
`;

const SettingsButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  z-index: 100;
  padding: 0.5rem;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary}15;
    transform: rotate(30deg) scale(1.1);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
  
  ${media.md} {
    top: 1.5rem;
    right: 2rem;
  }
`;

const Logo = () => (
  <LogoGroup>
    <AppName>Skip It Save It</AppName>
    <Tagline>Rethink the spend. Reclaim your future!</Tagline>
    
    {/* Keep only first two icons */}
    {['💰', '💸'].map((icon, index) => (
      <FloatingIcon key={index} index={index}>
        {icon}
      </FloatingIcon>
    ))}
  </LogoGroup>
);

export const Header = () => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <SettingsButton onClick={() => navigate('/settings')} aria-label="Settings">
        ⚙️
      </SettingsButton>
      <HeaderContent>
        <Logo />
      </HeaderContent>
    </HeaderContainer>
  );
};
