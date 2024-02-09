import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Col, Container, Row, Button, Form, Modal } from "react-bootstrap";
import LOGO from "../assets/icon.png";
import spinner from "../assets/spinner2.gif";
import OneMinuteHistory from "./OneMinuteHistory";
import UserGameRecord from "./UserGameRecord";
import sound from "../assets/audio.mp3";
const ColorPridictionGame1 = () => {
  // State variables
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
  const [remainingTime, setRemainingTime] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [sessionInfo, setSessionInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [audio, setAudio] = useState(new Audio(sound));
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false); // New state to track user interaction

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime === 10) {
          playSound();
        }
        if (prevTime === 0) {
          clearInterval(timer);
          stopSound();
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const playSound = () => {
    if (hasInteracted && !isMuted) {
      // Check if user has interacted and is not muted
      audio.play();
    }
  };

  const stopSound = () => {
    audio.pause();
    audio.currentTime = 0;
  };

  const toggleMute = () => {
    if (audio.paused) {
      playSound();
      setIsMuted(false);
    } else {
      stopSound();
      setIsMuted(true);
    }
  };

  const handleInteraction = () => {
    setHasInteracted(true); // Set hasInteracted to true when user interacts
    playSound(); // Attempt to play sound after interaction
  };

  const fetchSessionInfo = async () => {
    try {
      const response = await axios.get(
        "https://mlm-psi.vercel.app/getLatestSession"
      );
      setSessionInfo(response.data);
    } catch (error) {
      console.error("Error fetching session info:", error);
      setError("Refresh The Page");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch data initially
    fetchSessionInfo();

    // Fetch updated data every 10 seconds
    const intervalId = setInterval(fetchSessionInfo, 1 * 1000);

    // Cleanup interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);
  const fetchTimer = async () => {
    try {
      const response = await axios.get(
        `https://mlm-psi.vercel.app/api/user/getTimer/${sessionInfo.sessionId}`
      );
      setRemainingTime(response.data.time);
    } catch (error) {
      console.error(error);
      // Handle error (optional)
    }
  };

  useEffect(() => {
    // Fetch timer data initially
    fetchTimer();

    // Set up an interval to fetch updated data every 5 seconds (adjust as needed)
    const intervalId = setInterval(fetchTimer, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [sessionInfo.sessionId]); // Add sessionId as a dependency

  useEffect(() => {
    // Set isBlinking to true when remaining time is 10 seconds or less
    setIsBlinking(remainingTime <= 10);

    // Create a timer to update remaining time every second
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Clear the timer when the component unmounts
    return () => clearInterval(timer);
  }, [remainingTime]);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  const timerStyle = {
    color: isBlinking ? "red" : "white",
    fontSize: "23px",
    fontWeight: "bold",
  };
  const timerStyle1 = {
    color: isBlinking ? "red" : "white",
    fontSize: "76px",
    fontWeight: "bold",
  };
  //save time

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
          "https://mlm-psi.vercel.app/api/users/profile",
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
  const predefinedColors = ["Violet", "Red", "Green"];
  const predefinedLetter = ["Small", "Big"];
  // const predefinedNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const predefinedColors1 = ["green", "red", "violet"];

  const getGamerProfile = async () => {
    try {
      const response = await axios.get(
        `https://mlm-psi.vercel.app/api/gameProfile/${data.userId}`
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

    // Set up an interval to fetch gamer profile every 30 seconds
    const intervalId = setInterval(() => {
      getGamerProfile();
    }, 30000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
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
    // Check if the remainingTime is less than 7, and update the showModal state accordingly
    if (remainingTime < 7) {
      setShowModal(false);
      setShowLetterModal(false);
      setShowNumberModal(false);
    }
  }, [remainingTime]);
  // Listen to the scroll event to show/hide the button
  useEffect(() => {
    // Fetch data initially
    if (remainingTime === 2) {
      try {
        const response = axios.post(
          "https://mlm-psi.vercel.app/oneMinuteuserResult",
          {
            sessionId: sessionInfo.sessionId,
            userId: data.userId,
          }
        );
      } catch (error) {
        console.error(error);
      }
    }
  }, [remainingTime]);
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
      alert(remainingTime, sessionInfo.sessionId, data.userId);
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

      // Calculate 2.1% of betAmount
      const reducedBetAmount = betAmount - (betAmount * 2.1) / 100;

      localStorage.setItem("userChoiceColor", userChoice);
      localStorage.setItem("userChoiceNumber", userChoiceNumber);
      localStorage.setItem("userChoiceLetter", userChoiceLetter);
      localStorage.setItem("betAmount", reducedBetAmount);
      // Close the modal after placing the bet
      setShowNumberModal(false);
      setShowLetterModal(false);
      setShowModal(false);
      alert(`Bet Place SuccessFully! of ${betAmount} Rs.`);
      try {
        const response = await axios.post(
          "https://mlm-psi.vercel.app/oneMinuteHistory",
          {
            userId: data.userId,
            betAmount: reducedBetAmount,
            sessionId: sessionInfo.sessionId,
            userChoice: userChoice,
            userChoiceLetter: userChoiceLetter,
            userChoiceNumber: userChoiceNumber,
          }
        );
      } catch (error) {
        console.error(error);
        throw error;
      }
      try {
        const response = await axios.post(
          "https://mlm-psi.vercel.app/api/gameProfile/startGame",
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
    if (remainingTime < 40) {
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

  const gameId = localStorage.getItem("GameUserId");

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
    <div className="threeMinuteGame colorbackGround" onClick={handleInteraction}>
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
              Income <br />{" "}
              {profile.totalwin ? Number(profile.totalwin.toFixed(2)) : 0} ₹
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
                  {remainingTime <= 28 ? (
                    <div className="blur-background">
                      <div className="remaining" style={{ display: "flex" }}>
                      
                        <h1
                          className="text-danger"
                          style={{ fontSize: "66px", fontWeight: "bold" }}
                        >
                          <Button variant="dark" className="p-2 m-1" onClick={toggleMute} style={{ fontSize: "20px", fontWeight: "bold" }}>
                            {audio.paused ? "Unmute" : "Mute"}
                          </Button>
                          {/* {`00:${timer.toString().padStart(2, "0")}`} */}
                          <p className="text-center text-light">
                            <b style={timerStyle1}>
                              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                            </b>{" "}
                          </p>
                        </h1>
                      </div>
                    </div>
                  ) : null}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* new session */}
                    <div>
                      {loading ? (
                        <p>Loading...</p>
                      ) : error ? (
                        <p className="text-danger">{error}</p>
                      ) : (
                        <>
                          <p className="text-warning">
                            {" "}
                            {sessionInfo.sessionId}
                          </p>
                        </>
                      )}
                    </div>
                    {/* new session */}
                    {/* <p className="text-warning">{session}</p> */}
                    {/* <p className="text-warning">{newSessionNumber}</p> */}
                    <h1 style={{ color: "#bbb" }}>
                      {" "}
                      <b
                        style={
                          remainingTime <= 1
                            ? {
                                display: "none",
                                fontSize: "30px !important",
                              }
                            : timerStyle
                        }
                      >
                        {/* {formattedMinutes}:{formattedSeconds} */}
                        <p className="text-center text-light">
                          <b style={timerStyle}>
                            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                          </b>{" "}
                          (MM:SS)
                        </p>
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
      <Container>
        <UserGameRecord userId={gameId} />
      </Container>
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
