// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// const predefinedColors = ["Pink", "Red", "Green"];

// const ColorPredictionGame = () => {
//   const getRandomColor = () => {
//     const randomIndex = Math.floor(Math.random() * predefinedColors.length);
//     return predefinedColors[randomIndex];
//   };

//   const [targetColor, setTargetColor] = useState("");
//   const [userChoice, setUserChoice] = useState("");
//   const [result, setResult] = useState("");
//   const [round, setRound] = useState(0);
//   const [hasPlayed, setHasPlayed] = useState(false);
//   const [balance, setBalance] = useState(100);
//   const [entryFee, setEntryFee] = useState(0);
//   const [totalWon, setTotalWon] = useState(0);

//   useEffect(() => {
//     if (round > 0) {
//       setTargetColor(getRandomColor());
//       setUserChoice("");
//       setResult("");
//       setHasPlayed(true);
//     }
//   }, [round]);

//   const handleColorSelect = (color) => {
//     setUserChoice(color);
//   };

//   useEffect(() => {
//     if (userChoice === targetColor) {
//       const winnings = calculateWinnings();
//       setResult(`You won ${winnings} Rs!`);
//       setTotalWon(totalWon + winnings);
//     } else {
//       setResult("You lost!");
//     }
//   }, [userChoice, targetColor]);

//   const calculateWinnings = () => {
//     switch (entryFee) {
//       case 10:
//         return 15;
//       case 20:
//         return 28;
//       case 30:
//         return 38;
//       case 40:
//         return 50;
//       default:
//         return 0;
//     }
//   };

//   const startNewGame = () => {
//     const selectedFee = prompt("Enter the entry fee (10, 20, 30, or 40 Rs):");
//     if (selectedFee !== null) {
//       const fee = parseInt(selectedFee, 10);
//       if (![10, 20, 30, 40].includes(fee)) {
//         alert("Invalid entry fee. Please select a valid fee.");
//         return;
//       }

//       if (balance >= fee) {
//         setRound(1);
//         setTargetColor(getRandomColor());
//         setUserChoice("");
//         setResult("");
//         setHasPlayed(false);
//         setEntryFee(fee);
//         setBalance(balance - fee);
//       } else {
//         alert("Insufficient balance to play!");
//       }
//     }
//   };

//   const startNewRound = () => {
//     setRound(round + 1);
//     setHasPlayed(false);
//     setTargetColor(getRandomColor());
//     setUserChoice("");
//     setResult("");
//   };

//   const exitGame = () => {
//     if (window.confirm("Are you sure you want to exit the game?")) {
//       window.location.reload();
//     }
//   };

//   return (
//     <div
//       className="game-container h-100"
//       style={{ background: "#000428", minHeight: "100vh" }}
//     >
//       <h1 className="text-center text-info pt-5">Color Prediction</h1>
//       <p className="text-secondary">Balance: {balance} Rs</p>
//       <p className="text-secondary">Total Won: {totalWon} Rs</p>
//       {round === 0 ? (
//         <div>
//           <button onClick={startNewGame}>Start Game</button>
//         </div>
//       ) : (
//         <div>
//           <p>Select the correct color:</p>
//           <div className="color-options">
//             {predefinedColors.map((color) => (
//               <button
//                 key={color}
//                 style={{ backgroundColor: color.toLowerCase() }}
//                 onClick={() => handleColorSelect(color)}
//                 disabled={!!userChoice}
//               >
//                 {color}
//               </button>
//             ))}
//           </div>
//           {userChoice && hasPlayed && (
//             <div>
//               <p>{result}</p>
//               <button onClick={startNewRound} disabled={round >= 5}>
//                 Start New Round
//               </button>
//             </div>
//           )}
//           <button onClick={exitGame}>Exit Game</button>
//         </div>
//       )}

//     </div>
//   );
// };

// export default ColorPredictionGame;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Confetti from "react-confetti";
// import axios from "axios";

// const predefinedColors = ["blueviolet", "Red"];

// const ColorPredictionGame = () => {
//   const getRandomColor = () => {
//     const randomIndex = Math.floor(Math.random() * predefinedColors.length);
//     return predefinedColors[randomIndex];
//   };

//   const [targetColor, setTargetColor] = useState("");
//   const [userChoice, setUserChoice] = useState("");
//   const [result, setResult] = useState("");
//   const [round, setRound] = useState(0);
//   const [hasPlayed, setHasPlayed] = useState(false);
//   const [balance, setBalance] = useState(100);
//   const [entryFee, setEntryFee] = useState(0);
//   const [totalWon, setTotalWon] = useState(0);
//   const [hasWon, setHasWon] = useState(false);

