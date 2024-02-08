// src/App.js

import React, { useState } from "react";
import { Button } from "react-bootstrap";
import NavbarComponent from "./NavbarComponent";

function GameBalanceUpdate() {
  const [userId, setUserId] = useState("");
  const [userDetails, setUserDetails] = useState({
    name: "",
    balance: "",
    totalwin: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [dataAvailable, setDataAvailable] = useState(false);
  const handleGetDetails = async () => {
    try {
      const response = await fetch(
        `https://cute-puce-xerus.cyclic.app/api/game/gamer/profile/${userId}`
      );
      const data = await response.json();
      if (Object.keys(data).length === 0) {
        // Data not available
        setDataAvailable(false);
      } else {
        setUserDetails(data);
        setDataAvailable(true);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
  const handleInputChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };
  const handleUpdateDetails = async () => {
    try {
      const response = await fetch(
        `https://cute-puce-xerus.cyclic.app/api/game/gamer/profile/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            balance: userDetails.balance,
            totalwin: userDetails.totalwin,
          }),
        }
      );
      const data = await response.json();
      setUserDetails(data);
      setIsEditMode(false);
      alert("Success");
    } catch (error) {
      alert("Error: " + error.message);
      console.error("Error updating user details:", error);
    }
  };

  return (
    <div style={{ background: "#000", height: "100vh" }}>
      <NavbarComponent />
      <div className="GamerComponent">
        {isEditMode ? (
          <>
            <div className="gamer-form">
              <h2>Update Details</h2>
              <label>
                Name:<br/>
                <input
                  type="text"
                  value={userDetails.name}
                  name="name"
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Balance:<br/>
                <input
                  type="text"
                  name="balance"
                  value={userDetails.balance}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Total Win:<br/>
                <input
                  type="text"
                  name="totalwin"
                  value={userDetails.totalwin}
                  onChange={handleInputChange}
                />
              </label>
              <Button
                  variant="dark" className="m-1" style={{width:'150px'}}
                  onClick={() => setIsEditMode(!isEditMode)}
                >
                  {isEditMode ? "Cancel" : "update"}
                </Button>
              <Button variant="dark" style={{width:'150px'}} className="m-1" onClick={handleUpdateDetails}>Save</Button>
            </div>
          </>
        ) : (
          <>
            <h4 className="text-secondary mt-3">Gamer Profile Details</h4>
            <input
              placeholder="Enter userId..."
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
            <Button variant="dark" disabled={!userId} onClick={handleGetDetails}>
              Get Details
            </Button>
            {dataAvailable ? (
              <div className="details d-flex justify-content-center align-items-center">
                <div className="balance_update">
                <h6 className="text-info">User Details</h6>
                <h6>Name: {userDetails.name}</h6>
                <h6>Balance: {userDetails.balance}</h6>
                <h6>Total win: {userDetails.totalwin}</h6>
                <Button
                  variant="dark" style={{width:'160px'}}
                  onClick={() => setIsEditMode(!isEditMode)}
                >
                  {isEditMode ? "Cancel" : "Update"}
                </Button>
                </div>
                
              </div>
            ) : (
              <p>Data not available</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default GameBalanceUpdate;
