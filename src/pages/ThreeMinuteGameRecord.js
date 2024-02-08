import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Table } from "react-bootstrap";

const ThreeMinuteGameRecord = ({ userId }) => {
  const [userDetails, setUserDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [lastPage, setLastPage] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `https://cute-puce-xerus.cyclic.app/api/gameProfile/userDetails3/${userId}/${currentPage}`
        );
        setUserDetails(response.data.userResults);
        setTotalPages(response.data.totalPages);
        setLastPage(response.data.userResults.length === 0);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserDetails();

    // Polling mechanism to fetch data every 10 seconds (adjust as needed)
    const pollingInterval = setInterval(() => {
      fetchUserDetails();
    }, 10000); // 10 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(pollingInterval);
  }, [userId, currentPage]);

  const handleShow = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const formatTimestampToIST = (timestamp) => {
    const date = new Date(timestamp);
  
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata'
    };
  
    return date.toLocaleString("en-IN", options);
  };

  return (
    <div>
      {/* Show Game Record button */}
      <Button variant="warning" onClick={handleShow}>
        Game Record
      </Button>

      {/* React Bootstrap Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton className="gameRecord">
          <Modal.Title>Game Record of {userId}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="gameRecord">
          {/* Display user details in a table */}
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr className="text-light">
                  <th>Session</th>
                  <th>Selected</th>
                  <th>Achiever</th>
                  <th>Amount</th>
                  <th>Result</th>
                  <th style={{ width: "270px" }}>Time</th>
                </tr>
              </thead>
              <tbody>
                {userDetails.map((userDetail) => (
                  <tr key={userDetail._id}>
                    <td className="text-warning">{userDetail.sessionId}</td>
                    <td className="text-primary">{userDetail.userChoice}</td>
                    <td className="text-info">{userDetail.winningChoice}</td>
                    <td
                      style={{
                        color: userDetail.result === "failed" ? "red" : "green",
                      }}
                    >
                      {userDetail.result === "failed" ? "-" : "+"}{" "}
                      {userDetail.betAmount}
                    </td>
                    <td
                      style={{
                        color: userDetail.result === "failed" ? "red" : "green",
                      }}
                    >
                      {userDetail.result}
                    </td>
                    <td
                      className="text-light game_record-time"
                      style={{ width: "160px", minWidth: "250px" }}
                    >
                      {formatTimestampToIST(userDetail.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <div className=" mt-3 d-flex align-items-center justify-content-center">
            {/* Pagination controls */}
            <Button
              variant="dark"
              className="m-1"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <h6 className="m-2">{currentPage} / {totalPages} </h6>
            <Button
              variant="dark"
              className="m-1"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage ===totalPages}
            >
              Next
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer className="gameRecord">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ThreeMinuteGameRecord;
