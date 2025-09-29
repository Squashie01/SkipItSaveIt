import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { theme, media, typography } from '../../theme';


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
