import React, { useState } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';

const TeamStructureModal = () => {
  const [userId, setUserId] = useState('');
  const [activeUsersByLevel, setActiveUsersByLevel] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [isValid, setIsValid] = useState(true);
  const [loading, setLoading] = useState(false); // State to control loading spinner
  const levelCounts = [1, 10, 70, 350, 800, 2000];
  const levelRanks = [
    "Fresher",
    "Bronze",
    "Silver",
    "Gold",
    "Royal Star",
    "Diamond",
  ];
  
  const fetchTeamStructure = () => {
    if (!userId.trim()) {
      setIsValid(false);
      return;
    }
    setLoading(true); // Show loading spinner
    axios
      .get(`https://mlm-eo5g.onrender.com/api/users/teamStructure/${userId}`)
      .then((response) => {
        setActiveUsersByLevel(response.data);
        setShowModal(true); // Show modal after fetching team structure
        setLoading(false); // Hide loading spinner
      })
      .catch((error) => {
        console.error("Error fetching team structure:", error);
        setLoading(false); // Hide loading spinner
      });
  };

  return (
    <div className='bonanza-container mt-3'>
      <h6 className='text-primary'>Check user Team structure</h6>
      <div className='teamStructure_user'>
      <input
        type="text"
        value={userId}
        onChange={(e) => {
          setUserId(e.target.value);
          setIsValid(true); // Reset validation state when input changes
        }}
        placeholder="Enter User ID"
        required // adding the required attribute
        className={!isValid ? "is-invalid" : ""} // Add Bootstrap's is-invalid class when input is not valid
      />
      {!isValid && <div className="invalid-feedback">Please enter a User ID</div>}
      {/* <button className='btn-grad' onClick={fetchTeamStructure}>Check</button> */}
      <button className={loading ? 'btn btn-grad loading' : 'btn btn-grad'} onClick={fetchTeamStructure} disabled={loading}>
        {loading ? <Spinner animation="border" size="sm" className="me-2" /> : null} {/* Spinner only shown when loading */}
        Check
      </button>
      </div>
      {/* Loading spinner */}
      {/* {loading && <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>} */}
      
      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} className=""
            overlayClassName="Overlay">
              <div className="teamStructure_background">
        <Modal.Header closeButton>
          <Modal.Title>TEAM STRUCTURE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-bordered">
            <thead className="fw-300">
              <tr className="text-light">
                <th>S.No</th>
                <th>Level</th>
                <th>Active</th>
                <th style={{ width: "60px" }}>InActive</th>
                <th>Target Team</th>
                <th>Rank</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(activeUsersByLevel).map((level, index) => (
                <tr key={level}>
                  <td className="text-warning text-center">{index + 1}</td>
                  <td className="text-center" style={{ color: "#fccb90" }}>{level}</td>
                  <td className="text-light text-center">{activeUsersByLevel[level].active}</td>
                  <td className="text-center" style={{ color: "#fccb90" }}>{activeUsersByLevel[level].inactive}</td>
                  <td className="text-light text-center">{levelCounts[index]}</td>
                  <td className="text-center" style={{ color: "#fccb90" }}>{levelRanks[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
};

export default TeamStructureModal;
