// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import axios from 'axios';
// import Draggable from 'react-draggable';
// import CelebrationComponent from '../components/CelebrationComponent';

// const Rewards = () => {
//   const [remainingTime, setRemainingTime] = useState(0);
//   const [claimed, setClaimed] = useState(false);
//   const [showCelebration, setShowCelebration] = useState(false);
//   const [dragging, setDragging] = useState(false);

//   const buttonRef = useRef(null);

//   const handleClaimReward = useCallback(async () => {
//     if (remainingTime > 0 && !claimed) {
//       await axios.post('http://localhost:5000/api/gift/checkCode');
//       setClaimed(true);
//       setShowCelebration(true);
//     }
//   }, [remainingTime, claimed]);

//   const handleCelebrationComplete = () => {
//     setShowCelebration(false);
//   };

//   const handleDragStop = useCallback((_, data) => {
//     if (data.x > 100) {
//       handleClaimReward();
//     }
//     setDragging(false);
//   }, [handleClaimReward]);

//   return (
//     <div>
//       <h2>User Dashboard</h2>
//       {remainingTime > 0 ? (
//         <div>
//           <div className="reward-container">
//               {showCelebration && <CelebrationComponent onCelebrationComplete={handleCelebrationComplete} />}
//             <Draggable
//               axis="x"
//               onDrag={() => setDragging(true)}
//               onStop={handleDragStop}
//               bounds={{ left: 0, right: 200 }}
//             >
//               <button
//                 ref={buttonRef}
//                 className={`reward-button ${claimed ? 'claimed' : ''} ${dragging ? 'dragging' : ''}`}
//                 onClick={handleClaimReward}
//                 disabled={claimed}
//               >
//                 {claimed ? 'Reward Claimed' : 'Claim Reward'}
//               </button>
//             </Draggable>
//           </div>
//         </div>
//       ) : (
//         <div>
//           <p>No active reward at the moment</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Rewards;

// CheckCodeForm.jsx
// import React, { useState } from 'react';

// const Rewards = () => {
//   const [code, setCode] = useState('');
//   const [isValid, setIsValid] = useState(null);
//   const [lastAmount, setLastAmount] = useState(null);
//   const [randomNumber, setRandomNumber] = useState(null);
//   const [error, setError] = useState('');

//   const handleCheckCode = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/gift/checkCode', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ code }),
//       });

//       if (!response.ok) {
//         const data = await response.json();
//         throw new Error(data.error);
//       }

//       const data = await response.json();
//       setIsValid(true);
//       setLastAmount(data.lastAmount);
//       setRandomNumber(data.randomNumber);
//       setError('');
//     } catch (error) {
//       setIsValid(false);
//       setLastAmount(null);
//       setRandomNumber(null);
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="checkCode-container">
//       <h2>Check Code</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <label>
//         Code:<br />
//         <input type="text" value={code} onChange={(e) => setCode(e.target.value)} />
//       </label>
//       <br />
//       <button onClick={handleCheckCode}>Check Code</button>
//       {isValid !== null && (
//         <div>
//           {isValid ? (
//             <div>
//               <p>Code is valid.</p>
//               {lastAmount !== null && <p>Last Amount: {lastAmount}</p>}
//               {randomNumber !== null && <p>Random Number: {randomNumber}</p>}
//             </div>
//           ) : (
//             <p>Code is not valid. Please check the code.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Rewards;

import React, { useState } from "react";
import ConfettiAnimation from "../components/ConfettiAnimation";
import { Container } from "react-bootstrap";

const Rewards = () => {
  const [code, setCode] = useState("");
  const [isValid, setIsValid] = useState(null);
  const [lastAmount, setLastAmount] = useState(null);
  const [randomNumber, setRandomNumber] = useState(null);
  const [error, setError] = useState("");
  const [showCelebration, setShowCelebration] = useState(false);

  const handleCheckCode = async () => {
    try {
      const response = await fetch("https://mlm-production.up.railway.app/api/gift/checkCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      const data = await response.json();
      setIsValid(true);
      setLastAmount(data.lastAmount);
      setRandomNumber(data.randomNumber);
      setError("");
      setShowCelebration(true); // Set showCelebration to true when code is valid
      // Reload the page after 10 seconds
      setTimeout(() => {
        window.location.reload();
      }, 10000);
    } catch (error) {
      setIsValid(false);
      setLastAmount(null);
      setRandomNumber(null);
      setError(error.message);
      setShowCelebration(false); // Set showCelebration to false when code is not valid
    }
  };

  const handleCelebrationComplete = () => {
    setShowCelebration(false);
  };

  return (
    <div className="checkCode">
      <Container className="checkCode-container">
        {showCelebration && (
          <ConfettiAnimation
            onCelebrationComplete={handleCelebrationComplete}
          />
        )}

        <h4
          className="text-center text-light fw-bold"
          style={{ fontStyle: "italic" }}
        >
          Claim Your Reward
        </h4>
        {error && (
          <p className="text-danger" style={{ color: "red" }}>
            {error}
          </p>
        )}
        <label>
          Code:
          <br />
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </label>
        <br />
        <div>
          <button onClick={handleCheckCode}>Claim</button>
        </div>
        {isValid !== null && (
          <div>
            {isValid ? (
              <div>
                {/* <p>Code is valid.</p> */}
                {/* {lastAmount !== null && <p>Last Amount: {lastAmount}</p>} */}
                {randomNumber !== null && (
                  <p className="text-light  fw-bold">Rewards {randomNumber} Rs</p>
                )}
              </div>
            ) : (
              <p  style={{background:'rgb(221, 157, 157)',color:'red', padding:'5px', borderRadius:'7px'}}>
                Code is not valid. Please check the code. Or code is expired 😔{" "}
              </p>
            )}
          </div>
        )}

        {/* Display CelebrationComponent when showCelebration is true */}
      </Container>
      
    </div>
  );
};

export default Rewards;
