// ConfettiEffect.js - handles multiple simultaneous effects
import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

const ConfettiEffect = ({ trigger }) => {
  const [activeEffects, setActiveEffects] = useState([]);

  useEffect(() => {
    if (trigger > 0) {
      const id = Date.now();
      setActiveEffects(prev => [...prev, id]);
      
      // Remove after 3 seconds
      setTimeout(() => {
        setActiveEffects(prev => prev.filter(effectId => effectId !== id));
      }, 3000);
    }
  }, [trigger]);

  return (
    <>
      {activeEffects.map(id => (
        <Confetti
          key={id}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 50,
            pointerEvents: "none"
          }}
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={800} // Reduced since multiple can run
          gravity={0.4}
          tweenDuration={2000}
        />
      ))}
    </>
  );
};

export default ConfettiEffect;