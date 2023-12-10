import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Container, Row, Button, Form, Modal } from "react-bootstrap";
import io from "socket.io-client";
import spinner from "../assets/spinner2.gif";

const socket = io("http://localhost:5000");
const ColorPredictGame = () => {
  // State variables
  const [time, setTime] = useState(120);
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
  //   const [message, setMessage] = useState('');
  const [show, setShow] = useState(true); // Set show to true initially

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    // This effect runs when the component mounts
    handleShow(); // Show the modal when the component mounts
  }, []); // Empty dependency array ensures that the effect runs only once


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
  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("testEvent", (data) => {
      console.log("Test event received:", data);
      // setMessage(data.message);
    });

    socket.on("timerUpdate", (update) => {
      // console.log("Timer update received:", update);
      setTimer(update.countdown);
    
      if (update.countdown === 59) {
        console.log("Countdown is 59. Invoking handleTimerEnd()");
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
    socket.on("initialData", (data) => {
      setRealTimeData(data);
    });

    // Event listener for new data
    socket.on("newData", (data) => {
      setRealTimeData(data);
    });

    // Event listener for timer countdown
    socket.on("timerCountdown", (countdown) => {
      setTimerCountdown(countdown);
    });
         
    // Clean up the event listeners when the component unmounts
    return () => {
      socket.off("initialData");
      socket.off("newData");
      socket.off("timerCountdown");
    };
  }, []);
  // Constants
  const predefinedColors = ["Violet", "Red", "Green"];
  const predefinedLetter = ["Small", "Big"];
  const predefinedNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
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

  // Functions
  const handleBet = async() => {
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
      console.log(userChoice);
      console.log(userChoiceNumber);
      console.log(userChoiceLetter);
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
    if (betAmount === 0) {
      setBetAmount(1);
    } else {
      setBetAmount(betAmount * multiplier);
    }
  };
  const handleTimerEnd = async() => {
    // Retrieve user choices from local storage
    const userChoice = localStorage.getItem("userChoice");
    const userChoiceNumber = localStorage.getItem("userChoiceNumber");
    const userChoiceLetter = localStorage.getItem("userChoiceLetter");
    const betAmount = localStorage.getItem("betAmount");
        console.log(userChoiceLetter);
        console.log(betAmount);
        console.log(realTimeData.letter);
        console.log(realTimeData.number);
        console.log(realTimeData.color);
    // Check for matches
    if (
      userChoice === realTimeData.color ||
      userChoiceNumber === realTimeData.number ||
      userChoiceLetter === realTimeData.letter
    ) {
      let multiplier = 1;

      // Determine multiplier based on the type of match
      if (
        userChoice === realTimeData.color ||
        userChoiceLetter === realTimeData.letter
      ) {
        multiplier = 2;
      } else if (userChoiceNumber === realTimeData.number) {
        multiplier = 4;
      }

      // Update balance
      const currentBalance = parseFloat(localStorage.getItem("betAmount")) ||0;
      const winnings = currentBalance * multiplier; // Adjust the multiplier as needed
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

         alert(winnings);
      // Remove user choices from local storage
      localStorage.setItem("balance", winnings.toString());
   
    }
    localStorage.removeItem("userChoice");
    localStorage.removeItem("userChoiceNumber");
    localStorage.removeItem("userChoiceLetter");
    localStorage.removeItem("betAmount");

    // Update the balance in local storage
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
    window.location.href = "/game/colorpridiction";
  };
  return (
    <div className="threeMinuteGame">
     <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div className="text-primary">
          Please, do not make any bet , Because it's working ... After sometime Try again... <br/>
          <b className="text-success">Thank You</b>
         </div>
         <h6 className="text-secondary">
          <b className="text-danger">Note: </b>If yoy place your bet at this moment then Powerfull India will not be responsible
         </h6>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>Understood</Button>
        </Modal.Footer>
      </Modal>
       <div className="game_box">
              <div
                className="d-flex justify-content-center  align-items-center buttonDW"
                style={{ flexDirection: "row", background: "transparent" }}
              >
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
                  <b className="text-light">Income <br/> {profile.totalwin} ₹</b>{" "}
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
                          src="https://cdn-icons-png.flaticon.com/128/9758/9758679.png"
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
                        {timer <= 5 ? (
                          <div className="blur-background">
                            <div
                              className="remaining"
                              style={{ display: "flex" }}
                            >
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
                          {/* <p className="text-warning">{uniqueId}</p> */}
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
                             00: {" "}{timer} S remaining
                            </b>
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

export default ColorPredictGame;
