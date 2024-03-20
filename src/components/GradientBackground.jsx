import React from 'react';

const GradientBackground = () => {
  const containerStyle = {
    position: 'absolute',
    inset: 0,
    zIndex: -10,
    height: '100%',
    width: '100%',
    backgroundImage: `
      linear-gradient(to right, #8080800a 1px, transparent 1px),
      linear-gradient(to bottom, #8080800a 1px, transparent 1px)
    `,
    backgroundSize: '14px 24px'
  };

  return (
    <div style={containerStyle}></div>
  );
};

export default GradientBackground;
