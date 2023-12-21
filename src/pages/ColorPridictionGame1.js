import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Container, Row, Button, Form, Modal } from "react-bootstrap";
import io from "socket.io-client";
import LOGO from "../assets/icon.png";
import spinner from "../assets/spinner2.gif";
import OneMinuteHistory from "./OneMinuteHistory";

const socket = io("https://mlm-production.up.railway.app");
// const socket = io("http://localhost:5000");
const ColorPridictionGame1 = () => {
  // State variables
  const [time, setTime] = useState(120);
  const predefinedNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const [buttonNumbers, setButtonNumbers] = useState(predefinedNumbers);
  const [contentDisabled, setContentDisabled] = useState(false);
  const [userChoice, setUserChoice] = useState("");
  const [userChoiceNumber, setUserChoiceNumber] = useState("");
  const [userChoiceLetter, setUserChoiceLetter] = useState("");
  const [userChoiceButtonNumber, setUserChoiceButtonNumber] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showNumberModal, setShowNumberModal] = useState(false);
  const [showLetterModal, setShowLetterModal] = useState(false);
  const [betAmount, setBetAmount] = useState(0);
  const [multiplicationFactor, setMultiplicationFactor] = useState(1);
  const [buttonColors, setButtonColors] = useState([]);
  const [gameResult, setGameResult] = useState("");
  const [timerBlink, setTimerBlink] = useState(false);
  const [balance, setBalance] = useState(100);
  const [realTimeData, setRealTimeData] = useState(null);
  const [timerCountdown, setTimerCountdown] = useState(0);
  const [timer, setTimer] = useState("Loading...");
  const [isTokenValid, setIsTokenValid] = useState(true);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  //   const [message, setMessage] = useState('');

  const getTokenExpireTime = () => {
    const tokenExpire = localStorage.getItem("tokenExpire");
    return tokenExpire ? parseInt(tokenExpire) : null;
  };

  const isTokenExpired = () => {
    const expireTime = getTokenExpireTime();
    return expireTime ? expireTime < Date.now() : true;
  };
  const token = localStorage.getItem("token");
  // const isTokenValids = 'localStorage.getItem("token")';
  // useEffect(() => {
  //   if (isTokenExpired()) {
  //     setIsTokenValid(false);
  //     // redirect to homepage
  //     window.location.href = "/login";
  //   }
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://mlm-production.up.railway.app/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();

        // Store userId in localStorage
        if (result.userId) {
          localStorage.setItem("GameUserId", result.userId);
        }

        // Handle role-specific logic
        if (result.role === "admin") {
          localStorage.setItem("check", "nfwnwen");
        }

        setData(result);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      // Remove userId from localStorage when component unmounts
      localStorage.removeItem("userId");
    };
  }, [token]);

  useEffect(() => {
    const socket = io("https://mlm-production.up.railway.app");
    // const socket = io("http://localhost:5000");

    socket.on("testEvent", (data) => {
      console.log("Test event received:", data);
      // setMessage(data.message);
    });

    socket.on("timerUpdate1", (update) => {
      // console.log("Timer update received:", update);
      setTimer(update.countdown);

      if (update.countdown === 58) {
        console.log("Countdown is 58. Invoking handleTimerEnd()");
        handleTimerEnd();
      }
    });

    // Cleanup the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    // Event listener for initial data
    socket.on("initialData1", (data) => {
      setRealTimeData(data);
      console.log("Initial Data:-");
      console.log(data);
    });

    // Event listener for new data
    socket.on("newData1", (data) => {
      setRealTimeData(data);
      // console.log('New Data');
      // console.log(data);
      localStorage.setItem("choiceColor", data.color);
      localStorage.setItem("choiceNumber", data.number);
      localStorage.setItem("choiceLetter", data.letter);
    });

    // Event listener for timer countdown
    socket.on("timerCountdown1", (countdown) => {
      setTimerCountdown(countdown);
    });

    // Clean up the event listeners when the component unmounts
    return () => {
      socket.off("initialData1");
      socket.off("newData1");
      socket.off("timerCountdown1");
    };
  }, []);
  // Constants
  const predefinedColors = ["Violet", "Red", "Green"];
  const predefinedLetter = ["Small", "Big"];
  // const predefinedNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const predefinedColors1 = ["green", "orange", "purple"];

  // Styles
  const timerStyle = {
    fontSize: timerBlink && time <= 5 ? "40px" : "19px",
    color: timerBlink && time <= 5 ? "red" : "white",
    animation: timerBlink && time <= 5 ? "blink 1s infinite" : "none",
  };
  const getGamerProfile = async () => {
    try {
      const response = await axios.get(
        `https://mlm-production.up.railway.app/api/gameProfile/${data.userId}`
      );
      const result = response.data;
      setProfile(result);
      // console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getGamerProfile();
  }, [data.userId]);
  // useEffect to generate random colors when the component is initially rendered
  useEffect(() => {
    const randomColors = predefinedNumbers.map(() => {
      const randomIndex = Math.floor(Math.random() * predefinedColors1.length);
      return predefinedColors1[randomIndex];
    });

    setButtonColors(randomColors);
  }, []); // The empty dependency array ensures this effect runs only once
  useEffect(() => {
    // Update the timer logic as needed
    // For demonstration purposes, this example assumes that timer is a number
    // and updates it every second
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Check if the timer is less than 7, and update the showModal state accordingly
    if (timer < 7) {
      setShowModal(false);
      setShowLetterModal(false);
      setShowNumberModal(false);
    }
  }, [timer]);
  // Listen to the scroll event to show/hide the button
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // Functions
  const handleBet = async () => {
    if (betAmount < 1) {
      alert("Bet Amount Should be greater than 1Rs.😌");
      // handleAlert("Bet Amount Should be greater than 1Rs.😌");
      setShowModal(false);
      setShowNumberModal(false);
      setShowLetterModal(false);
      return;
    } else if (betAmount > profile.balance) {
      alert("Insufficient Balance");
      // handleAlert("Insufficient Balance");
      setShowModal(false);
      setShowNumberModal(false);
      setShowLetterModal(false);
      return;
    } else {
      // Save choices in local storage

      localStorage.setItem("userChoice", userChoice);
      localStorage.setItem("userChoiceNumber", userChoiceNumber);
      localStorage.setItem("userChoiceLetter", userChoiceLetter);
      localStorage.setItem("betAmount", betAmount);
      // Close the modal after placing the bet
      setShowNumberModal(false);
      setShowLetterModal(false);
      setShowModal(false);
      alert(`Bet Place SuccessFully! of ${betAmount} Rs.`);
      try {
        const response = await axios.post(
          "https://mlm-production.up.railway.app/api/gameProfile/startGame",
          {
            userId: data.userId, // Make sure userId is defined or passed as a prop
            entryFee: betAmount,
          }
        );

        // Assuming the response contains updated balance data
        const updatedBalance = response.data.balance;
        // Make sure you have defined setProfile elsewhere
        setProfile({ ...profile, balance: updatedBalance });
      } catch (error) {
        console.error(error);
      }
      // console.log(userChoice);
      // console.log(userChoiceNumber);
      // console.log(userChoiceLetter);
      // Reset the game after 10 seconds
      setTimeout(() => {
        setGameResult("");
        setUserChoice("");
        setUserChoiceNumber("");
        setUserChoiceLetter("");
        setBetAmount(0);
      }, 5000); // 10 seconds in milliseconds
    }
  };
  const handleColorSelect = (color) => {
    setUserChoice(color);
    setShowModal(true);
  };

  const handleNumberSelect = (color, buttonColor) => {
    if (timer < 40) {
      // alert(timer)
      setShowNumberModal(false);
      setShowLetterModal(false);
      setShowModal(false);
    }
    setUserChoiceNumber(color);
    setUserChoiceButtonNumber(buttonColor);
    setShowNumberModal(true);
  };
  const handleLetterSelect = (letter, buttonColor) => {
    setUserChoiceLetter(letter);
    setUserChoiceButtonNumber(buttonColor);
    setShowLetterModal(true);
  };

  //   const generateAndSaveRandomData = () => {
  //     const randomData = {
  //       color: getRandomColor(),
  //       number: getRandomNumber(),
  //       size: getRandomLetter(),
  //       timestamp: new Date(),
  //     };
  //     console.log(randomData);
  //     saveToMongoDB(randomData);
  //   };
  // console.log(data.userId);
  const incrementBetAmount = () => {
    setBetAmount((prevAmount) => prevAmount + 5);
  };

  const decrementBetAmount = () => {
    if (betAmount >= 5) {
      setBetAmount((prevAmount) => prevAmount - 5);
    }
  };

  const multiplyBetAmount = (factor) => {
    setBetAmount((prevAmount) => prevAmount * factor);
    setMultiplicationFactor(factor);
  };

  const resetBetAmount = () => {
    setBetAmount(0);
    setMultiplicationFactor(1); // Reset multiplication factor as well if needed
  };

  const handleButtonClick = (multiplier) => {
    // handleNumberSelect();
    if (betAmount === 0) {
      setBetAmount(1);
    } else {
      setBetAmount(betAmount * multiplier);
    }
  };
  // useEffect(() => {
  //   const fetchData = async () => {
  //     await handleTimerEnd();
  //   };

  //   // Initial fetch
  //   fetchData();

  //   // Set up interval to fetch data every 30 seconds
  //   const intervalId = setInterval(fetchData, 10000);

  //   // Cleanup logic if needed
  //   return () => {
  //     clearInterval(intervalId); // Clear the interval when the component unmounts
  //     // Additional cleanup code
  //   };
  // }, []); // Empty dependency array to run the effect only once on mount

  // const handleTimerEnd = async () => {
  //   // Retrieve user choices from local storage
  //   const userChoice = localStorage.getItem("userChoice");
  //   const userChoiceNumber = localStorage.getItem("userChoiceNumber");
  //   const userChoiceLetter = localStorage.getItem("userChoiceLetter");
  //   const betAmount = localStorage.getItem("betAmount");
  //   const choiceColor = localStorage.getItem("choiceColor");
  //   const choiceNumber = localStorage.getItem("choiceNumber");
  //   const choiceLetter = localStorage.getItem("choiceLetter");
  //   // console.log(userChoiceLetter);
  //   // console.log(betAmount);
  //   // console.log(choiceColor);
  //   // console.log(choiceNumber);
  //   // console.log(choiceLetter);
  //   // localStorage.removeItem("userChoice");
  //   // localStorage.removeItem("userChoiceNumber");
  //   // localStorage.removeItem("userChoiceLetter");
  //   // localStorage.removeItem("betAmount");
  //   // localStorage.removeItem("choiceColor");
  //   // localStorage.removeItem("choiceNumber");
  //   // localStorage.removeItem("choiceLetter");
  //   // Check for matches
  //   if (
  //     userChoice === choiceColor ||
  //     userChoiceNumber === choiceNumber ||
  //     userChoiceLetter === choiceLetter
  //   ) {
  //     let multiplier = 1;

  //     // Determine multiplier based on the type of match
  //     if (
  //       userChoice === choiceColor ||
  //       userChoiceLetter === choiceLetter
  //     ) {
  //       multiplier = 2;
  //     } else if (userChoiceNumber === choiceNumber) {
  //       multiplier = 4;
  //     }

  //     // Update balance
  //     const currentBalance = parseFloat(localStorage.getItem("betAmount")) || 0;
  //     const winnings = currentBalance * multiplier; // Adjust the multiplier as needed
  //     console.log(winnings);
  //     try {
  //       const response = await axios.post(
  //         "https://mlm-production.up.railway.app/api/gameProfile/winningGame",
  //         {
  //           userId: data.userId, // Make sure userId is defined or passed as a prop
  //           winnings: winnings,
  //         }
  //       );

  //       // Assuming the response contains updated balance data
  //       const updatedTotalWin = response.data.totalwin;
  //       // Make sure you have defined setProfile elsewhere
  //       setProfile({ ...profile, totalwin: updatedTotalWin });
  //     } catch (error) {
  //       console.error(error);
  //     }

  //     // Remove user choices from local storage
  //     // localStorage.setItem("balance", winnings.toString());
  //   }
  //   localStorage.removeItem("userChoice");
  //   localStorage.removeItem("userChoiceNumber");
  //   localStorage.removeItem("userChoiceLetter");
  //   localStorage.removeItem("betAmount");
  //   localStorage.removeItem("choiceColor");
  //   localStorage.removeItem("choiceNumber");
  //   localStorage.removeItem("choiceLetter");
  //   // Update the balance in local storage
  // };
  //   const handleTimerEnd = async () => {
  //     try {
  //         // Retrieve user choices from local storage
  //         const userChoice = localStorage.getItem("userChoice");
  //         const userChoiceNumber = localStorage.getItem("userChoiceNumber");
  //         const userChoiceLetter = localStorage.getItem("userChoiceLetter");
  //         const betAmount = localStorage.getItem("betAmount");
  //         const choiceColor = localStorage.getItem("choiceColor");
  //         const choiceNumber = localStorage.getItem("choiceNumber");
  //         const choiceLetter = localStorage.getItem("choiceLetter");

  //         // Check for matches
  //         if (
  //             userChoice === choiceColor ||
  //             userChoiceNumber === choiceNumber ||
  //             userChoiceLetter === choiceLetter
  //         ) {
  //             let multiplier = 1;

  //             // Determine multiplier based on the type of match
  //             if (
  //                 userChoice === choiceColor ||
  //                 userChoiceLetter === choiceLetter
  //             ) {
  //                 multiplier = 2;
  //             } else if (userChoiceNumber === choiceNumber) {
  //                 multiplier = 4;
  //             }

  //             // Update balance
  //             const currentBalance = parseFloat(betAmount) || 0;
  //             const winnings = currentBalance * multiplier; // Adjust the multiplier as needed
  //             try {
  //               console.log("Sending request to API...");
  //               const response = await axios.post(
  //                 "https://mlm-production.up.railway.app/api/gameProfile/winningGame",
  //                 {
  //                   userId: data.userId, // Make sure userId is defined or passed as a prop
  //                   winnings: winnings,
  //                 }
  //               );

  //               console.log("API response:", response);

  //               // Assuming the response contains updated balance data
  //               const updatedTotalWin = response.data.totalwin;
  //               // Make sure you have defined setProfile elsewhere
  //               setProfile({ ...profile, totalwin: updatedTotalWin });
  //             } catch (error) {
  //               console.error("Error in API request:", error);
  //             }

  //             }

  //           // Remove user choices from local storage
  //           localStorage.removeItem("userChoice");
  //           localStorage.removeItem("userChoiceNumber");
  //           localStorage.removeItem("userChoiceLetter");
  //           localStorage.removeItem("betAmount");
  //           localStorage.removeItem("choiceColor");
  //           localStorage.removeItem("choiceNumber");
  //           localStorage.removeItem("choiceLetter");
  //         } catch (error) {
  //           console.error("An error occurred:", error);
  //         }
  // };

  const handleTimerEnd = async () => {
    console.log("Invoked function handleTimerEnd Part1");
    try {
      console.log("Invoked function handleTimerEnd");
      // Retrieve user choices from local storage
      const userChoice = localStorage.getItem("userChoice");
      const userChoiceNumber = localStorage.getItem("userChoiceNumber");
      const userChoiceLetter = localStorage.getItem("userChoiceLetter");
      const betAmount = localStorage.getItem("betAmount");
      const choiceColor = localStorage.getItem("choiceColor");
      const choiceNumber = localStorage.getItem("choiceNumber");
      const choiceLetter = localStorage.getItem("choiceLetter");
  
      // Check for matches
      if (
        userChoice === choiceColor ||
        userChoiceNumber === choiceNumber ||
        userChoiceLetter === choiceLetter
      ) {
        let multiplier = 1;
  
        // Determine multiplier based on the type of match
        if (userChoice === choiceColor || userChoiceLetter === choiceLetter) {
          multiplier = 2;
        } else if (userChoiceNumber === choiceNumber) {
          multiplier = 4;
        }
  
        // Update balance
        const currentBalance = parseFloat(betAmount) || 0;
        const winnings = currentBalance * multiplier; // Adjust the multiplier as needed
           const gameId = localStorage.getItem("GameUserId");
        // Make the API call to update balance
        console.log('Before Wallet updated', gameId)
        await updateBalance(gameId, winnings);
  
        // Log a message indicating successful wallet update
        console.log("Wallet updated successfully!");
      }
  
      // Remove user choices from local storage
      clearUserChoices();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  
  const updateBalance = async (userId, winnings) => {
    console.log('GameID of the user',userId);
    try {
      const response = await fetch(
        "https://mlm-production.up.railway.app/api/game/winningGame/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            winnings: winnings,
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
  
      // Assuming the response contains updated balance data
      const updatedTotalWin = responseData.totalwin;
      // Make sure you have defined setProfile elsewhere
      setProfile({ ...profile, totalwin: updatedTotalWin });
    } catch (error) {
      console.error("Error updating balance:", error);
      throw error; // Re-throw the error to be caught by the calling function
    }
  };
  
  const clearUserChoices = () => {
    // Remove user choices from local storage
    localStorage.removeItem("userChoice");
    localStorage.removeItem("userChoiceNumber");
    localStorage.removeItem("userChoiceLetter");
    localStorage.removeItem("betAmount");
    localStorage.removeItem("choiceColor");
    localStorage.removeItem("choiceNumber");
    localStorage.removeItem("choiceLetter");
  };
  

  if (isLoading) {
    return (
      <h6
        className="text-center"
        style={{
          marginTop: "-70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <img
          src={spinner}
          alt="spinner"
          height="100px"
          width="100px"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </h6>
    );
  }
  const handleLive = () => {
    window.location.href = "/game/colorpridiction/live";
  };
  const handleLive2 = () => {
    window.location.href = "/game/colorpridiction/3minutes";
  };
  const handleLive1 = () => {
    window.location.href = "/game/colorpridiction/3minutes";
  };
  const handleBack = () => {
    window.location.href = "/game/colorpridiction";
  };
  const currentDate = new Date();
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Get current month with leading zero
  const currentDay = currentDate.getDate().toString().padStart(2, "0"); // Get current day with leading zero
  const currentMinutes = currentDate.getMinutes().toString().padStart(2, "0"); // Get current minutes with leading zero
  const sessionPrefix = "PI11-";
  const session = `${sessionPrefix}${currentMonth}${currentDay}-00${currentMinutes}`;
  const timerSeconds = timer; // Replace this with your actual timer value

  // Convert seconds to minutes and seconds
  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;
  // Format minutes and seconds as two digits
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  // Display the formatted minutes and seconds
  console.log(`${formattedMinutes}:${formattedSeconds}`);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Adds smooth scrolling animation
    });
  };
  const handleRandomize = () => {
    // Show numbers in a random order for 3 seconds
    const initialShuffle = [...predefinedNumbers].sort(
      () => Math.random() - 0.5
    );
    setButtonNumbers(initialShuffle);

    // Vibrate for 3 seconds
    if ("vibrate" in navigator) {
      navigator.vibrate([1000, 500, 1000]);
    }

    // Rearrange the numbers randomly after 3 seconds
    setTimeout(() => {
      const shuffledNumbers = [...predefinedNumbers].sort(
        () => Math.random() - 0.5
      );
      const shuffleColors = [...predefinedColors1].sort(
        () => Math.random() - 0.5
      );

      // Set the rearranged numbers and enable content
      setButtonNumbers(shuffledNumbers);

      // Automatically select the first number after rearranging
      handleNumberSelect(shuffledNumbers[0], shuffleColors[0]);

      // Stop vibrating
      if ("vibrate" in navigator) {
        navigator.vibrate(0);
      }
    }, 2000); // Total duration of vibration plus the time for rearrangement
  };

  return (
    <div className="threeMinuteGame colorbackGround">
      <div
        className="d-flex justify-content-end"
        style={{ position: "absolute", right: "20px", top: "30px" }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/128/189/189254.png"
          height="40px"
          width="40px"
          onClick={handleBack}
          alt="back"
        />
      </div>
      <div className="logo">
        <img src={LOGO} alt="logo" height="70px" width="100px" />
      </div>
      <div className="game_box">
        <div
          className="d-flex justify-content-center  align-items-center buttonDW"
          style={{ flexDirection: "row", background: "transparent" }}
        ></div>
        <div className="wallet">
          <div className="content">
            <img
              src="https://cdn-icons-png.flaticon.com/128/10149/10149458.png"
              height="40px"
              width="50px"
              alt="wallet"
            />
            <b className="text-light">
              wallet <br /> {profile.balance} ₹
            </b>{" "}
            {/* <p className="text-secondary">wallet</p> */}
          </div>
          <div className="content">
            <img
              src="https://cdn-icons-png.flaticon.com/128/9715/9715374.png"
              height="40px"
              width="50px"
              alt="wallet"
            />
            <b className="text-light">
              Income <br /> {profile.totalwin} ₹
            </b>{" "}
            {/* <p className="text-secondary">Income </p> */}
          </div>
        </div>
      </div>
      <Container>
        <Row>
          <Col sm={12}>
            {/* <WithLabelExample/> */}
            <div className="time_box">
              <div className="time_box_2">
                <div className="part1 p-3">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/3395/3395472.png"
                    width="50px"
                    height="50px"
                    alt="time"
                    onClick={handleLive1}
                  />
                  <br /> <h6 className="text-warning">1 min</h6>
                </div>
                <div className="part1 p-3">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/4836/4836989.png"
                    width="50px"
                    height="50px"
                    alt="time"
                    onClick={handleLive2}
                  />
                  <br /> <h6 className="text-warning">min</h6>
                </div>
                <div className="part2">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/9364/9364070.png?ga=GA1.1.260354095.1700988836"
                    width="80px"
                    height="70px"
                    alt="time"
                    onClick={handleLive}
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      {/* Your game UI components go here */}
      <Container className="m-auto d-flex justify-content-center mt-2">
        <h6
          className="text-light p-2"
          style={{
            textAlign: "center",
            border: "1px solid orange",
            color: "white",
            padding: "10px 14px",
            width: "140px",
            borderTopRightRadius: "20px",
            borderBottomLeftRadius: "20px",
          }}
        >
          1 Minutes
        </h6>
      </Container>
      <Container className="pt-5">
        <Row style={{ display: "flex", flexDirection: "row-reverse" }}>
          <Col sm={12} md={6} lg={6} className="game_session">
            <div>
              <h6 className="text-light p-2" style={{ textAlign: "end" }}>
                Left time to buy
              </h6>

              <div>
                <style>
                  {`
          @keyframes blink {
            0% {
              opacity: 1;
            }
            50% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
        `}
                </style>
                <div className="timer">
                  {timer <= 5 ? (
                    <div className="blur-background">
                      <div className="remaining" style={{ display: "flex" }}>
                        <h1
                          className="text-danger"
                          style={{ fontSize: "66px", fontWeight: "bold" }}
                        >{`00:${timer.toString().padStart(2, "0")}`}</h1>
                      </div>
                    </div>
                  ) : null}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p className="text-warning">{session}</p>
                    <h1 style={{ color: "#bbb" }}>
                      {" "}
                      <b
                        style={
                          timer <= 5
                            ? {
                                display: "none",
                                fontSize: "30px !important",
                              }
                            : timerStyle
                        }
                      >
                        {formattedMinutes}:{formattedSeconds}
                      </b>
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="p-3">
          <Col
            sm={12}
            md={6}
            lg={6}
            className={`game_choice_color ${contentDisabled ? "disabled" : ""}`}
            style={{
              opacity: contentDisabled ? 0.7 : 1,
              pointerEvents: contentDisabled ? "none" : "auto",
            }}
          >
            <div className="color-options">
              {predefinedColors.map((color) => (
                <button
                  key={color}
                  style={{
                    backgroundColor: contentDisabled
                      ? "gray"
                      : color.toLowerCase(),
                    margin: "5px",
                    border: contentDisabled
                      ? "gray"
                      : `1.5px solid ${color.toLowerCase()}`,
                  }}
                  onClick={() => handleColorSelect(color)}
                  className="game_button text-dark"
                  disabled={gameResult !== ""}
                >
                  {color}
                </button>
              ))}
            </div>

            {/* <div
              style={{
                backgroundColor: targetColor.toLowerCase(),
                width: "50px",
                height: "50px",
                display: "inline-block",
                margin: "5px",
              }}
            /> */}
          </Col>
        </Row>
        {/*Number-start  */}
        <Row className="p-3">
          <Col sm={12} md={6} lg={6} className="backgroundOfColorPrediction">
            <div
              className={`game_choice_color game_choice_Number  ${
                contentDisabled ? "disabled" : ""
              }`}
              style={{
                opacity: contentDisabled ? 0.7 : 1,
                pointerEvents: contentDisabled ? "none" : "auto",
              }}
            >
              {/* <div className="color-options number-options">
                {predefinedNumbers.map((color, index) => (
                  <button
                    key={color}
                    style={{
                      backgroundColor: contentDisabled
                        ? "#ffe7d9"
                        : buttonColors[index],
                      margin: "5px",
                      border: contentDisabled
                        ? "2px solid gray"
                        : "1.5px solid transparent",
                      color: "white",
                      fontWeight: "bold",
                      borderRadius: "50%",
                      width: "53px",
                      height: "53px",
                      boxShadow: contentDisabled
                        ? "0 0 0 2px red"
                        : `0 0 0 1px ${buttonColors[index]}`,
                      backgroundClip: "content-box",
                    }}
                    onClick={() =>
                      handleNumberSelect(color, buttonColors[index])
                    }
                    // className="game_button"
                    className={`game_button ${color === "5" ||color ==="0" ? "half-circle" : ""}`}

                    disabled={gameResult !== ""}
                  >
                    <div className={`${color === "5" ||color ==="0" ?"number-overlay" : ""}`}
>

                    {color}
                    </div>
                  </button>
                ))}
              </div> */}
              <div className="color-options number-options">
                {buttonNumbers.map((number, index) => (
                  <button
                    key={number}
                    style={{
                      backgroundColor: contentDisabled
                        ? "#ffe7d9"
                        : buttonColors[index],
                      margin: "5px",
                      border: contentDisabled
                        ? "2px solid gray"
                        : "1.5px solid transparent",
                      color: "white",
                      fontWeight: "bold",
                      borderRadius: "50%",
                      width: "53px",
                      height: "53px",
                      boxShadow: contentDisabled
                        ? "0 0 0 2px red"
                        : `0 0 0 1px ${buttonColors[index]}`,
                      backgroundClip: "content-box",
                    }}
                    onClick={() =>
                      handleNumberSelect(number, buttonColors[index])
                    }
                    className={`game_button ${
                      number === "5" || number === "0" ? "half-circle" : ""
                    }`}
                    disabled={contentDisabled || gameResult !== ""}
                  >
                    <div
                      className={`${
                        number === "5" || number === "0" ? "number-overlay" : ""
                      }`}
                    >
                      {number}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div
              className={`mt-1 game_choice_color game_choice_Number  ${
                contentDisabled ? "disabled" : ""
              }`}
              style={{
                opacity: contentDisabled ? 0.7 : 1,
                pointerEvents: contentDisabled ? "none" : "auto",
                height: "60px",
              }}
            >
              {/* <div className="color-options" style={{height:'40px !important'}}> */}
              <div
                style={{
                  display: "flex",
                  margin: "auto",
                  borderRadius: "5px",
                }}
              >
                <div className="color-options number-options">
                  {predefinedLetter.map((color, index) => (
                    <button
                      key={color}
                      style={{
                        backgroundColor: contentDisabled
                          ? "#ffe7d9"
                          : buttonColors[index],
                        margin: "4px",
                        border: contentDisabled
                          ? "2px solid gray"
                          : "1.5px solid transparent",
                        color: "white",
                        fontWeight: "bold",
                        borderRadius: "10px",
                        width: "100px",
                        height: "35px",
                        boxShadow: contentDisabled
                          ? "0 0 0 2px red"
                          : `0 0 0 1px ${buttonColors[index]}`,
                        backgroundClip: "content-box",
                      }}
                      onClick={() =>
                        handleLetterSelect(color, buttonColors[index])
                      }
                      className="game_button"
                      disabled={gameResult !== ""}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-1 betAmountMultiple">
              <Button
                variant="light"
                style={{ border: "1.4px solid black" }}
                onClick={handleRandomize}
              >
                Random
              </Button>
              <Button
                variant="dark"
                className="fw-bold m-1 button123"
                onClick={() => handleButtonClick(1)}
                style={{ border: "1px solid white" }}
              >
                1x
              </Button>
              <Button
                variant="dark"
                className="fw-bold m-1 button123"
                onClick={() => handleButtonClick(2)}
                style={{ border: "1px solid white" }}
              >
                2x
              </Button>
              <Button
                variant="dark"
                className="fw-bold m-1 button123"
                onClick={() => handleButtonClick(3)}
                style={{ border: "1px solid white" }}
              >
                3x
              </Button>
              <Button
                variant="dark"
                className="fw-bold m-1 button123"
                onClick={() => handleButtonClick(4)}
                style={{ border: "1px solid white" }}
              >
                4x
              </Button>
            </div>
            {/* </div> */}
          </Col>
        </Row>
        {/*Number-End  */}
      </Container>
      <div
        style={{
          position: "fixed",
          right: "2%",
          bottom: "5%",
          zIndex: "1000",
        }}
      >
        <div
          className={`scroll-to-top ${isVisible ? "visible" : ""}`}
          onClick={scrollToTop}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#fff",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            margin: "20px",
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/3272/3272638.png"
            height="35px"
            width="35px"
            alt="scrollToTop"
          />
        </div>
      </div>
      <OneMinuteHistory />
      {/* Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="modal-center"
      >
        <Modal.Header
          closeButton
          style={{
            background:
              userChoice.toLowerCase() ||
              userChoiceButtonNumber.toLocaleLowerCase(),
            color: "white",
            // clipPath: "polygon(71% 99%, 100% 95%, 100% 0, 0 0, 0 15%)",
            // height:'270px'
          }}
        >
          <Modal.Title>Choose Bet Amount</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <div
            style={{
              background: userChoice.toLowerCase(),
              height: "100px",
              width: "100px",
              clipPath:'polygon(0% 15%, 15% 15%, 15% 0%, 85% 0%, 85% 15%, 100% 15%, 100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%)'
            }}
          >
            {userChoice}
          </div> */}
          <Form>
            <Form.Group controlId="betAmount">
              {/* {userChoiceNumber &&<h5 className="m-2">Choosed Number: {userChoiceNumber}</h5>}  */}
              <h6 className="m-2">Balance: {profile.balance}</h6>
              <Form.Label>Enter Bet Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
              />
            </Form.Group>
          </Form>
          <div style={{ display: "flex", flexDirection: "row-reverse" }}>
            <button
              className="p-1 m-1"
              onClick={incrementBetAmount}
              style={{
                border: "none",
                borderRadius: "8px",
                width: "30px",
              }}
            >
              +
            </button>
            <button
              className="p-1 m-1"
              onClick={decrementBetAmount}
              style={{
                border: "none",
                borderRadius: "8px",
                width: "30px",
              }}
            >
              -
            </button>
            <button
              className="p-1 m-1"
              style={{
                border: "none",
                borderRadius: "8px",
                width: "30px",
              }}
              onClick={() => multiplyBetAmount(3)}
            >
              3x
            </button>
            <button
              className="p-1 m-1"
              style={{
                border: "none",
                borderRadius: "8px",
                width: "30px",
              }}
              onClick={() => multiplyBetAmount(2)}
            >
              2x
            </button>
            <button
              className="p-1 m-1"
              style={{
                border: "none",
                borderRadius: "8px",
                width: "30px",
              }}
              onClick={() => multiplyBetAmount(10)}
            >
              x
            </button>
            <img
              className="p-1 m-1"
              style={{
                width: "40px",
                height: "40px",
              }}
              onClick={resetBetAmount}
              src="https://cdn-icons-png.flaticon.com/128/9497/9497072.png"
              alt="reset"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            style={{ width: "200px" }}
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleBet}
            style={{
              background:
                userChoice.toLowerCase() ||
                userChoiceButtonNumber.toLocaleLowerCase(),
              border:
                `1.5px solid ${userChoice.toLowerCase()}` ||
                `1.5px solid ${userChoiceButtonNumber.toLowerCase()}`,
            }}
          >
            Place Bet
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Number Model */}
      <Modal
        show={showNumberModal}
        onHide={() => setShowNumberModal(false)}
        className="modal-center"
      >
        <Modal.Header
          closeButton
          style={{
            background: userChoiceButtonNumber.toLocaleLowerCase(),
            color: "white",
          }}
        >
          <Modal.Title>Choose Bet Amount</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="betAmount">
              {userChoiceNumber && (
                <h6 className="m-2">Choosed Number: {userChoiceNumber}</h6>
              )}
              <h6 className="m-2">Balance: {profile.balance}</h6>
              {/* <Form.Label>Enter Bet Amount</Form.Label> */}
              <Form.Control
                type="number"
                placeholder="Enter Bet amount"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
              />
            </Form.Group>
          </Form>
          <div style={{ display: "flex", flexDirection: "row-reverse" }}>
            <button
              className="p-1 m-1"
              onClick={incrementBetAmount}
              style={{
                border: "none",
                borderRadius: "8px",
                width: "30px",
              }}
            >
              +
            </button>
            <button
              className="p-1 m-1"
              onClick={decrementBetAmount}
              style={{
                border: "none",
                borderRadius: "8px",
                width: "30px",
              }}
            >
              -
            </button>
            <button
              className="p-1 m-1"
              style={{
                border: "none",
                borderRadius: "8px",
                width: "30px",
              }}
              onClick={() => multiplyBetAmount(3)}
            >
              3x
            </button>
            <button
              className="p-1 m-1"
              style={{
                border: "none",
                borderRadius: "8px",
                width: "30px",
              }}
              onClick={() => multiplyBetAmount(2)}
            >
              2x
            </button>
            <button
              className="p-1 m-1"
              style={{
                border: "none",
                borderRadius: "8px",
                width: "30px",
              }}
              onClick={() => multiplyBetAmount(10)}
            >
              x
            </button>
            <img
              className="p-1 m-1"
              style={{
                width: "40px",
                height: "40px",
              }}
              onClick={resetBetAmount}
              src="https://cdn-icons-png.flaticon.com/128/9497/9497072.png"
              alt="reset"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => setShowNumberModal(false)}
            style={{ width: "150px" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleBet}
            style={{
              background: userChoiceButtonNumber.toLocaleLowerCase(),
              border: `1.5px solid ${userChoiceButtonNumber.toLowerCase()}`,
              width: "150px",
            }}
          >
            Place Bet
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Number Model */}
      {/* Number Model */}
      <Modal
        show={showLetterModal}
        onHide={() => setShowLetterModal(false)}
        className="modal-center"
      >
        <Modal.Header
          closeButton
          style={{
            background: userChoiceButtonNumber.toLocaleLowerCase(),
            color: "white",
          }}
        >
          <Modal.Title>Choose Bet Amount</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="betAmount">
              {userChoiceLetter && (
                <h6 className="m-2">Choosed Letter: {userChoiceLetter}</h6>
              )}
              <h6 className="m-2">Balance: {profile.balance}</h6>
              {/* <Form.Label>Enter Bet Amount</Form.Label> */}
              <Form.Control
                type="number"
                placeholder="Enter Bet amount"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
              />
            </Form.Group>
          </Form>
          <div style={{ display: "flex", flexDirection: "row-reverse" }}>
            <button
              className="p-1 m-1"
              onClick={incrementBetAmount}
              style={{
                border: "none",
                borderRadius: "8px",
                width: "30px",
              }}
            >
              +
            </button>
            <button
              className="p-1 m-1"
              onClick={decrementBetAmount}
              style={{
                border: "none",
                borderRadius: "8px",
                width: "30px",
              }}
            >
              -
            </button>
            <button
              className="p-1 m-1"
              style={{
                border: "none",
                borderRadius: "8px",
                width: "30px",
              }}
              onClick={() => multiplyBetAmount(3)}
            >
              3x
            </button>
            <button
              className="p-1 m-1"
              style={{
                border: "none",
                borderRadius: "8px",
                width: "30px",
              }}
              onClick={() => multiplyBetAmount(2)}
            >
              2x
            </button>
            <button
              className="p-1 m-1"
              style={{
                border: "none",
                borderRadius: "8px",
                width: "30px",
              }}
              onClick={() => multiplyBetAmount(10)}
            >
              x
            </button>
            <img
              className="p-1 m-1"
              style={{
                width: "40px",
                height: "40px",
              }}
              onClick={resetBetAmount}
              src="https://cdn-icons-png.flaticon.com/128/9497/9497072.png"
              alt="reset"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => setShowLetterModal(false)}
            style={{ width: "150px" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleBet}
            style={{
              background: userChoiceButtonNumber.toLocaleLowerCase(),
              border: `1.5px solid ${userChoiceButtonNumber.toLowerCase()}`,
              width: "150px",
            }}
          >
            Place Bet
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Number Model */}
    </div>
  );
};

export default ColorPridictionGame1;
