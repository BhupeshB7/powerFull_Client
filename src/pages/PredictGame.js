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
import support from "../assets/support.png";
import spinner from "../assets/spinner2.gif";
import QRCODE from "../assets/QRCODE3.jpg";
import LOGO from "../assets/icon.png";
import sound from "../assets/audio.mp3";
import Rewards from "./Rewards";
import GameWithdrawal from "./Game/GameWithdrawal";
const PredictGame = ({ contactInfoList }) => {
  // const [targetColor, setTargetColor] = useState("");
  // const [targetNumber, setTargetNumber] = useState("");
  // const [targetLetter, setTargetLetter] = useState("");
  // const [userChoice, setUserChoice] = useState("");
  // const [userChoiceNumber, setUserChoiceNumber] = useState("");
  // const [userChoiceLetter, setUserChoiceLetter] = useState("");
  // const [userChoiceButtonNumber, setUserChoiceButtonNumber] = useState("");
  // const [gameResult, setGameResult] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showNumberModal, setShowNumberModal] = useState(false);
  const [showLetterModal, setShowLetterModal] = useState(false);
  const [betAmount, setBetAmount] = useState(0);
  // const [winningAmount, setWinningAmount] = useState("");
  const [profile, setProfile] = useState({});
  const [time, setTime] = useState(60);
  const [contentDisabled, setContentDisabled] = useState(false);
  const [timerBlink, setTimerBlink] = useState(false);
  // const predefinedColors = ["Blueviolet", "Red", "Green"];
  // const predefinedLetter = ["Small", "Big"];
  const predefinedColors1 = ["green", "orange", "purple"];
  const predefinedNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);
  const [depositHistory, setDepositHistory] = useState([]);
  const [isTokenValid, setIsTokenValid] = useState(true);
  const [data, setData] = useState([]);
  const [gameData, setGameData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [buttonColors, setButtonColors] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [multiplicationFactor, setMultiplicationFactor] = useState(1);
  const [notices, setNotices] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const token1 = localStorage.getItem("token");

  const userId = localStorage.getItem("GamerUserId");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://mlm-psi.vercel.app/api/game/withdrawal/profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token1}`,
            },
          }
        );
        // console.log(response.data);
        setGameData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchData();
  }, [token1]);
  const handleShowDeposit = () => {
    window.location.href = "/depositform/game";
  };

  //   useEffect(() => {
  //     if (time === 5) {
  //       // Start the audio when time is equal to 5
  //       audio.play();
  //     } else if (time === 0) {
  //       // Stop and reset the audio when time is equal to 0
  //       audio.pause();
  //       audio.currentTime = 0;
  //     }
  //   }, [time, audio]);
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
    fetch("https://mlm-psi.vercel.app/api/notice/v1")
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
    userId: gameData.userId,
    name: gameData.accountHolderName,
    amount: "",
    UPI: gameData.GPay,
    accountNo: gameData.accountNo,
    IFSCCODE: gameData.IFSCCODE,
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
    console.log("gameData:", gameData);
    console.log("formData1:", formData1);
      setFormData1({
        ...formData1,
        [name]: value,
      });
    
  };
  

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
        "https://mlm-psi.vercel.app/api/depositSubmit",
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
    // console.log("gameData:", gameData);
  console.log("formData1:", formData1);
  console.log("Form submitted with data:", formData1);
  alert("Form submitted with data:", formData1);
    if (formData1.amount < 110) {
      alert("Minimum Withdrawal Amount is 110");
      return;
    }
    e.preventDefault();
    try {
      const response = await fetch(
        "https://mlm-psi.vercel.app/api/withdrawalSubmit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData1 }),
        }
      );

      if (response.ok) {
        alert("Withdrawal request submitted successfully");
      } else {
        const responseData = await response.json();
        handleWithdrawalError(responseData);
      }
    } catch (error) {
      console.error(error);
      alert("Error submitting withdrawal request. Please try again.");
    }
  };

  const handleWithdrawalError = (responseData) => {
    if (responseData.message === "Insufficient Balance") {
      alert("Insufficient Balance. Please check your wallet.");
    } else if (
      responseData.error === "Withdrawal not allowed before 11 AM." ||
      responseData.error === "Withdrawal not allowed after 3 PM."
    ) {
      alert(responseData.error);
    } else {
      alert("Error submitting withdrawal request. Please try again.");
    }
  };

  // const fetchGameHistory = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://mlm-psi.vercel.app/api/game/history/${userId}`
  //     );
  //     setGameHistory(response.data);
  //   } catch (error) {
  //     console.error(`Error fetching game history: ${error}`);
  //   }
  // };

  // useEffect(() => {
  //   fetchGameHistory();
  // }, [userId]);

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

  const fetchWithdrawalHistory = async () => {
    try {
      const response = await axios.get(
        `https://mlm-psi.vercel.app/api/history/${data.userId}`
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
        `https://mlm-psi.vercel.app/api/deposit/history/${data.userId}`
      );
      setDepositHistory(response.data);
    } catch (error) {
      console.error(`Error fetching game history: ${error}`);
    }
  };

  useEffect(() => {
    fetchDepositHistory();
  }, [data.userId]);

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
        setTimerBlink(false);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

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
  }, [data.userId]);

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

  const handleGamePlay = () => {
    window.location.href = "/game/colorpridiction/1minutes";
  };
  // function WithLabelExample() {
  return (
    <>
      {isTokenValid ? (
        <>
          <div className="colorbackGround predictGame">
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
                <GameWithdrawal gameData={gameData}/>
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
    Income <br /> {profile.totalwin ? Number(profile.totalwin.toFixed(2)) : 0} ₹
</b>
{" "}
                  {/* <p className="text-secondary">Income </p> */}
                </div>
              </div>
            </div>
            {/* <div className="game_welcome">
              <img src={welcome} height="100px" width="130px" alt="welcome" />
            </div> */}

            <Container>
              <h6 className="text-light mt-3">Welcome Back,{profile.name}</h6>
              <h6 className="text-warning p-2">Have a Good Luck 👍</h6>
              <Row>
                <Col
                  sm={12}
                  className="d-flex justify-content-center align-items-center"
                >
                  <Button
                    className="m-2"
                    variant="warning"
                    onClick={handleGamePlay}
                  >
                    Start a New Game{" "}
                  </Button>
                </Col>
              </Row>
            </Container>
            
            <Rewards />
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
                {/* <Link to={`https://wa.me/${contactInfoList.mobile}/?text=Hi`}>
                  <ImWhatsapp
                    className="contact-svg"
                    style={{
                      height: "35px",
                      width: "35px",
                      color: "green",
                      margin: "auto",
                    }}
                  />
                </Link> */}
                <Link to={`https://wa.me/${contactInfoList.mobile}/?text=Hi`}>
                  <img
                    src={support} // Replace this with the path to your local image
                    alt="WhatsApp"
                    height="56px"
                    width="56px"
                    className="contact-img" // Add any additional styling classes if needed
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
                              <a
                                className=" dropdown-item"
                                href="/depositform/game"
                              >
                                Deposit
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item "
                                href="/withdrawalform/game"
                              >
                                Account Update
                              </a>
                            </li>
                            <li>
                              <a
                                href="#staticBackdrop2"
                                className="dropdown-item"
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop2"
                              >
                                Withdrawal
                              </a>
                            </li>
                            <li>
                              <a
                                href="#staticBackdrop3"
                                className="dropdown-item"
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop3"
                              >
                                Withdrawal History
                              </a>
                            </li>
                            <li>
                              <a
                                href="#staticBackdrop4"
                                className="dropdown-item"
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop4"
                              >
                                Deposit History
                              </a>
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
                    className="modal-content topUPBg1"
                    style={{ maxHeight: "750px" }}
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
                          placeholder="UserId"
                          value={ formData1.userId}
                          onChange={handleChange1}
                          disabled={gameData ? true : false}
                          // disabled
                          required
                          className="Game_withdrawal_form"
                        />
                        <label>Name:</label>
                        <input
                          type="text"
                          name="name"
                          placeholder="Name"
                          value={formData1.name}
                          onChange={handleChange1}
                          disabled={gameData ? true : false}
                          required
                          className="Game_withdrawal_form"
                        />

                        <label>Amount:</label>
                        <input
                          type="number"
                          name="amount"
                          placeholder="Amount"
                          value={formData1.amount}
                          onChange={handleChange1}
                          required
                          className="Game_withdrawal_form"
                        />
                        <label>UPI:</label>
                        <input
                          type="text"
                          name="GPay"
                          placeholder="Payment UPI "
                          value={formData1.UPI}
                          onChange={handleChange1}
                          disabled={gameData ? true : false}
                          required
                          className="Game_withdrawal_form"
                        />
                        <br />
                        <label>Account No:</label>
                        <input
                          type="text"
                          name="accountNo"
                          placeholder="Account No"
                          value={formData1.accountNo }
                          onChange={handleChange1}
                          disabled={gameData ? true : false} // Disable the input if gameData is available
                          required
                          className="Game_withdrawal_form"
                        />

                        <br />
                        <label>IFSCCODE</label>
                        <input
                          type="text"
                          name="IFSCCODE"
                          placeholder="IFSCCODE..."
                          value={formData1.IFSCCODE}
                          onChange={handleChange1}
                          disabled={gameData ? true : false}
                          required
                          className="Game_withdrawal_form"
                        />
                        <br />
                        <p className="text-light m-1">
                          <b className="text-danger">Note:</b>Please, Updated
                          with own Details{" "}
                        </p>
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
                            <th>Account No</th>
                            <th>IFSC CODE</th>
                            <th>status</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {withdrawalHistory.map((withdrawal, index) => (
                            <tr key={index}>
                              <td className="text-info">{index + 1}</td>
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
                              <td className="text-success">
                                {withdrawal.accountNo}
                              </td>
                              <td className="text-success">
                                {withdrawal.IFSCCODE}
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
                              <td className="text-info">{index + 1}</td>
                              <td className="text-primary">
                                {withdrawal.name}
                              </td>
                              <td className="text-secondary">
                                {withdrawal.userId}
                              </td>
                              <td className="text-warning">
                                {withdrawal.depositAmount}
                              </td>
                              <td
                                className={
                                  withdrawal.isApproved
                                    ? "text-success"
                                    : "text-danger"
                                }
                              >
                                {withdrawal.isApproved ? "Approved" : "Pending"}
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

export default PredictGame;
