import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiClock, FiDollarSign, FiTrendingUp, FiCheck, FiX } from 'react-icons/fi';

// Enhanced emoji mapping with more specific categories and keywords
const EMOJI_MAP = {
  // Food & Drinks
  food: [
    { emojis: ['🍔', '🍟'], keywords: ['burger', 'fast food', 'mcdonalds'] },
    { emojis: ['🍕'], keywords: ['pizza', 'pizzeria'] },
    { emojis: ['🍣', '🍱'], keywords: ['sushi', 'japanese', 'japan'] },
    { emojis: ['🍜', '🍝'], keywords: ['noodle', 'ramen', 'pasta'] },
    { emojis: ['🥗', '🥙'], keywords: ['salad', 'healthy', 'veggie'] },
    { emojis: ['🍩', '🍪', '🧁'], keywords: ['donut', 'dessert', 'sweet', 'cake'] },
    { emojis: ['☕', '🍵'], keywords: ['coffee', 'tea', 'starbucks'] },
    { emojis: ['🍔', '🌭'], keywords: ['hotdog', 'frank'] },
    { emojis: ['🌮', '🌯'], keywords: ['taco', 'burrito', 'mexican'] },
    { emojis: ['🍎', '🍌', '🍊'], keywords: ['fruit', 'apple', 'banana', 'orange'] },
    { emojis: ['🍺', '🍷', '🍸'], keywords: ['beer', 'wine', 'alcohol', 'bar'] },
  ],
  
  // Clothing & Accessories
  clothing: [
    { emojis: ['👕', '👚'], keywords: ['shirt', 't-shirt', 'top'] },
    { emojis: ['👖', '👖'], keywords: ['jeans', 'pants', 'denim'] },
    { emojis: ['👗', '👗'], keywords: ['dress', 'gown'] },
    { emojis: ['👔', '👔'], keywords: ['tie', 'formal'] },
    { emojis: ['👟', '👞'], keywords: ['shoes', 'sneakers', 'footwear', 'nike', 'adidas'] },
    { emojis: ['🧥', '🧥'], keywords: ['jacket', 'coat'] },
    { emojis: ['🧢', '🎩'], keywords: ['hat', 'cap'] },
    { emojis: ['👜', '👛'], keywords: ['bag', 'purse', 'handbag'] },
    { emojis: ['👓', '🕶️'], keywords: ['glasses', 'sunglasses'] },
  ],
  
  // Electronics
  electronics: [
    { emojis: ['📱', '📱'], keywords: ['phone', 'iphone', 'samsung', 'smartphone'] },
    { emojis: ['💻', '💻'], keywords: ['laptop', 'computer', 'macbook'] },
    { emojis: ['🎧', '🎧'], keywords: ['headphone', 'earphone', 'airpods'] },
    { emojis: ['⌚', '⌚'], keywords: ['watch', 'apple watch', 'smartwatch'] },
    { emojis: ['📷', '📸'], keywords: ['camera', 'dslr'] },
    { emojis: ['🎮', '🎮'], keywords: ['game', 'gaming', 'playstation', 'xbox'] },
    { emojis: ['🔌', '🔋'], keywords: ['charger', 'cable', 'battery'] },
    { emojis: ['📺', '📺'], keywords: ['tv', 'television'] },
  ],
  
  // Default fallback emojis
  default: ['🛍️', '💎', '📦', '🎁', '✨', '💫', '🌟']
};

// Helper function to get a relevant emoji based on item name
const getEmojiForItem = (itemName = '') => {
  if (!itemName.trim()) return '🛍️';
  
  const lowerName = itemName.toLowerCase();
  
  // Check each category for matching keywords
  for (const category in EMOJI_MAP) {
    if (category === 'default') continue;
    
    const items = EMOJI_MAP[category];
    for (const item of items) {
      // Check if any keyword matches the item name
      const hasMatch = item.keywords.some(keyword => 
        lowerName.includes(keyword)
      );
      
      if (hasMatch) {
        // Return a random emoji from the matching group
        const emojis = item.emojis;
        return emojis[Math.floor(Math.random() * emojis.length)];
      }
    }
  }
  
  // If no specific match found, return a random default emoji
  const defaultEmojis = EMOJI_MAP.default;
  return defaultEmojis[Math.floor(Math.random() * defaultEmojis.length)];
};

// Calculate hours needed to work for an item
const calculateWorkHours = (price, income, hoursPerWeek) => {
  if (!income || !hoursPerWeek) return 0;
  const hourlyRate = (income / 4) / hoursPerWeek; // Monthly income / 4 weeks / hours per week
  return (price / hourlyRate).toFixed(1);
};

// Calculate potential savings growth
const calculateSavings = (price, years = 5, rate = 0.07) => {
  return (price * Math.pow(1 + rate, years)).toFixed(2);
};

