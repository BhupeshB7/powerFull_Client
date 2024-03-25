import React, { useEffect, useState } from "react";
import {  Container } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import Modal from "react-modal";
import rewardImage from "./../../assets/rewardImage.png"
const Award = () => {
  const [code, setCode] = useState("");
  const [randomNumber, setRandomNumber] = useState(null);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("GamerUserId");
  // const [giftRewards, setGiftRewards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [countdown, setCountdown] = useState(8);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  const handleCheckCode = async () => {
    setLoading(true);
    try {
      // const response = await fetch("http://localhost:5000/api/gift/checkCode", {
      const response = await fetch(
        "https://mlm-eo5g.onrender.com/api/gift/checkCode",
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
      // setIsValid(true);
      setRandomNumber(data.randomNumber);
      setError("");
      setLoading(false);
      setModalIsOpen(true);
      setCountdown(8);
    } catch (error) {
      // setIsValid(false);
      setRandomNumber(null);
      setError(error.message);
      setLoading(false);
      setModalIsOpen(false);
    } finally {
      setLoading(false);
    }
  };

   useEffect(() => {
    let timer;

    if (modalIsOpen) {
      // Start timer when modal is opened
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => {
      // Clear the timer when modal is closed or component unmounts
      clearInterval(timer);
    };
  }, [modalIsOpen]);

  useEffect(() => {
    if (countdown === 0) {
      // Close the modal when countdown reaches 0
      setModalIsOpen(false);
    }
  }, [countdown]);

  // const openModal = () => {
  //   setModalIsOpen(true);
  //   setCountdown(8); // Reset countdown when modal is opened
  // };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleClose=()=>{
    setModalIsOpen(false);
  }
  return (
    <Container>
      {modalIsOpen?(<>

      </>):(<>
        <div className="award_container">
        {/* <p className="text-center  text-dark"><b style={{fontSize:'30px'}}>😔</b> Sorry,No any Awards/Rewards Available</p> */}
        <p className="text-center mt-3" style={{ color: "brown" }}>
          Claim Your Rewards
        </p>
        <div>
          <div>
            <div className="input_container">
              <label className="award-text">Code</label> <br />
              <input
                type="text"
                value={code}
                placeholder="Enter Your Code"
                onChange={(e) => setCode(e.target.value)}
                style={{width:'210px'}}
              />
            </div>
            <button
              className="button-83 text-center reward_button"
              style={{ borderRadius: "none" }} onClick={handleCheckCode}
            >
              {loading?'Checking':'Check'}
            </button>
            {/* <button onClick={openModal}>Open Model</button> */}
            <div>
            {error && (
                    <h6
                    style={{
                      background: "rgb(255, 179, 179)",
                      color: "brown",
                      borderRadius: "7px",
                      padding:'5px',
                      width:'230px'
                    }}>
                      {error}
                    </h6>
                  )}
            </div>
            {/* <div>{randomNumber}</div> */}
          </div>
        </div>
      </div>
      </>)}
     
      {/* Modal */}
      <Modal
            className="ModalOverlay"
            overlayClassName="Overlay"
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
           
            contentLabel="All Reward Details"
          >
            <div className="ModalContent reward_content">
            <div className="CloseButton" onClick={handleClose}>
              <FaTimes />
            </div>
            <div className="reward_autoclose">Auto close within {countdown}  seconds.</div>
            <div className="reward_image mt-5">
              {/* <img style={{borderRadius:'10px'}} height={300} width={300} src={rewardImage} alt="ico" /> */}
            </div>
            <div className="rewards_text">{randomNumber}Rs</div>
            <div className="rewards_textP">PowerFull India</div>
            {/* <div className="rewards_text"></div> */}
            </div>
          </Modal>
    </Container>
  );
};

export default Award;
