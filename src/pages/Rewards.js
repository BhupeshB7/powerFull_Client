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

import React, { useEffect, useState } from "react";
import ConfettiAnimation from "../components/ConfettiAnimation";
import { Button, Container } from "react-bootstrap";
import axios from "axios";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
const Rewards = () => {
  const [code, setCode] = useState("");
  const [isValid, setIsValid] = useState(null);
  const [randomNumber, setRandomNumber] = useState(null);
  const [error, setError] = useState("");
  const [showCelebration, setShowCelebration] = useState(false);
  const userId = localStorage.getItem("GamerUserId");
  const [giftRewards, setGiftRewards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://mlm-production.up.railway.app/api/gift/gift-rewards/${userId}?page=${currentPage}`,
        {
          // params: { userId, page: currentPage, pageSize: 10 },
        }
      );
      setTotalPages(response.data.totalPages);
      setGiftRewards(response.data.data);
    } catch (error) {
      console.error("Error fetching gift rewards:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData(); // Initial data fetch

    // Set up an interval to fetch data every 40 seconds
    const intervalId = setInterval(fetchData, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [userId, currentPage]);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const handleCheckCode = async () => {
    try {
      // const response = await fetch("http://localhost:5000/api/gift/checkCode", {
      const response = await fetch(
        "https://mlm-production.up.railway.app/api/gift/checkCode",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code, userId }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      const data = await response.json();
      setIsValid(true);
      setRandomNumber(data.randomNumber);
      setError("");
      setShowCelebration(true);
      // Set showCelebration to true when code is valid
      // Reload the page after 10 seconds
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } catch (error) {
      setIsValid(false);
      setRandomNumber(null);
      setError(error.message);
      setShowCelebration(false); // Set showCelebration to false when code is not valid
    }
  };

  const handleCelebrationComplete = () => {
    setShowCelebration(false);
  };
  const handleClose=()=>{
    setModalIsOpen(false);
  }
  return (
    <div className="checkCode">
      <Container className="checkCode-container">
        {showCelebration && (
          <ConfettiAnimation
            onCelebrationComplete={handleCelebrationComplete}
          />
        )}
        <div>
          <h4
            className="text-center text-light fw-bold"
            style={{ fontStyle: "italic" }}
          >
            Claim Your Reward
          </h4>
          {/* {error && (
          <p className="text-danger" style={{ color: "red" }}>
            {error}
          </p>
        )} */}
          <label>
            Code:
            <br />
            <input
              type="text"
              value={code}
              placeholder="Enter Your Code"
              onChange={(e) => setCode(e.target.value)}
            />
          </label>
          <br />
          <div
            className="d-flex justify-content-center align-items-center pb-2"
            style={{ gap: "30px" }}
          >
            <button className="btn btn-danger" onClick={handleCheckCode}>
              Claim
            </button>
            <button className="btn btn-success" onClick={openModal}>
              History
            </button>
          </div>
          {isValid !== null && (
            <div className="reward-result">
              {isValid ? (
                <div>
                  {randomNumber !== null && (
                    <div className="reward-image-container">
                      <img
                        src="https://img.freepik.com/free-vector/gradient-raksha-bandhan-background_23-2149508427.jpg?size=626&ext=jpg&ga=GA1.1.260354095.1700988836&semt=ais"
                        alt="Gift Reward"
                        className="reward-image"
                        style={{ borderRadius: "7px", zIndex: "1000" }}
                      />
                      <p className="reward-amount text-light fw-bold">
                        Rewards {randomNumber} Rs
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {error && (
                    <p
                      className="text-danger"
                      style={{
                        background: "rgb(255, 179, 179)",
                        color: "brown",
                        padding: "5px",
                        borderRadius: "7px",
                      }}
                    >
                      {error}
                    </p>
                  )}
                  {/* <p
                  style={{
                    background: "rgb(255, 179, 179)",
                    color: "brown",
                    padding: "5px",
                    borderRadius: "7px",
                  }}
                >
                  Code is not valid. Please check the code. Or code is expired
                  😔{" "}
                </p> */}
                </div>
              )}
            </div>
          )}
        </div>
        <div>
          <Modal
            className="ModalOverlay"
            overlayClassName="Overlay"
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
           
            contentLabel="All Reward Details"
          >
            <div className="ModalContent">
            <div className="CloseButton" onClick={handleClose}>
              <FaTimes />
            </div>
            <div className="table-responsive" style={{ marginTop: "10px" }}>
              <div
                className="d-flex align-tems-center"
                style={{ flexDirection: "row-reverse" }}
              >
                
              </div>
              <table
                className="table"
                style={{
                  backgroundImage:
                    "linear-gradient(60deg, #29323c 0%, #1d1f20 100%)",
                }}
              >
                <thead
                  className="text-light text-center"
                  style={{ height: "55px" }}
                >
                  <tr>
                    {/* <th>#</th> */}
                    <th>#</th>
                    <th>Code</th>
                    <th>Rewards</th>
                  </tr>
                </thead>
                <tbody
                  style={{ color: "#FFD700" }}
                  className="table-hover text-center"
                >
                  {giftRewards.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.code}</td>
                      {/* <td>{item.color}</td> */}
                      <td>{item.reward}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination */}
              <div
                className="pagination d-flex justify-content-center align-items-center pb-2"
                style={{ marginTop: "-15px", background: "#0234" }}
              >
                {/* Previous Button */}
                <Button
                  variant="dark"
                  className="m-1"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                {/* Display page number and items per page information */}
                <div
                  className="text-light p-2"
                  style={{ fontSize: "21px", fontWeight: "500" }}
                >
                  {currentPage} <b className="text-warning">/</b> {totalPages}
                </div>
                {/* Next Button */}
                <Button
                  variant="dark"
                  className="m-1"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
            </div>
          </Modal>
        </div>
        {/* Display CelebrationComponent when showCelebration is true */}
      </Container>
    </div>
  );
};

export default Rewards;
