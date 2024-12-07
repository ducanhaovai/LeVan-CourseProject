import React from "react";
import styled, { keyframes } from "styled-components";

// Slide-in animation
const slideIn = keyframes`
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const ButtonContainer = styled.button`
  position: fixed;
  bottom: 32px;
  right: 32px;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 48px;
  z-index: 1000;
  cursor: pointer;
  display: flex;
  background: #3b3b98;
  border-radius: 50%;
  border: none;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  animation: ${slideIn} 0.5s ease-out;
  transition: transform 0.3s ease, opacity 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
    box-shadow: 0px 0px 8px 2px rgba(59, 59, 152, 0.8);
  }
`;

const BackToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ButtonContainer onClick={scrollToTop} aria-label="Scroll to top">
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ffffff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </ButtonContainer>
  );
};

export default BackToTopButton;
