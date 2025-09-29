import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { theme as themeVars, typography } from '../theme';
import { FiArrowLeft, FiSun, FiMoon, FiDollarSign, FiClock, FiInfo, FiBell, FiSave } from 'react-icons/fi';

const SettingsContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  max-width: 600px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.background};
  transition: background 0.3s ease;
  min-height: 100vh;
`;

const IncomeForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const SettingsHeader = styled.header`
  width: 90vw;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  padding: 0 ${({ theme }) => theme.spacing.sm};
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.card};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-50%) translateX(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-left: ${({ theme }) => theme.spacing.xxl};
  line-height: 1.2;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2rem;
  }
`;

const SettingsSection = styled.section`
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
    transform: translateY(-1px);
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-top: 0;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  line-height: 1;
  
  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.5rem;
  }
`;

const SettingsItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.2s ease;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    padding-left: ${({ theme }) => theme.spacing.sm};
    span:last-child {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const SettingsLabel = styled.span`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  
  svg {
    color: ${({ theme }) => theme.colors.textLight};
    width: 18px;
    height: 18px;
  }
`;

const Toggle = styled.label`
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 52px;
  height: 28px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.name === 'dark' ? '#4A4A6A' : '#E0E0E0'};
    transition: all 0.3s ease;
    border-radius: 34px;
    
    &:before {
      position: absolute;
      content: "";
      height: 20px;
      width: 20px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: all 0.3s ease;
      border-radius: 50%;
      box-shadow: 0 2px 4px rgba(0,0,0,0.15);
    }
  }
  
  input:checked + .slider {
    background: ${({ theme }) => theme.colors.buttonGradient || theme.colors.primary};
  }
  
  input:checked + .slider:before {
    transform: translateX(24px);
  }
  
  .icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    font-size: 14px;
    z-index: 1;
    
    &.sun {
      left: 6px;
      opacity: ${({ theme }) => theme.name === 'light' ? '1' : '0.5'};
    }
    
    &.moon {
      right: 6px;
      opacity: ${({ theme }) => theme.name === 'dark' ? '1' : '0.5'};
    }
  }
`;

const VersionBadge = styled.span`
  background: ${({ theme }) => theme.colors.primary}15;
  color: ${({ theme }) => theme.colors.primary};
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: 0.5rem;
  
  svg {
    color: ${({ theme }) => theme.colors.textLight};
    width: 18px;
    height: 18px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.card};
  transition: all 0.2s ease;
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}15;
  }
`;

const SaveButton = styled.button`
  background: ${({ theme }) => theme.colors.buttonGradient || theme.colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.buttonGradientHover || theme.colors.primaryHover};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Settings = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const currentTheme = isDarkMode ? 'dark' : 'light';
  
  const [income, setIncome] = useState('');
  const [hours, setHours] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Load saved data from localStorage
    const savedIncome = localStorage.getItem('userIncome');
    const savedHours = localStorage.getItem('workHours');
    if (savedIncome) setIncome(savedIncome);
    if (savedHours) setHours(savedHours);
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Save to localStorage
    localStorage.setItem('userIncome', income);
    localStorage.setItem('workHours', hours);
    
    // Show feedback
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <SettingsContainer>
      <SettingsHeader>
        <BackButton onClick={() => navigate(-1)} aria-label="Go back">
          <FiArrowLeft />
        </BackButton>
        <Title>Settings</Title>
      </SettingsHeader>
      
      <SettingsSection>
        <SectionTitle>
          <FiSun />
          Appearance
        </SectionTitle>
        <SettingsItem>
          <SettingsLabel>
            <FiMoon />
            Dark Mode
          </SettingsLabel>
          <Toggle name={currentTheme}>
            <input 
              type="checkbox" 
              checked={isDarkMode} 
              onChange={toggleTheme}
              aria-label="Toggle dark mode"
            />
            <span className="slider">
              <FiSun className="icon sun" />
              <FiMoon className="icon moon" />
            </span>
          </Toggle>
        </SettingsItem>
      </SettingsSection>
      
      <SettingsSection>
        <SectionTitle>
          <FiDollarSign />
          Income & Work Hours
        </SectionTitle>
        <IncomeForm onSubmit={handleSave}>
          <FormGroup>
            <Label>
              <FiDollarSign />
              Monthly Income
            </Label>
            <Input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="Enter your monthly income"
              min="0"
              step="0.01"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label>
              <FiClock />
              Weekly Work Hours
            </Label>
            <Input
              type="number"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="Hours per week"
              min="1"
              max="168"
              required
            />
          </FormGroup>
          
          <SaveButton type="submit" disabled={isSaving}>
            <FiSave />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </SaveButton>
        </IncomeForm>
      </SettingsSection>
      
      <SettingsSection>
        <SectionTitle>
          <FiInfo />
          About
        </SectionTitle>
        <SettingsItem>
          <SettingsLabel>
            <FiBell />
            Version
          </SettingsLabel>
          <VersionBadge>1.0.0</VersionBadge>
        </SettingsItem>
      </SettingsSection>
    </SettingsContainer>
  );
};

export default Settings;
