// CelebrationComponent.js
import React from 'react';
import ConfettiAnimation from './ConfettiAnimation';

const CelebrationComponent = ({ onCelebrationComplete }) => {
  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <ConfettiAnimation onCelebrationComplete={onCelebrationComplete} />
      {/* Add your celebration message or other elements */}
      <h3 className='text-light text-center'>Congratulations! You received a reward!</h3>
    </div>
  );
};

export default CelebrationComponent;