//   useEffect(() => {
//     if (round > 0) {
//       setTargetColor(getRandomColor());
//       setUserChoice("");
//       setResult("");
//       setHasPlayed(true);
//     }
//   }, [round]);

//   useEffect(() => {
//     if (userChoice === targetColor) {
//       const winnings = calculateWinnings();
//       setResult(`You won ${winnings} Rs!`);
//       setTotalWon(totalWon + winnings);
//       console.log(result)
//        // Start a timer to reset hasWon to false after 20 seconds
//        const timer = setTimeout(() => {
//         setHasWon(false);
//       }, 3000); // 20 seconds in milliseconds

//       // Clean up the timer when the component unmounts or when a new game starts
//       return () => clearTimeout(timer);
//     } else {
//       setResult("You lost!");
//       setHasWon(false);
//     }
//   }, [userChoice, targetColor]);

//   const calculateWinnings = () => {
//     switch (entryFee) {
//       case 10:
//         return 15;
//       case 20:
//         return 28;
//       case 30:
//         return 38;
//       case 40:
//         return 50;
//       default:
//         return 0;
//     }
//   };

//   const startNewGame = () => {
//     setHasWon(false);
//     const selectedFee = prompt("Enter the entry fee (10, 20, 30, or 40 Rs):");
//     if (selectedFee !== null) {
//       const fee = parseInt(selectedFee, 10);
//       if (![10, 20, 30, 40].includes(fee)) {
//         alert("Invalid entry fee. Please select a valid fee.");
//         return;
//       }

//       if (balance >= fee) {
//         setRound(1);
//         setTargetColor(getRandomColor());
//         setUserChoice("");
//         setResult("");
//         setHasPlayed(false);
//         setEntryFee(fee);
//         setBalance(balance - fee);
//       } else {
//         alert("Insufficient balance to play!");
//       }
//     }
//   };
// const userId = 'PI0111222'
//   const exitGame = () => {
//     if (window.confirm("Are you sure you want to exit the game?")) {
//       window.location.reload();
//     }
//   };

//   const handleColorSelect =async (color) => {
//     setUserChoice(color);
//     const message = `You chose ${color}`;
//     alert(message);
//     const gameDetails = {
//       userId: userId,
//       entryFee: entryFee,
//       targetColor: targetColor,
//       chosenColor: color, // Include the chosen color in the game details
//       result: result, //
//       winningAmount: totalWon,
//     };
// console.log(totalWon)
//     try {
//       const response = await axios.post("https://mlm-eo5g.onrender.com/api/game/saveGame", gameDetails);
//       if (response.status === 201) {
//         console.log(gameDetails);
//         console.log("Game details saved successfully");
//       } else {
//         console.error("Error saving game details");
//       }
//     } catch (error) {
//       console.error("Error saving game details:", error);
//     }
//   };

//   return (
//     <div
//       className="game-container h-100"
//       style={{ background: "#000428", minHeight: "100vh" }}
//     >
//        {hasWon && (
//         <Confetti
//           width={window.innerWidth}
//           height={window.innerHeight}
//           numberOfPieces={200}
//         />
//       )}

//       <h1 className="text-center text-info pt-5">Color Prediction</h1>

//       {round === 0 ? (
//         <div>
//           <button onClick={startNewGame} className="btn btn-outline-info ms-3">
//             Start Game
//           </button>
//         </div>
//       ) : (
//         <div>
//           <p className="p-2 text-secondary">Select the  color:</p>
//           <div className="color-options">
//             {predefinedColors.map((color) => (
//               <button
//                 key={color}
//                 style={{ backgroundColor: color.toLowerCase() }}
//                 onClick={() => handleColorSelect(color)}
//                 disabled={!!userChoice}
//                 className="game_button"
//               >
//                 {color}
//               </button>
//             ))}
//           </div>
//           {userChoice && hasPlayed && (
//             <div>
//               <h6 className="text-white text-center">{result}</h6>
//                </div>
//           )}
//           <button onClick={exitGame} className="btn btn-outline-danger ms-5 mt-2">Exit Game</button>
//         </div>
//       )}

