import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  Button,
  Form,
  Modal,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { ImWhatsapp } from "react-icons/im";
import welcome from "../assets/gameWelcome.png";
import spinner from "../assets/spinner2.gif";
import QRCODE from "../assets/QRCODE3.jpg";
import LOGO from "../assets/icon.png";
import sound from "../assets/audio.mp3";
const NewGame = ({ contactInfoList }) => {
  const [targetColor, setTargetColor] = useState("");
  const [targetNumber, setTargetNumber] = useState("");
  const [targetLetter, setTargetLetter] = useState("");
  const [userChoice, setUserChoice] = useState("");
  const [userChoiceNumber, setUserChoiceNumber] = useState("");
  const [userChoiceLetter, setUserChoiceLetter] = useState("");
  const [userChoiceButtonNumber, setUserChoiceButtonNumber] = useState("");
  const [gameResult, setGameResult] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showNumberModal, setShowNumberModal] = useState(false);
  const [showLetterModal, setShowLetterModal] = useState(false);
  const [betAmount, setBetAmount] = useState(0);
  const [winningAmount, setWinningAmount] = useState("");
  const [profile, setProfile] = useState({});
  const [time, setTime] = useState(60);
  const [audio, setAudio] = useState(new Audio(sound));
  const [uniqueId, setUniqueId] = useState(generateUniqueId());
  const [contentDisabled, setContentDisabled] = useState(false);
  const [timerBlink, setTimerBlink] = useState(false);
  const predefinedColors = ["Blueviolet", "Red", "Green"];
  const predefinedLetter = ["Small", "Big"];
  const predefinedColors1 = ["green", "orange", "purple"];
  const predefinedNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);
  const [depositHistory, setDepositHistory] = useState([]);
  const [isTokenValid, setIsTokenValid] = useState(true);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [buttonColors, setButtonColors] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [multiplicationFactor, setMultiplicationFactor] = useState(1);
  const [notices, setNotices] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShowDeposit = () => {
    window.location.href = "/depositform/game";
  };

  useEffect(() => {
    if (time === 5) {
      // Start the audio when time is equal to 5
      audio.play();
    } else if (time === 0) {
      // Stop and reset the audio when time is equal to 0
      audio.pause();
      audio.currentTime = 0;
    }
  }, [time, audio]);
  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Adds smooth scrolling animation
    });
  };

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
  useEffect(() => {
    fetch("https://mlm-production.up.railway.app/api/notice/v1")
      .then((response) => response.json())
      .then((data) => setNotices(data));
  }, []);

  useEffect(() => {
    // Generate random colors when the component is initially rendered
    const randomColors = predefinedNumbers.map(() => {
      const randomIndex = Math.floor(Math.random() * predefinedColors1.length);
      return predefinedColors1[randomIndex];
    });

    setButtonColors(randomColors);
  }, []); // The empty dependency array ensures this effect runs only once

  const openMessageModal = () => {
    setShowMessageModal(true);
  };

  const closeMessageModal = () => {
    setShowMessageModal(false);
  };
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
  useEffect(() => {
    if (isTokenExpired()) {
      setIsTokenValid(false);
      // redirect to homepage
      window.location.href = "/login";
    }
  }, []);
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    amount: "",
    UTR: "",
  });
  const [formData1, setFormData1] = useState({
    userId: "",
    name: "",
    amount: "",
    UPI: "",
  });
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
        // const userLevel = getUserLevel(result.level);
        // setLevel(userLevel);

        if (result.role) {
          const userrole = result.role;

          if (userrole === "admin") {
            localStorage.setItem("check", "nfwnwen");
          }
        }
        if (result.userId) setData(result);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [token]);
  // const userId = "PI17218169";

  const handleSubmit = async (e) => {
    if (formData.amount < 100) {
      alert("Minimum Withdrawal Amount 100");
      return;
    }
    e.preventDefault();
    try {
      const response = await fetch(
        "https://mlm-production.up.railway.app/api/depositSubmit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, type: "Deposit" }), // Set type to 'Deposit'
        }
      );

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
    if (formData1.amount < 110) {
      alert("Minimum Withdrawal Amount 110");
      return;
    }
    e.preventDefault();
    try {
      const response = await fetch(
        "https://mlm-production.up.railway.app/api/withdrawalSubmit",
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
  // const fetchGameHistory = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://mlm-production.up.railway.app/api/game/history/${userId}`
  //     );
  //     setGameHistory(response.data);
  //   } catch (error) {
  //     console.error(`Error fetching game history: ${error}`);
  //   }
  // };

  // useEffect(() => {
  //   fetchGameHistory();
  // }, [userId]);

  const [gameHistory, setGameHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const handleButtonClick = (multiplier) => {
    if (betAmount === 0) {
      setBetAmount(1);
    } else {
      setBetAmount(betAmount * multiplier);
    }
  };
  const pageSize = 20; // Set the page size (items per page)
  const handleAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };
  const fetchGameHistory = async (page) => {
    try {
      const response = await axios.get(
        `https://mlm-production.up.railway.app/api/game/history/${data.userId}?page=${page}`
      );
      const {
        page: currentPage,
        itemsPerPage,
        totalPages,
        gameHistory,
      } = response.data;

      setCurrentPage(currentPage);
      setTotalPages(totalPages);
      setGameHistory(gameHistory);
    } catch (error) {
      console.error(`Error fetching game history: ${error}`);
    }
  };

  useEffect(() => {
    fetchGameHistory(currentPage);
  }, [data.userId, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const fetchWithdrawalHistory = async () => {
    try {
      const response = await axios.get(
        `https://mlm-production.up.railway.app/api/history/${data.userId}`
      );
      setWithdrawalHistory(response.data);
    } catch (error) {
      console.error(`Error fetching game history: ${error}`);
    }
  };

  useEffect(() => {
    fetchWithdrawalHistory();
  }, [data.userId]);
  const fetchDepositHistory = async () => {
    try {
      const response = await axios.get(
        `https://mlm-production.up.railway.app/api/deposit/history/${data.userId}`
      );
      setDepositHistory(response.data);
    } catch (error) {
      console.error(`Error fetching game history: ${error}`);
    }
  };

  useEffect(() => {
    fetchDepositHistory();
  }, [data.userId]);

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * predefinedColors.length);
    return predefinedColors[randomIndex];
  };
  const getRandomNumber = () => {
    const randomIndex = Math.floor(Math.random() * predefinedNumbers.length);
    return predefinedNumbers[randomIndex];
  };
  const getRandomLetter = () => {
    const randomIndex = Math.floor(Math.random() * predefinedLetter.length);
    return predefinedLetter[randomIndex];
  };
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     if (time > 0) {
  //       setTime(time - 1);
  //       if (time <= 10) {
  //         setContentDisabled(true);
  //       }
  //     } else {
  //       setTime(60);
  //       setContentDisabled(false);
  //       setUniqueId(generateUniqueId()); // Generate a new random 4-digit number for the unique ID
  //     }
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, [time]);
  useEffect(() => {
    const timer = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
        if (time <= 5) {
          setTimerBlink(true);
          setContentDisabled(true);
          setShowModal(false);
          setShowNumberModal(false);
          setShowLetterModal(false);
        } else {
          setTimerBlink(false);
        }
        if (time === 1) {
          setContentDisabled(false);
        }
      } else {
        setTime(60);
        setContentDisabled(false);
        setUniqueId(generateUniqueId());
        setTimerBlink(false);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

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
  useEffect(() => {
    if (!targetColor || !targetNumber || !targetLetter) {
      setTargetColor(getRandomColor());
      setTargetNumber(getRandomNumber());
      setTargetLetter(getRandomLetter());
    }
  }, [targetColor, targetNumber, targetLetter]);

  const handleColorSelect = (color) => {
    setUserChoice(color);
    setShowModal(true);
  };
  const handleNumberSelect = (color, buttonColor) => {
    setUserChoiceNumber(color);
    setUserChoiceButtonNumber(buttonColor);
    setShowNumberModal(true);
  };
  const handleLetterSelect = (letter, buttonColor) => {
    setUserChoiceLetter(letter);
    setUserChoiceButtonNumber(buttonColor);
    setShowLetterModal(true);
  };
  const handleBet = async () => {
    if (betAmount < 1) {
      handleAlert("Bet Amount Should be greater than 1Rs.😌");
      setShowModal(false);
      setShowNumberModal(false);
      setShowLetterModal(false);
      return;
    } else if (betAmount > profile.balance) {
      handleAlert("Insufficient Balance");
      setShowModal(false);
      setShowNumberModal(false);
      setShowLetterModal(false);
      return;
    } else {
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

      if (
        userChoice === targetColor ||
        userChoiceNumber === targetNumber ||
        userChoiceLetter === targetLetter
      ) {
        // const winnings = betAmount * 1.25;
        let winnings;
        if (userChoice === targetColor) {
          winnings = betAmount * 2;
        } else if (userChoiceNumber === targetNumber) {
          winnings = betAmount * 4;
        } else if (userChoiceLetter === targetLetter) {
          winnings = betAmount * 2;
        }
        setWinningAmount(winnings);
        setGameResult(`You Win ₹ ${winnings}`);
        try {
          const response = await axios.post(
            "https://mlm-production.up.railway.app/api/gameProfile/winningGame",
            {
              userId: data.userId, // Make sure userId is defined or passed as a prop
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

        // Perform any necessary actions to update the user's balance or wallet for a win
      } else {
        setGameResult("You Lose");
        // Perform any necessary actions for a loss
      }
    }
    // console.log(winningAmount);
    const gameDetails = {
      userId: data.userId, // Make sure userId is defined or passed as a prop
      // entryFee: betAmount,

      targetColor: targetColor,
      targetLetter: targetLetter,
      chosenColor: targetNumber,
      result: uniqueId,
    };

    try {
      const response = await axios.post(
        "https://mlm-production.up.railway.app/api/game/saveGame",
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

    // Reset the game after 10 seconds
    setTimeout(() => {
      setGameResult("");
      setUserChoice("");
      setUserChoiceNumber("");
      setUserChoiceLetter("");
      setBetAmount(0);
      setTargetColor(getRandomColor());
      setTargetLetter(getRandomLetter());
      setTargetNumber(getRandomNumber());
    }, 3000); // 10 seconds in milliseconds
  };
  function generateUniqueId() {
    const now = new Date();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const hour = now.getHours().toString().padStart(2, "0");
    const minute = now.getMinutes().toString().padStart(2, "0");
    const randomDigits = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number
    return `${month}${day}-${hour}${minute}-${randomDigits}`;
  }
  const timerStyle = {
    fontSize: timerBlink && time <= 5 ? "40px" : "19px",
    color: timerBlink && time <= 5 ? "red" : "white",
    animation: timerBlink && time <= 5 ? "blink 1s infinite" : "none",
  };
  // Function to shuffle an array in place

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
  //
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
  const handleLive = () => {
    window.location.href = "/game/colorpridiction/live";
  };
  const handleLive2 = () => {
    window.location.href = "/game/colorpridiction/3minutes";
  };
  const handleLive1 = () => {
    window.location.href = "/game/colorpridiction";
  };
  // function WithLabelExample() {
  return (
    <>
      {isTokenValid ? (
        <>
          <div className="colorbackGround">
            <div className="alert">
              {showAlert && (
                <Alert
                  variant="danger"
                  onClose={() => setShowAlert(false)}
                  dismissible
                >
                  <Alert.Heading>Error</Alert.Heading>
                  <p>{alertMessage}</p>
                </Alert>
              )}
            </div>
            <div className="logo">
              <img src={LOGO} alt="logo" height="70px" width="100px" />
            </div>

            <div className="game_box">
              <div
                className="d-flex justify-content-center  align-items-center buttonDW"
                style={{ flexDirection: "row", background: "transparent" }}
              >
                <Button
                  variant="outline-warning"
                  className="m-1 text-warning p-2"
                  style={{
                    borderRadius: "20px",
                    width: "110px",
                  }}
                  onClick={handleShowDeposit}
                >
                  Deposit
                </Button>
                <Button
                  variant="outline-warning"
                  className="m-1"
                  style={{ borderRadius: "20px" }}
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop2"
                >
                  Withdraw
                </Button>
              </div>
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
            {/* <div className="game_welcome">
              <img src={welcome} height="100px" width="130px" alt="welcome" />
            </div> */}
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
            <Container className="pt-5">
              <Row style={{ display: "flex", flexDirection: "row-reverse" }}>
                <Col sm={12} md={6} lg={6} className="game_session">
                  <div>
                    <h6 className="text-light p-2" style={{ textAlign: "end" }}>
                      Game Session
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
                        {time <= 5 ? (
                          <div className="blur-background">
                            <div
                              className="remaining"
                              style={{ display: "flex" }}
                            >
                              <h1
                                className="text-danger"
                                style={{ fontSize: "66px", fontWeight: "bold" }}
                              >{`00:${time.toString().padStart(2, "0")}`}</h1>
                            </div>
                          </div>
                        ) : null}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p className="text-warning">{uniqueId}</p>
                          <h1 style={{ color: "#bbb" }}>
                            {" "}
                            <b
                              style={
                                time <= 5
                                  ? {
                                      display: "none",
                                      fontSize: "30px !important",
                                    }
                                  : timerStyle
                              }
                            >
                              {" "}
                              00: {time}
                            </b>
                            s &nbsp;{" "}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col sm={12} md={6}>
                  <div>
                    <h6 className="p-2 text-warning">Predict a Color</h6>
                  </div>
                </Col>
              </Row>
              <Row className="p-3">
                <Col
                  sm={12}
                  md={6}
                  lg={6}
                  className={`game_choice_color ${
                    contentDisabled ? "disabled" : ""
                  }`}
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
                        className="game_button text-light"
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
                <Col
                  sm={12}
                  md={6}
                  lg={6}
                  className="backgroundOfColorPrediction"
                >
                  <div
                    className={`game_choice_color game_choice_Number  ${
                      contentDisabled ? "disabled" : ""
                    }`}
                    style={{
                      opacity: contentDisabled ? 0.7 : 1,
                      pointerEvents: contentDisabled ? "none" : "auto",
                    }}
                  >
                    <div className="color-options number-options">
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
                          className="game_button"
                          disabled={gameResult !== ""}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* <div className="mt-2" style={{display:'flex', width:'90%', justifyContent:'space-around', gap:'30px', margin:'auto', backgroundImage:'linear-gradient(-20deg, #d558c8 0%, #24d292 100%)',borderRadius:'5px'}}>
                    <Button variant="light" className="m-1 text-success fw-bold" style={{width:'100px', borderRadius:'30px'}}>Up</Button>
                    <Button variant="success" className="m-1" style={{width:'130px', borderRadius:'30px'}}>Down</Button>
                   </div> */}
                  <div
                    className={`mt-1 game_choice_color game_choice_Number  ${
                      contentDisabled ? "disabled" : ""
                    }`}
                    style={{
                      opacity: contentDisabled ? 0.7 : 1,
                      pointerEvents: contentDisabled ? "none" : "auto",
                      height: "50px",
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
                      variant="secondary"
                      className="fw-bold m-1"
                      onClick={() => handleButtonClick(1)}
                    >
                      1x
                    </Button>
                    <Button
                      variant="primary"
                      className="fw-bold m-1"
                      onClick={() => handleButtonClick(2)}
                    >
                      2x
                    </Button>
                    <Button
                      variant="success"
                      className="fw-bold m-1"
                      onClick={() => handleButtonClick(3)}
                    >
                      3x
                    </Button>
                    <Button
                      variant="danger"
                      className="fw-bold m-1"
                      onClick={() => handleButtonClick(4)}
                    >
                      4x
                    </Button>
                  </div>
                  {/* </div> */}
                </Col>
              </Row>
              {/*Number-End  */}
            </Container>

            <div className="table-responsive" style={{ marginTop: "10px" }}>
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
                    <th>Session</th>
                    <th>Number</th>
                    <th>Color</th>
                    <th>Size</th>
                  </tr>
                </thead>
                <tbody
                  style={{ color: "#FFD700" }}
                  className="table-hover text-center"
                >
                  {gameHistory && gameHistory.length > 0 ? (
                    gameHistory.map((game, index) => (
                      <tr key={index}>
                        {/* <td>{index + 1}</td> */}
                        <td>{game.result}</td>
                        {/* <td>{game.chosenColor}</td> */}
                        <td style={{ color: game.targetColor }}>
                          {game.chosenColor}
                        </td>
                        <td>
                          <div
                            style={{
                              backgroundColor: game.targetColor,
                              width: "25px",
                              height: "25px",
                              borderRadius: "50%",
                            }}
                          ></div>
                        </td>
                        <td style={{ color: game.targetColor }}>
                          {game.targetLetter}
                        </td>
                        {/* <td>{new Date(game.createdAt).toLocaleDateString()}</td> */}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No game history available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
              {/* Pagination */}
              <div className="pagination d-flex justify-content-center align-items-center pb-2" style={{marginTop:'-5px', background:'#0234'}}>
                <Button
                  variant="dark"
                  className="m-1"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                {/* Display page number and items per page information */}
                <div className="text-light">
                  {currentPage} <b className="text-warning">/</b> {totalPages}
                </div>
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
            <div className="notification-area">
              <div className="notification">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/2058/2058148.png"
                  height="35px"
                  width="40px"
                  alt="notification"
                  onClick={openMessageModal}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#fff",
                  borderRadius: "50%",
                  width: "55px",
                  height: "55px",
                  margin: "20px",
                  textAlign: "center",
                }}
              >
                <Link to={`https://wa.me/${contactInfoList.mobile}/?text=Hi`}>
                  <ImWhatsapp
                    className="contact-svg"
                    style={{
                      height: "35px",
                      width: "35px",
                      color: "green",
                      margin: "auto",
                    }}
                  />
                </Link>
              </div>
              {/*  */}
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
              {/*  */}
            </div>
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
                <Button variant="danger" onClick={() => setShowModal(false)}>
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
                      <h6 className="m-2">
                        Choosed Number: {userChoiceNumber}
                      </h6>
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
                      <h6 className="m-2">
                        Choosed Letter: {userChoiceLetter}
                      </h6>
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
            <div>
              <Modal show={showMessageModal} onHide={closeMessageModal}>
                <Modal.Header
                  closeButton
                  style={{
                    background: "blueViolet",
                    color: "white",
                    border: "1.7px solid blueViolet",
                  }}
                >
                  <Modal.Title>Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <ul>
                    {notices && notices.length > 0 ? (
                      notices.map((notice, index) => (
                        <li key={notice._id} style={{ listStyle: "none" }}>
                          <h6>
                            {index + 1}. &nbsp; &nbsp;{notice.text}
                          </h6>
                          <div
                            style={{
                              display: "flex",
                              width: "100%",
                              justifyContent: "space-between",
                              margin: "auto",
                            }}
                          >
                            <h6>
                              {new Date(notice.timestamp).toLocaleDateString()}
                            </h6>
                          </div>
                        </li>
                      ))
                    ) : (
                      <h6>No Message</h6>
                    )}
                  </ul>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    onClick={closeMessageModal}
                    style={{ background: "blueViolet" }}
                  >
                    Cancel
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
            <div>
              <div className="bottom_section " style={{ marginTop: "100px" }}>
                <div
                  className="row footer_row_content"
                  style={{
                    height: "90px",
                    color: "cyan",
                    background: "#000427",
                  }}
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
                              <a href="/depositform/game">Deposit</a>
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
              <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                tabIndex={-1}
                className="topUPBg"
                style={{ maxHeight: "500px !important" }}
              >
                <Modal.Header
                  closeButton
                  className="bgDepositHeader"
                  style={{ maxHeight: "70px" }}
                >
                  <Modal.Title className="fs-5 text-warning">
                    Deposit
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body className="bgDepositGame">
                  <div
                    className="image"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <img
                      src={QRCODE}
                      height="200px"
                      width="200px"
                      alt=""
                      style={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid black",
                      }}
                    />
                  </div>
                  <h6 className="text-info">
                    UPI: powerfullindia849@khdfcbank
                  </h6>
                  <form onSubmit={handleSubmit} className="deposit_Form">
                    <label>UserId:</label>
                    <input
                      type="text"
                      name="userId"
                      value={formData.userId}
                      onChange={handleChange}
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
                    <label>UTR:</label>
                    <input
                      type="text"
                      name="UTR"
                      placeholder="UTR"
                      value={formData.UTR}
                      onChange={handleChange}
                      required
                    />
                    <br />
                    <button
                      type="submit"
                      className="btn btn-warning"
                      style={{ borderRadius: "20px" }}
                    >
                      Submit
                    </button>
                  </form>
                </Modal.Body>
              </Modal>

              {/* Deposit End */}

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
                  <div
                    className="modal-content topUPBg"
                    style={{ maxHeight: "600px" }}
                  >
                    <div className="modal-header">
                      <h1
                        className="modal-title fs-5 text-warning"
                        id="staticBackdropLabel"
                      >
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
                      <form
                        onSubmit={handleSubmitWithdrawal}
                        className="deposit_Form"
                      >
                        <label>UserId:</label>
                        <input
                          type="text"
                          name="userId"
                          value={formData1.userId}
                          placeholder="UserId"
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
                        <button type="submit" className="btn btn-warning">
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
                              <td className="text-primary">
                                {withdrawal.name}
                              </td>
                              <td className="text-secondary">
                                {withdrawal.userId}
                              </td>
                              <td className="text-warning">
                                {withdrawal.amount}
                              </td>
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
                                {new Date(
                                  withdrawal.createdAt
                                ).toLocaleDateString()}
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
                              <td className="text-primary">
                                {withdrawal.name}
                              </td>
                              <td className="text-secondary">
                                {withdrawal.userId}
                              </td>
                              <td className="text-warning">
                                {withdrawal.amount}
                              </td>
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
                                {new Date(
                                  withdrawal.createdAt
                                ).toLocaleDateString()}
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
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default NewGame;