const Calculator = () => {
  const navigate = useNavigate();
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [workHours, setWorkHours] = useState(0);
  const [savings, setSavings] = useState(0);
  const [userIncome, setUserIncome] = useState(0);
  const [userWorkHours, setUserWorkHours] = useState(0);
  const [emoji, setEmoji] = useState('🛍️');

  // Load user data from localStorage
  useEffect(() => {
    const savedIncome = parseFloat(localStorage.getItem('userIncome') || '0');
    const savedWorkHours = parseFloat(localStorage.getItem('workHours') || '0');
    setUserIncome(savedIncome);
    setUserWorkHours(savedWorkHours);
  }, []);

  // Update emoji when item name changes
  useEffect(() => {
    setEmoji(getEmojiForItem(itemName));
  }, [itemName]);

  // Calculate work hours and savings when price changes
  useEffect(() => {
    if (price && userIncome && userWorkHours) {
      const priceNum = parseFloat(price);
      if (!isNaN(priceNum)) {
        setWorkHours(calculateWorkHours(priceNum, userIncome, userWorkHours));
        setSavings(calculateSavings(priceNum));
      }
    }
  }, [price, userIncome, userWorkHours]);

  const getLocalISODate = () => {
    const now = new Date();
    const tzOffset = now.getTimezoneOffset() * 60000; // Offset in milliseconds
    const localISOTime = (new Date(now - tzOffset)).toISOString().slice(0, -1);
    return localISOTime;
  };

  const handleSkip = () => {
    // Save to skipped items in localStorage
    const skippedItems = JSON.parse(localStorage.getItem('skippedItems') || '[]');
    const newItem = {
      id: Date.now(),
      name: itemName,
      price: parseFloat(price),
      date: getLocalISODate(),
      emoji,
      workHoursMessage: `This would cost you ${workHours} hours of work`,
      savingsMessage: `If invested, this could grow to $${savings} in 5 years (7% return)`,
      workHours,
      potentialSavings: parseFloat(savings)
    };
    localStorage.setItem('skippedItems', JSON.stringify([...skippedItems, newItem]));
    
    // Redirect to home or show success message
    navigate('/');
  };

  const handlePurchase = () => {
    // Save to purchased items in localStorage
    const purchasedItems = JSON.parse(localStorage.getItem('purchasedItems') || '[]');
    const newItem = {
      id: Date.now(),
      name: itemName,
      price: parseFloat(price),
      date: getLocalISODate(),
      emoji,
      workHoursMessage: `This cost you ${workHours} hours of work`,
      savingsMessage: `You could have grown this to $${savings} in 5 years (7% return)`,
      workHours,
      potentialSavings: parseFloat(savings)
    };
    localStorage.setItem('purchasedItems', JSON.stringify([...purchasedItems, newItem]));
    
    // Redirect to home or show success message
    navigate('/');
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)} aria-label="Go back">
          <FiArrowLeft />
        </BackButton>
        <Title>Purchase Calculator</Title>
      </Header>

      <CalculatorCard>
        <EmojiInput>
          <Emoji>{emoji}</Emoji>
          <Input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="What are you thinking of buying?"
            required
          />
        </EmojiInput>

        <InputGroup>
          <Label>
            <FiDollarSign />
            Price
          </Label>
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
            min="0"
            step="0.01"
            required
          />
        </InputGroup>

        {price && (
          <>
            <InfoCard>
              <InfoIcon><FiClock /></InfoIcon>
              <InfoText>
                This would cost you <strong>{workHours} hours</strong> of work
                {userIncome === 0 || userWorkHours === 0 ? (
                  <Warning>Set up your income in Settings</Warning>
                ) : null}
              </InfoText>
            </InfoCard>

            <InfoCard>
              <InfoIcon><FiTrendingUp /></InfoIcon>
              <InfoText>
                If invested, this could grow to <strong>${savings}</strong> in 5 years (7% return)
              </InfoText>
            </InfoCard>

            <ButtonGroup>
              <SkipButton onClick={handleSkip}>
                <FiX /> Skip It
              </SkipButton>
              <BuyButton onClick={handlePurchase}>
                <FiCheck /> Buy It
              </BuyButton>
            </ButtonGroup>
          </>
        )}
      </CalculatorCard>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  padding: 1rem;
  max-width: 600px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.background};
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  position: relative;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  margin-right: 1rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const CalculatorCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const EmojiInput = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Emoji = styled.span`
  font-size: 2rem;
  margin-right: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.background};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
  }
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textLight};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InfoCard = styled.div`
  display: flex;
  align-items: flex-start;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 1rem;
  margin-bottom: 1rem;
`;

const InfoIcon = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  margin-right: 0.75rem;
  font-size: 1.25rem;
`;

const InfoText = styled.div`
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;
`;

const Warning = styled.span`
  display: block;
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const BaseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SkipButton = styled(BaseButton)`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  
  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.border};
  }
`;

const BuyButton = styled(BaseButton)`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  
  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`;

export default Calculator;