//       <div className="container">
//         <div className="row game_account">
//           <div className="col-5  col-sm-9 col md-6 col-lg-5 balanceCard">
//             <h6 className="text-info">Balance</h6>
//             <h5 style={{color:'cyan'}}> {balance} Rs</h5>
//           </div>
//           <div className="col-5  col-sm-9 col md-6 col-lg-5 balanceCard">
//           <h6 className="text-info">Total win</h6>
//             <h5 style={{color:'cyan'}}> {totalWon} Rs</h5>
//           </div>
//         </div>
//       </div>
//       <div className="bottom_section " style={{ marginTop: "90px" }}>
//         <div
//           className="row  footer_row_content"
//           style={{
//             height: "90px",
//             color: "cyan",
//           }}
//         >
//           <div className="col-12">
//             <div className="footer_container">
//               <div className="footer_content">
//                 <Link
//                   to="/dashboard"
//                   className="footer_icon"
//                   style={{ color: "cyan" }}
//                 >
//                   <img
//                     src="https://cdn-icons-png.flaticon.com/128/9187/9187555.png"
//                     alt="account Activation"
//                     height="35px"
//                     width="35px"
//                   />
//                   <h6 className=" mt-1">Home</h6>
//                 </Link>
//                 <div className="footer_icon">
//                   <img
//                     src="https://cdn-icons-png.flaticon.com/128/10701/10701014.png"
//                     alt="wallet"
//                     height="40px"
//                     width="40px"
//                     className="dropdown-toggle"
//                     data-bs-toggle="dropdown"
//                     aria-expanded="false"
//                   />
//                   <h6
//                     className="mt-1 dropdown-toggle"
//                     data-bs-toggle="dropdown"
//                     aria-expanded="false"
//                   >
//                     Menu
//                   </h6>
//                   <ul className="dropdown-menu">
//                     <li>
//                       <h6
//                         className="dropdown-item"
//                         data-bs-toggle="modal"
//                         data-bs-target="#staticBackdrop"
//                       >
//                         Deposit
//                       </h6>
//                     </li>
//                     <li>
//                       <h6 className="dropdown-item"
//                         data-bs-toggle="modal"
//                         data-bs-target="#staticBackdrop1">
//                         Game History
//                       </h6>
//                     </li>
//                     <li>
//                       <h6   className="dropdown-item"
//                         data-bs-toggle="modal"
//                         data-bs-target="#staticBackdrop2" >
//                         Withdrawal
//                       </h6>
//                     </li>
//                     <li>
//                       <h6   className="dropdown-item"
//                         data-bs-toggle="modal"
//                         data-bs-target="#staticBackdrop3">
//                         Withdrawal History
//                       </h6>
//                     </li>
//                   </ul>
//                 </div>
//                 <Link
//                   to="/game"
//                   className="footer_icon"
//                   style={{ color: "cyan" }}
//                 >
//                   <img
//                     src="https://cdn-icons-png.flaticon.com/128/8002/8002123.png"
//                     alt="fund"
//                     height="35px"
//                     width="35px"
//                   />
//                   <h6 className="mt-1">Game</h6>
//                 </Link>
//                 <Link to="/setting" className="footer_icon">
//                   <img
//                     src="https://cdn-icons-png.flaticon.com/128/3953/3953226.png"
//                     alt="account Activation"
//                     height="35px"
//                     width="35px"
//                   />
//                   <h6 className="mt-1" style={{ color: "cyan" }}>
//                     Setting
//                   </h6>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/*Deposit Start  */}
//       {/* Modal */}
//       <div
//         className="modal fade"
//         id="staticBackdrop"
//         data-bs-backdrop="static"
//         data-bs-keyboard="false"
//         tabIndex={-1}
//         aria-labelledby="staticBackdropLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h1 className="modal-title fs-5" id="staticBackdropLabel">
//                 Deposit
//               </h1>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               />
//             </div>
//             <div className="modal-body">
//               <h6>UPI: xxxxxxxx@paytm</h6>
//               <h6>Name</h6>
//               <h6>Amount</h6>
//               <h6>UTR</h6>
//             </div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 data-bs-dismiss="modal"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Deposit End */}
//       {/*Game History Start  */}
//       {/* Modal */}
//       <div
//         className="modal fade"
//         id="staticBackdrop1"
//         data-bs-backdrop="static"
//         data-bs-keyboard="false"
//         tabIndex={-1}
//         aria-labelledby="staticBackdropLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h1 className="modal-title fs-5" id="staticBackdropLabel">
//                 Game History
//               </h1>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               />
//             </div>
//             <div className="modal-body">
//                  <h6>Name</h6>
//               <h6>Amount</h6>
//               <h6>UTR</h6>
//             </div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 data-bs-dismiss="modal"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Game History End */}
//       {/*Withdrawal Start  */}
//       {/* Modal */}
//       <div
//         className="modal fade"
//         id="staticBackdrop2"
//         data-bs-backdrop="static"
//         data-bs-keyboard="false"
//         tabIndex={-1}
//         aria-labelledby="staticBackdropLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h1 className="modal-title fs-5" id="staticBackdropLabel">
//                 Withdrawal
//               </h1>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               />
//             </div>
//             <div className="modal-body">
//               <h6>UPI: xxxxxxxx@paytm</h6>
//               <h6>Name</h6>
//               <h6>Amount</h6>
//             </div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 data-bs-dismiss="modal"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Withdrawal End */}
//       {/*Wthdrawal history Start  */}
//       {/* Modal */}
//       <div
//         className="modal fade"
//         id="staticBackdrop3"
//         data-bs-backdrop="static"
//         data-bs-keyboard="false"
//         tabIndex={-1}
//         aria-labelledby="staticBackdropLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h1 className="modal-title fs-5" id="staticBackdropLabel">
//                 Withdrawal Hostory
//               </h1>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               />
//             </div>
//             <div className="modal-body">
//                 <h6>Name</h6>
//               <h6>Amount</h6>
//               <h6>UTR</h6>
//             </div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 data-bs-dismiss="modal"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Deposit End */}
//     </div>
//   );
// };

