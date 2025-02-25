import React from 'react';

interface GradientButtonProps {
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const GradientButton: React.FC<GradientButtonProps> = ({ text, onClick, className = '' }) => {
  return (
    <button 
      className={`relative w-[200px] h-[50px] sm:h-[60px] rounded-[21px] text-base sm:text-lg font-medium text-white overflow-hidden group ${className}`}
      onClick={onClick}
    >
      <span className="relative z-10">{text}</span>
      <span 
        className="absolute inset-0 rounded-[21px] opacity-100 animate-gradient-x" 
        style={{
          background: 'linear-gradient(90deg, #F1967D, #C93F80, #955DDC, #7071E9, #1CB0CE, #F1967D)',
          backgroundSize: '300% 100%',
          padding: '2px',
          content: "''",
          zIndex: 0,
        }}
      ></span>
      <span className="absolute inset-[2px] bg-[#282B2C] rounded-[21px] z-[1]"></span>
      <span 
        className="absolute inset-0 rounded-[21px] opacity-75 blur-[2px] animate-gradient-x" 
        style={{
          background: 'linear-gradient(90deg, #F1967D, #C93F80, #955DDC, #7071E9, #1CB0CE, #F1967D)',
          backgroundSize: '300% 100%',
          content: "''",
          zIndex: -1,
        }}
      ></span>
    </button>
  );
};

export default GradientButton;