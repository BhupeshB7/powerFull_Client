import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import axios from "axios"; // Import Axios for making API calls

const predefinedColors = ["blueviolet", "Red", "Green"];

const ColorPrediction1 = () => {
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * predefinedColors.length);
    return predefinedColors[randomIndex];
  };

  const [targetColor, setTargetColor] = useState("");
  const [userChoice, setUserChoice] = useState("");
  const [result, setResult] = useState("");
  const [round, setRound] = useState(0);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [balance, setBalance] = useState(100);
  const [entryFee, setEntryFee] = useState(0);
  const [totalWon, setTotalWon] = useState(0);
  const [hasWon, setHasWon] = useState(false);
  const userId= 'PI0123456';
  useEffect(() => {
    if (round > 0) {
      setTargetColor(getRandomColor());
      console.log('targetColor');
      console.log(targetColor);
      setUserChoice(userChoice);
      setResult("");
      setHasPlayed(true);
    }
  }, [round]);

 

//   const startNewGame = async () => {
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

//         // Save game details to the backend
//         const { winningAmount, winningMessage } = calculateWinnings();
//         const gameDetails = {
//           entryFee: fee,
//           targetColor: targetColor,
//           chosenColor: userChoice,
//           result: winningMessage,
//           winningAmount: winningAmount,
//         };

//         try {
//           const response = await axios.post("http://localhost:5000/api/game/saveGame", gameDetails);
//           if (response.status === 201) {
//             console.log("Game details saved successfully");
//           } else {
//             console.error("Error saving game details");
//           }
//         } catch (error) {
//           console.error("Error saving game details:", error);
//         }
//       } else {
//         alert("Insufficient balance to play!");
//       }
//     }
//   };
  const startNewGame = async () => {
    setHasWon(false);
    const selectedFee = prompt("Enter the entry fee (10, 20, 30, or 40 Rs):");
    if (selectedFee !== null) {
      const fee = parseInt(selectedFee, 10);
      if (![10, 20, 30, 40].includes(fee)) {
        alert("Invalid entry fee. Please select a valid fee.");
        return;
      }

      if (balance >= fee) {
        setRound(1);
        setTargetColor(targetColor);
        setUserChoice(""); // Clear the user's previous choice
        setResult("");
        setHasPlayed(false);
        setEntryFee(fee);
        setBalance(balance - fee);

      

        
      } else {
        alert("Insufficient balance to play!");
      }
    }
  };
  const exitGame = () => {
    if (window.confirm("Are you sure you want to exit the game?")) {
      window.location.reload();
    }
  };

  const handleColorSelect = async (color) => {
    setUserChoice(color);
    alert(`${color} selected`);
    // Save game details to the backend
    const { winningAmount, winningMessage } = calculateWinnings();
    console.log(` Entry Fee :${entryFee}`)
    console.log(` Target Color :${targetColor}`)
    console.log(` Choosen  Color :${color}`)
    console.log(` Winning Amount :${winningAmount}`)
    console.log(` Winning Message :${winningMessage}`)
    const gameDetails = {
      userId: userId,
      entryFee: entryFee,
      targetColor: targetColor,
      chosenColor: color, // Include the chosen color in the game details
      result: winningMessage,
      winningAmount: winningAmount,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/game/saveGame", gameDetails);
      if (response.status === 201) {
        console.log("Game details saved successfully");
      } else {
        console.error("Error saving game details");
      }
    } catch (error) {
      console.error("Error saving game details:", error);
    }
  };
  const calculateWinnings = () => {
    let winningAmount = 0;
    let winningMessage = "You lost!";
    console.log(userChoice);
    console.log(targetColor);
    if (userChoice === targetColor) {
    switch (entryFee) {
      case 10:
        winningAmount = 15;
        break;
      case 20:
        winningAmount = 28;
        break;
      case 30:
        winningAmount = 38;
        break;
      case 40:
        winningAmount = 50;
        break;
    }

   
      winningMessage = `You won ${winningAmount} Rs!`;
    }

    return { winningAmount, winningMessage };
  };
  return (
    <div
      className="game-container h-100"
      style={{ background: "#000428", minHeight: "100vh" }}
    >
      {hasWon && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={200}
        />
      )}

      <h1 className="text-center text-info pt-5">Color Prediction</h1>

      {round === 0 ? (
        <div>
          <button onClick={startNewGame} className="btn btn-outline-info ms-3">
            Start Game
          </button>
        </div>
      ) : (
        <div>
          <p className="p-2 text-secondary">Select the color:</p>
          <div className="color-options">
            {predefinedColors.map((color) => (
              <button
                key={color}
                style={{ backgroundColor: color.toLowerCase() }}
                onClick={() => handleColorSelect(color)}
                disabled={!!userChoice}
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
          <button onClick={exitGame} className="btn btn-outline-danger ms-5 mt-2">
            Exit Game
          </button>
        </div>
      )}

      <div className="container">
        <div className="row game_account">
          <div className="col-5 col-sm-9 col md-6 col-lg-5 balanceCard">
            <h6 className="text-info">Balance</h6>
            <h5 style={{ color: "cyan" }}> {balance} Rs</h5>
          </div>
          <div className="col-5 col-sm-9 col md-6 col-lg-5 balanceCard">
            <h6 className="text-info">Total win</h6>
            <h5 style={{ color: "cyan" }}> {totalWon} Rs</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPrediction1;