// export default ColorPredictionGame;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";
import axios from "axios";

const predefinedColors = ["Blueviolet", "Red"];

const ColorPredictionGame = () => {
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * predefinedColors.length);
    return predefinedColors[randomIndex];
  };

  const [targetColor, setTargetColor] = useState("");
  const [userChoice, setUserChoice] = useState("");
  const [result, setResult] = useState("");
  const [hasPlayed, setHasPlayed] = useState(false);
  const [entryFee, setEntryFee] = useState('');
  const [hasWon, setHasWon] = useState(false);
  // const [userId, setUserId] = useState("PI17218169");
  const [gameHistory, setGameHistory] = useState([]);
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);
  const [depositHistory, setDepositHistory] = useState([]);
  const [profile, setProfile] = useState({});
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    amount: "",
  });
  const [formData1, setFormData1] = useState({
    userId: "",
    name: "",
    amount: "",
    UPI: "",
  });
const userId = 'PI17218169';
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setFormData1({
      ...formData1,
      [name]: value,
    });
  };
  const getGamerProfile = async () => {
    try {
      const response = await axios.get(
        `https://mlm-eo5g.onrender.com/api/gameProfile/${userId}`
      );
      const result = response.data;
      setProfile(result);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getGamerProfile();
  }, [userId]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://mlm-eo5g.onrender.com/api/depositSubmit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, type: "Deposit" }), // Set type to 'Deposit'
      });

      if (response.ok) {
        alert("Deposit request submitted successfully");
      } else {
        alert("Error submitting deposit request");
      }
    } catch (error) {
      alert("Error submitting deposit request", error);
      console.error(error);
    }
  };
  const handleSubmitWithdrawal = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://mlm-eo5g.onrender.com/api/withdrawalSubmit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData1 }), // Set type to 'Deposit'
        }
      );

      if (response.ok) {
        alert("Withdrawal request submitted successfully");
      } else {
        const responseData = await response.json();
        if (responseData.message === "Insufficient Balance") {
          alert("Insufficient Balance. Please check your wallet.");
        } else {
          alert("Error submitting withdrawal request");
        }
      }
    } catch (error) {
      alert("Error submitting deposit request", error);
      console.error(error);
    }
  };
  const fetchGameHistory = async () => {
    try {
      const response = await axios.get(
        `https://mlm-eo5g.onrender.com/api/game/history/${userId}`
      );
      setGameHistory(response.data);
    } catch (error) {
      console.error(`Error fetching game history: ${error}`);
    }
  };

  useEffect(() => {
    fetchGameHistory();
  }, [userId]);
  const fetchWithdrawalHistory = async () => {
    try {
      const response = await axios.get(
        `https://mlm-eo5g.onrender.com/api/history/${userId}`
      );
      setWithdrawalHistory(response.data);
    } catch (error) {
      console.error(`Error fetching game history: ${error}`);
    }
  };

  useEffect(() => {
    fetchWithdrawalHistory();
  }, [userId]);
  const fetchDepositHistory = async () => {
    try {
      const response = await axios.get(
        `https://mlm-eo5g.onrender.com/api/deposit/history/${userId}`
      );
      setDepositHistory(response.data);
    } catch (error) {
      console.error(`Error fetching game history: ${error}`);
    }
  };

  useEffect(() => {
    fetchDepositHistory();
  }, [userId]);

  const calculateWinnings = () => {
    switch (entryFee) {
      case 2:
        return 5;
      case 10:
        return 15;
      case 20:
        return 28;
      case 30:
        return 38;
      case 40:
        return 50;
      default:
        return 0;
    }
  };


  const exitGame = () => {
    if (window.confirm("Are you sure you want to exit the game?")) {
      window.location.reload();
    }
  };

//   const handleColorSelect = async (color) => {
//     setUserChoice(color);
//     const message = `You chose ${color}`;
//     alert(message);
//     if (!targetColor) {
//       setTargetColor(getRandomColor());
//     }
   
