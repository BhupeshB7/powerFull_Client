import React, { useEffect, useState } from "react";
import { Container,Button } from "react-bootstrap";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import Modal from "react-modal";
const Award = () => {
  const [code, setCode] = useState("");
  const [randomNumber, setRandomNumber] = useState(null);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("GamerUserId");
  const [giftRewards, setGiftRewards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingAward, setLoadingAward] = useState(false);
  const [modalRewardIsOpen, setModalRewardIsOpen] = useState(false);
  const [countdown, setCountdown] = useState(8);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://mlm-eo5g.onrender.com/api/gift/gift-rewards/mlm/${userId}?page=${currentPage}`,
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
    fetchData(); 
  }, [userId, currentPage]);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleCheckCode = async () => {
    setLoadingAward(true);
    try {
      // const response = await fetch("http://localhost:5000/api/gift/checkCode", {
      const response = await fetch(
        "https://mlm-eo5g.onrender.com/api/gift/checkCode/mlm",
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
      setLoadingAward(false);
      setModalRewardIsOpen(true);
      setCountdown(8);
    } catch (error) {
      // setIsValid(false);
      setRandomNumber(null);
      setError(error.message);
      setLoadingAward(false);
      setModalRewardIsOpen(false);
    } finally {
      setLoadingAward(false);
    }
  };

  useEffect(() => {
    let timer;

    if (modalRewardIsOpen) {
      // Start timer when modal is opened
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => {
      // Clear the timer when modal is closed or component unmounts
      clearInterval(timer);
    };
  }, [modalRewardIsOpen]);

  useEffect(() => {
    if (countdown === 0) {
      // Close the modal when countdown reaches 0
      setModalRewardIsOpen(false);
    }
  }, [countdown]);

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeHistoryModal = () => {
    setModalIsOpen(false);
  };
  const closeModal = () => {
    setModalRewardIsOpen(false);
  };

  const handleClose = () => {
    setModalRewardIsOpen(false);
  };
  return (
    <Container>
      {modalRewardIsOpen ? (
        <></>
      ) : (
        <>
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
                    style={{ width: "210px" }}
                  />
                </div>
                <div className="award_history-check">
                  <button
                    className="button-83 text-center reward_button"
                    style={{ borderRadius: "none" }}
                    onClick={handleCheckCode}
                  >
                    {loadingAward ? "Checking" : "Check"}
                  </button>

                  <button
                    className="button-83 text-center reward_button"
                    style={{ borderRadius: "none" }}
                    onClick={openModal}
                  >
                    {loading ? "Loading" : "History"}
                  </button>
                </div>

                {/* <button onClick={openModal}>Open Model</button> */}
                <div>
                  {error && (
                    <h6
                      style={{
                        background: "rgb(255, 179, 179)",
                        color: "brown",
                        borderRadius: "7px",
                        padding: "5px",
                        width: "230px",
                      }}
                    >
                      {error}
                    </h6>
                  )}
                </div>
                {/* <div>{randomNumber}</div> */}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Modal */}
      <Modal
        className="ModalOverlay"
        overlayClassName="Overlay"
        isOpen={modalRewardIsOpen}
        onRequestClose={closeModal}
        contentLabel="All Reward Details"
      >
        <div className="ModalContent reward_content">
          <div className="CloseButton" onClick={handleClose}>
            <FaTimes />
          </div>
          <div className="reward_autoclose">
            Auto close within {countdown} seconds.
          </div>
          <div className="reward_image mt-5">
            {/* <img style={{borderRadius:'10px'}} height={300} width={300} src={rewardImage} alt="ico" /> */}
          </div>
          <div className="rewards_text">{randomNumber}Rs</div>
          <div className="rewards_textP">PowerFull India</div>
          {/* <div className="rewards_text"></div> */}
        </div>
      </Modal>

      {/* Hostory MOdal  */}
      <Modal
            className="ModalOverlay"
            overlayClassName="Overlay"
            isOpen={modalIsOpen}
            onRequestClose={closeHistoryModal}
           
            contentLabel="All Reward Details"
          >
            <div className="ModalContent">
            <div className="CloseButton" onClick={closeHistoryModal}>
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
    </Container>
  );
};

export default Award;
