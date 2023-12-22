import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Table } from "react-bootstrap";

const UserGameRecord = ({ userId }) => {
  const [userDetails, setUserDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [lastPage, setLastPage] = useState(false); 
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `https://mlm-production.up.railway.app/api/gameProfile/userDetails/${userId}/${currentPage}`
        );
        setUserDetails(response.data);
        setLastPage(response.data.length === 0);
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
    return date.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" });
  };

  return (
    <div>
      {/* Show Game Record button */}
      <Button variant="warning" onClick={handleShow}>
        Game Record
      </Button>

      {/* React Bootstrap Modal */}
      <Modal show={showModal} onHide={handleClose} >
        <Modal.Header closeButton className='gameRecord'>
          <Modal.Title>User Game Record</Modal.Title>
        </Modal.Header>
        <Modal.Body className='gameRecord'>
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
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {userDetails.map((userDetail) => (
                  <tr key={userDetail._id}>
                    <td className="text-warning">{userDetail.session}</td>
                    <td className="text-primary">{userDetail.userChoice}</td>
                    <td className="text-info">{userDetail.choice}</td>
                    <td
                      style={{
                        color: userDetail.result === "failed" ? "red" : "green",
                      }}
                    >
                      {userDetail.result === "failed" ? "-" : "+"}{" "}
                      {userDetail.amount}
                    </td>
                    <td
                      style={{
                        color: userDetail.result === "failed" ? "red" : "green",
                      }}
                    >
                      {userDetail.result}
                    </td>
                    <td className="text-light">{formatTimestampToIST(userDetail.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <div className=" mt-3 d-flex align-items-center justify-content-center">
            {/* Pagination controls */}
            <Button variant="dark" className='m-1'
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <h6 className="m-2">{currentPage} </h6>
            <Button variant="dark" className='m-1' onClick={() => setCurrentPage(currentPage + 1)} disabled={lastPage}>
            Next
          </Button>
          </div>
        </Modal.Body>
        <Modal.Footer className='gameRecord'>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserGameRecord;