//     const selectedFee = prompt("Enter the Bet Amount  (10, 20, 30, or 40 Rs):");
//     if (selectedFee !== null) {
//       const fee = parseInt(selectedFee, 10);
//       if (![2,10, 20, 30, 40].includes(fee)) {
//         alert("Invalid entry fee. Please select a valid fee.");
//         return;
//       }

//       setEntryFee(fee);
//       if (profile.balance >= fee) {
//         console.log(profile.balance);
//         console.log(fee);
//         try {
//           const response = await axios.post(
//             `https://mlm-eo5g.onrender.com/api/gameProfile/startGame`,
//             {
//               userId: userId,
//               entryFee: fee,
//             }
//           );

//           // Assuming the response contains updated balance data
//           const updatedBalance = response.data.balance;
//           setProfile({ ...profile, balance: updatedBalance });
//         } catch (error) {
//           console.error(error);
//         }

//       } else {
//         alert("Insufficient balance to play!");
//       }
//     }
//     let winnings = 0;
//     if (color === targetColor) {
//       winnings = calculateWinnings();
//       setResult('Success');
//       console.log(profile.balance);
//       try {
//         const response = await axios.post(
//           `https://mlm-eo5g.onrender.com/api/gameProfile/winningGame`,
//           {
//             userId: userId,
//             winnings: winnings,
//           }
//         );
//      console.log('Winning Amount')
//      console.log(winnings)
//         // Assuming the response contains updated balance data
//         const updatedTotalWin = response.data.totalwin;
//         console.log(updatedTotalWin);
//         setProfile({ ...profile, totalwin: updatedTotalWin });
//       } catch (error) {
//         console.error(error);
//       }
//     } else {
//       setResult('Loss');
//     }

//     const gameDetails = {
//       userId: userId,
//       entryFee: entryFee,
//       targetColor: targetColor,
//       chosenColor: color, // Include the chosen color in the game details
//       result: result,
//       winningAmount: winnings,
//     };
// console.log('Save Game')
// console.log(winnings)
// console.log(targetColor)
//     try {
//       const response = await axios.post(
//         "https://mlm-eo5g.onrender.com/api/game/saveGame",
//         gameDetails
//       );
//       if (response.status === 201) {
//         console.log(gameDetails);
//         console.log("Game details saved successfully");
//       } else {
//         console.error("Error saving game details");
//       }
//     } catch (error) {
//       console.error("Error saving game details:", error);
//     }
//   };

// const startGame = async ()=>{
  
//   const selectedFee = prompt("Enter the Bet Amount (10, 20, 30, or 40 Rs):");
//   if (selectedFee !== null) {
//     const fee = parseInt(selectedFee, 10);
//     if (![10, 20, 30, 40].includes(fee)) {
//       alert("Invalid entry fee. Please select a valid fee.");
//       return;
//     }

//     if (profile.balance >= fee) {
//       try {
//         const response = await axios.post(
//           "https://mlm-eo5g.onrender.com/api/gameProfile/startGame",
//           {
//             userId: userId,
//             entryFee: fee,
//           }
//         );

//         // Assuming the response contains updated balance data
//         const updatedBalance = response.data.balance;
//         setProfile({ ...profile, balance: updatedBalance });
//       } catch (error) {
//         console.error(error);
//       }

//       // Remove the setTargetColor(getRandomColor()) line from here

//       setResult("Success");
//       setEntryFee(fee);
//     } else {
//       alert("Insufficient balance to play!");
//     }
//   }
// }
// const handleColorSelect = async (color) => {
//   setUserChoice(color);

//   // Set the targetColor only if it's not set (for the first game)
//   if (!targetColor) {
//     setTargetColor(getRandomColor());
//   }

//   const message = `You chose ${color}`;
//   alert(message);

//      startGame();
//   let winnings = 0;
//   if (color === targetColor) {
//     winnings = calculateWinnings();
//     setResult("Success");

//     try {
//       const response = await axios.post(
//         "https://mlm-eo5g.onrender.com/api/gameProfile/winningGame",
//         {
//           userId: userId,
//           winnings: winnings,
//         }
//       );

//       // Assuming the response contains updated balance data
//       const updatedTotalWin = response.data.totalwin;
//       setProfile({ ...profile, totalwin: updatedTotalWin });
//     } catch (error) {
//       console.error(error);
//     }
//   } else {
//     setResult("Loss");
//   }

//   const gameDetails = {
//     userId: userId,
//     entryFee: entryFee,
//     targetColor: targetColor,
//     chosenColor: color,
//     result: result,
//     winningAmount: winnings,
//   };

