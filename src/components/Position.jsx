import React, { useState, useEffect } from 'react';
import '../CyberText.css'


const Position = ({ textArray, interval = 2000 }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState(textArray[0]);
  const [isScrambling, setIsScrambling] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsScrambling(true);
      setTimeout(() => {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % textArray.length);
        setIsScrambling(false);
      }, 500); // Delay before switching text, matching the scramble effect duration
    }, interval);

    return () => clearInterval(intervalId);
  }, [textArray, interval]);

  useEffect(() => {
    if (isScrambling) {
      const scrambleInterval = setInterval(() => {
        setDisplayText((prevText) =>
          prevText
            .split("")
            .map((char) => (Math.random() > 0.5 ? getRandomSymbol() : char))
            .join("")
        );
      }, 50); // Scramble speed

      return () => clearInterval(scrambleInterval);
    } else {
      setDisplayText(textArray[currentTextIndex]);
    }
  }, [isScrambling, currentTextIndex, textArray]);

  const getRandomSymbol = () => {
    const symbols = "#@%&!abcdefghijklmnopqrstuvwxyz";
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  return <span className={`cyber-text ${isScrambling ? 'scramble' : 'fade-in'}`}>{displayText}</span>;
};

export default Position;
