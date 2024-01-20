// ConfettiAnimation.js
import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { useSpring, animated } from 'react-spring';
import { useGesture } from 'react-use-gesture';

const ConfettiAnimation = ({ onCelebrationComplete }) => {
  const [celebrating, setCelebrating] = useState(true);
  const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }));

  const bind = useGesture(({ down, delta }) => {
    if (down) {
      set({ xy: delta });
    } else {
      set({ xy: [0, 0] });
    }
  });

  useEffect(() => {
    const celebrationTimeout = setTimeout(() => {
      setCelebrating(false);
      onCelebrationComplete();
    //   window.location.reload();
    }, 5000);

    return () => clearTimeout(celebrationTimeout);
  }, [onCelebrationComplete]);

  return (
    <animated.div
      {...bind()}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 100,
        transform: xy.interpolate((x, y) => `translate3d(${x}px, ${y}px, 0)`),
      }}
    >
      {celebrating && <Confetti width={window.innerWidth} height={window.innerHeight} />}
    </animated.div>
  );
};

export default ConfettiAnimation;