//   try {
//     const response = await axios.post(
//       "https://mlm-eo5g.onrender.com/api/game/saveGame",
//       gameDetails
//     );
//     console.log(gameDetails);
//     if (response.status === 201) {
//       console.log("Game details saved successfully");
//     } else {
//       console.error("Error saving game details");
//     }
//   } catch (error) {
//     console.error("Error saving game details:", error);
//   }
// };


// const startGame = async (fee) => {
//   setEntryFee(fee); // Set the entryFee here
//   console.log(entryFee);
//   try {
//     const response = await axios.post(
//       "https://mlm-eo5g.onrender.com/api/gameProfile/startGame",
//       {
//         userId: userId,
//         entryFee: fee,
//       }
//     );

//     // Assuming the response contains updated balance data
//     const updatedBalance = response.data.balance;
//     setProfile({ ...profile, balance: updatedBalance });
//   } catch (error) {
//     console.error(error);
//   }

  
  
// };

// useEffect(() => {
//   // Set the targetColor only if it's not set (for the first game)
//   if (!targetColor) {
//     setTargetColor(getRandomColor());
//   }
//   if(!entryFee){
//     setEntryFee(entryFee);
//   }
// }, [targetColor, entryFee]);

// const handleColorSelect = async (color) => {
//   setUserChoice(color);

//   const message = `You chose ${color}`;
//   alert(message);

//   const selectedFee = prompt("Enter the Bet Amount (10, 20, 30, or 40 Rs):");
//   if (selectedFee !== null) {
//     const fee = parseInt(selectedFee, 10);
//     if (![10, 20, 30, 40].includes(fee)) {
//       alert("Invalid entry fee. Please select a valid fee.");
//       return;
//     }

//     if (profile.balance >= fee) {
//       // Call startGame here with the selected fee
//       startGame(fee);
//     } else {
//       alert("Insufficient balance to play!");
//     }
//   }

//   let winnings = 0;
//   if (color === targetColor) 
//   {
//     winnings = calculateWinnings();
//     setResult("Success");
//   } else {
//     setResult("Loss");
//   }
//     try {
//       const response = await axios.post(
//         "https://mlm-eo5g.onrender.com/api/gameProfile/winningGame",
//         {
//           userId: userId,
//           winnings: winnings,
//         }
//       );

//       // Assuming the response contains updated balance data
//       const updatedTotalWin = response.data.totalwin;
//       setProfile({ ...profile, totalwin: updatedTotalWin });
//     } catch (error) {
//       console.error(error);
//     }
  

//   const gameDetails = {
//     userId: userId,
//     entryFee: entryFee,
//     targetColor: targetColor,
//     chosenColor: color,
//     result: result,
//     winningAmount: winnings,
//   };

//   try {
//     const response = await axios.post(
//       "https://mlm-eo5g.onrender.com/api/game/saveGame",
//       gameDetails
//     );
//     console.log(gameDetails);
//     if (response.status === 201) {
//       console.log("Game details saved successfully");
//     } else {
//       console.error("Error saving game details");
//     }
//   } catch (error) {
//     console.error("Error saving game details:", error);
//   }
// };

useEffect(() => {
  // Set the targetColor only if it's not set (for the first game)
  if (!targetColor) {
    setTargetColor(getRandomColor());
  }
 
}, [targetColor ]);

const startGame = async (fee) => {
  try {
    const response = await axios.post(
      "https://mlm-eo5g.onrender.com/api/gameProfile/startGame",
      {
        userId: userId, // Make sure userId is defined or passed as a prop
        entryFee: fee,
      }
    );

    // Assuming the response contains updated balance data
    const updatedBalance = response.data.balance;
    // Make sure you have defined setProfile elsewhere
    setProfile({ ...profile, balance: updatedBalance });
  } catch (error) {
    console.error(error);
  }
};


