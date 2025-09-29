import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { theme, media } from '../../theme';
import { FiPlus } from 'react-icons/fi';

// NavItem component
const NavItem = ({ icon, label, active, onClick, style, isFab }) => {
  if (isFab) {
    return (
      <FabButton onClick={onClick}>
        <FiPlus size={24} />
      </FabButton>
    );
  }
  
  return (
    <NavButton 
      onClick={onClick} 
      $active={active}
      aria-label={label}
      style={style}
    >
      {icon}
    </NavButton>
  );
};

// FabButton component
const FabButton = ({ onClick, children }) => (
  <AddButton onClick={onClick} aria-label="Calculate purchase">
    {children}
  </AddButton>
);


const NavContainer = styled.nav`
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.colors.card};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1.25rem;
  border-radius: 2rem;
  box-shadow: 0 0 15px 2px ${({ theme }) => theme.colors.secondary}55;
  z-index: 100;
  width: calc(100% - 2rem);
  max-width: 15rem;
  height: 3rem;
  
  ${media.sm} {
    bottom: 1.5rem;
    height: 4rem;
    padding: 0 1.5rem;
    border-radius: 2rem;
  }
`;

const NavButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.3rem;
  cursor: pointer;
  padding: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${theme.transitions.default};
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
  
  ${media.sm} {
    font-size: 1.6rem;
    width: 3rem;
    height: 3rem;
  }
  
  &:hover, &:focus-visible {
    color: white;
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1);
    outline: none;
  }
  
  
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  border: none;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
  position: relative;
  z-index: 10;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.3rem;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  left: 50%;
  top: -1.5rem;
  transform: translateX(-50%);
  box-shadow: 0 0 15px 2px ${({ theme }) => theme.colors.secondary}55;
  transition: ${theme.transitions.default};
  z-index: 101;
  
  ${media.sm} {
    width: 4.5rem;
    height: 4.5rem;
    top: -2.25rem;
    font-size: 2rem;
  }
  
  &:hover, &:focus-visible {
    transform: translateX(-50%) scale(1.05);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
    outline: none;
  }
  
  &:active {
    transform: translateX(-50%) scale(0.98);
  }
`;

export const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: '🏠', label: 'Home' },
    { path: '/savings', icon: '🪙', label: 'Savings' },
    { path: '/calculator', icon: '+', label: 'Calculator', isFab: true },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <NavContainer>
      {navItems.map((item) => (
        <NavItem
          key={item.path}
          icon={item.icon}
          label={item.label}
          active={isActive(item.path)}
          onClick={() => navigate(item.path)}
          isFab={item.isFab}
        />
      ))}
    </NavContainer>
  );
};
