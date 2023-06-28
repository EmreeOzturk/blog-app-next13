import React from 'react';
import styles from './Button.module.css';
type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  className: string;
};

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default Button;