const handleColorSelect = async (color) => {
  setUserChoice(color);

  const message = `You chose ${color}`;
  alert(message);

  const selectedFee = prompt("Enter the Bet Amount (10, 20, 30, or 40 Rs):");
  if (selectedFee !== null) {
    const fee = parseInt(selectedFee, 10);
    if (![10, 20, 30, 40].includes(fee)) {
      alert("Invalid entry fee. Please select a valid fee.");
      return;
    }
    setEntryFee(fee); // Set the entryFee here
    console.log(entryFee);
    if (profile.balance >= fee) {
      // Call startGame here with the selected fee
      await  startGame(fee);
    } else {
      alert("Insufficient balance to play!");
      return;
    }
  }

  let winnings = 0;
  if (color === targetColor) {
    console.log(color);
    console.log(targetColor);
    winnings = calculateWinnings();
    setResult("Success");
  } else {
    setResult("Loss");
  }

  try {
    const response = await axios.post(
      "https://mlm-eo5g.onrender.com/api/gameProfile/winningGame",
      {
        userId: userId, // Make sure userId is defined or passed as a prop
        winnings: winnings,
      }
    );

    // Assuming the response contains updated balance data
    const updatedTotalWin = response.data.totalwin;
    // Make sure you have defined setProfile elsewhere
    setProfile({ ...profile, totalwin: updatedTotalWin });
  } catch (error) {
    console.error(error);
  }

  const gameDetails = {
    userId: userId, // Make sure userId is defined or passed as a prop
    entryFee: entryFee,
    targetColor: targetColor,
    chosenColor: color,
    result: result,
    winningAmount: winnings,
  };

  try {
    const response = await axios.post(
      "https://mlm-eo5g.onrender.com/api/game/saveGame",
      gameDetails
    );
    console.log(gameDetails);
    if (response.status === 201) {
      console.log("Game details saved successfully");
    } else {
      console.error("Error saving game details");
    }
  } catch (error) {
    console.error("Error saving game details:", error);
  }

  
};



  return (
    <div
      className="game-container"
      style={{
        background: "#000428",
        height: "100vh",
        width: "100%",
        marginRight: "0px",
      }}
    >
      {hasWon && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={200}
        />
      )}

      <h1 className="text-center text-info pt-5">Color Prediction</h1>

    
        <div>
          <p className="p-2 text-secondary">Select the color:</p>
          <div className="color-options">
            {predefinedColors.map((color) => (
              <button
                key={color}
                style={{ backgroundColor: color.toLowerCase() }}
                onClick={() => handleColorSelect(color)}
                className="game_button"
              >
                {color}
              </button>
            ))}
          </div>
          {userChoice && hasPlayed && (
            <div>
              <h6 className="text-white text-center">{result}</h6>
            </div>
          )}
          <button
            onClick={exitGame}
            className="btn btn-outline-danger ms-5 mt-2"
          >
            Exit Game
          </button>
        </div>
     
      <div className="container">
        <div className="row game_account">
          <div className="col-5 col-sm-9 col-md-6 col-lg-5 balanceCard">
            <h6 className="text-info">Balance</h6>
            <h5 style={{ color: "cyan" }}> {profile.balance} Rs</h5>
          </div>
          <div className="col-5 col-sm-9 col-md-6 col-lg-5 balanceCard">
            <h6 className="text-info">Total win</h6>
            <h5 style={{ color: "cyan" }}> {profile.totalwin} Rs</h5>
          </div>
        </div>
      </div>
      <div className="bottom_section " style={{ marginTop: "90px" }}>
        <div
          className="row footer_row_content"
          style={{ height: "90px", color: "cyan" }}
        >
          <div className="col-12">
            <div className="footer_container">
              <div className="footer_content">
                <Link
                  to="/dashboard"
                  className="footer_icon"
                  style={{ color: "cyan" }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/9187/9187555.png"
                    alt="account Activation"
                    height="35px"
                    width="35px"
                  />
                  <h6 className=" mt-1">Home</h6>
                </Link>
                <div className="footer_icon">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/10701/10701014.png"
                    alt="wallet"
                    height="40px"
                    width="40px"
                    className="dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  />
                  <h6
                    className="mt-1 dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Menu
                  </h6>
                  <ul className="dropdown-menu">
                    <li>
                      <h6
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                      >
                        Deposit
                      </h6>
                    </li>
                    <li>
                      <h6
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop1"
                      >
                        Game History
                      </h6>
                    </li>
                    <li>
                      <h6
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop2"
                      >
                        Withdrawal
                      </h6>
                    </li>
                    <li>
                      <h6
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop3"
                      >
                        Withdrawal History
                      </h6>
                    </li>
                    <li>
                      <h6
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop4"
                      >
                        Deposit History
                      </h6>
                    </li>
                  </ul>
                </div>
                <Link
                  to="/game"
                  className="footer_icon"
                  style={{ color: "cyan" }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/8002/8002123.png"
                    alt="fund"
                    height="35px"
                    width="35px"
                  />
                  <h6 className="mt-1">Game</h6>
                </Link>
                <Link to="/setting" className="footer_icon">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/3953/3953226.png"
                    alt="account Activation"
                    height="35px"
                    width="35px"
                  />
                  <h6 className="mt-1" style={{ color: "cyan" }}>
                    Setting
                  </h6>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Deposit Start  */}
      {/* Modal */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bg-dark">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 text-warning"
                id="staticBackdropLabel"
              >
                Deposit
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <h6 className="text-info">UPI: xxxxxxxx@paytm</h6>
              <form onSubmit={handleSubmit} className="deposit_Form">
                <label>UserId:</label>
                <input
                  type="text"
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  // disabled
                  required
                />
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                <label>Amount:</label>
                <input
                  type="number"
                  name="amount"
                  placeholder="Amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />

                <br />
                <button type="submit" className="btn btn-outline-primary">
                  Submit
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Deposit End */}
      {/*Game History Start  */}
      {/* Modal */}
      <div
        className="modal fade"
        id="staticBackdrop1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bg-dark">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 text-info"
                id="staticBackdropLabel"
              >
                Game History
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body table-responsive">
              <table className="table table-bordered table-hover table-dark">
                <thead>
                  <tr className="text-secondary">
                    <th>#</th>
                    <th>Target Color</th>
                    <th>Choosen Color</th>
                    <th>Result</th>
                    <th>Winning Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {gameHistory.map((game, index) => (
                    <tr key={index}>
                      <td className="text-info">{index}</td>
                      <td className="text-primary">{game.targetColor}</td>
                      <td className="text-secondary">{game.chosenColor}</td>
                      <td className="text-warning">{game.result}</td>
                      <td className="text-success">{game.winningAmount}</td>
                      <td className="text-secondary">
                        {new Date(game.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Game History End */}
      {/*Withdrawal Start  */}
      {/* Modal */}
      <div
        className="modal fade"
        id="staticBackdrop2"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Withdrawal
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmitWithdrawal} className="deposit_Form">
                <label>UserId:</label>
                <input
                  type="text"
                  name="userId"
                  value={formData1.userId}
                  onChange={handleChange1}
                  // disabled
                  required
                />
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData1.name}
                  onChange={handleChange1}
                  required
                />

                <label>Amount:</label>
                <input
                  type="number"
                  name="amount"
                  placeholder="Amount"
                  value={formData1.amount}
                  onChange={handleChange1}
                  required
                />
                <label>UPI:</label>
                <input
                  type="text"
                  name="UPI"
                  placeholder="Payment UPI "
                  value={formData1.UPI}
                  onChange={handleChange1}
                  required
                />
                <br />
                <button type="submit" className="btn btn-outline-primary">
                  Submit
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Withdrawal End */}
      {/*Wthdrawal history Start  */}
      {/* Modal */}
      <div
        className="modal fade"
        id="staticBackdrop3"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bg-dark">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 text-info"
                id="staticBackdropLabel"
              >
                Withdrawal History
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body table-responsive">
              <table className="table table-bordered table-hover table-dark">
                <thead>
                  <tr className="text-secondary">
                    <th>#</th>
                    <th>Name</th>
                    <th>UserId</th>
                    <th>Amount</th>
                    <th>UPI</th>
                    <th>status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawalHistory.map((withdrawal, index) => (
                    <tr key={index}>
                      <td className="text-info">{index}</td>
                      <td className="text-primary">{withdrawal.name}</td>
                      <td className="text-secondary">{withdrawal.userId}</td>
                      <td className="text-warning">{withdrawal.amount}</td>
                      <td className="text-success">{withdrawal.UPI}</td>
                      <td
                        className={
                          withdrawal.approved === "Pending"
                            ? "text-warning"
                            : withdrawal.approved === "Approved"
                            ? "text-success"
                            : "text-danger"
                        }
                      >
                        {withdrawal.approved}
                      </td>
                      <td className="text-secondary">
                        {new Date(withdrawal.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* withdrawal History End */}

      {/*Deposit history Start  */}
      {/* Modal */}
      <div
        className="modal fade"
        id="staticBackdrop4"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bg-dark">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 text-info"
                id="staticBackdropLabel"
              >
                Deposit History
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body table-responsive">
              <table className="table table-bordered table-hover table-dark">
                <thead>
                  <tr className="text-secondary">
                    <th>#</th>
                    <th>Name</th>
                    <th>UserId</th>
                    <th>Amount</th>
                    <th>status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {depositHistory.map((withdrawal, index) => (
                    <tr key={index}>
                      <td className="text-info">{index}</td>
                      <td className="text-primary">{withdrawal.name}</td>
                      <td className="text-secondary">{withdrawal.userId}</td>
                      <td className="text-warning">{withdrawal.amount}</td>
                      <td
                        className={
                          withdrawal.approved === "Pending"
                            ? "text-warning"
                            : withdrawal.approved === "Approved"
                            ? "text-success"
                            : "text-danger"
                        }
                      >
                        {withdrawal.approved}
                      </td>
                      <td className="text-secondary">
                        {new Date(withdrawal.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Deposit History End */}
    </div>
  );
};

export default ColorPredictionGame;
