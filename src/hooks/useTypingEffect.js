import { useState, useEffect } from 'react';

const useTypingEffect = (text, speed = 100, startDelay = 0) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setDisplayText('');
    setCurrentIndex(0);
    setIsTyping(false);
    const startTimeout = setTimeout(() => {
      setIsTyping(true);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [text, startDelay]);

  useEffect(() => {
    if (isTyping && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, isTyping]);

  const reset = () => {
    setDisplayText('');
    setCurrentIndex(0);
    setIsTyping(false);
    setTimeout(() => setIsTyping(true), startDelay);
  };

  return [displayText, reset, isTyping];
};

export default useTypingEffect;