// App.js

import React, { useState, useRef } from "react";
import axios from "axios";
import { Alert, Button } from "react-bootstrap";
import ButtonToggle from "./ButtonToggle";
import LiveGameTimer from "./LiveGameTimer";
import LiveGameTimerShow from "./LiveGameTimerShow";

const generateSessionId = () => {
  
  const getCurrentDate = () =>
    (new Date().getDate() + 1).toString().padStart(2, "0");
  const getCurrentTimeDigits = () =>
    new Date()
      .toLocaleTimeString("en-US", { hour12: false })
      .replace(/[:]/g, "")
      .slice(0, 4);

  const timePart = getCurrentTimeDigits();
  const date = getCurrentDate();
  return `PILIVE-${date}${timePart}`;
};

const AdminLiveGame = () => {
  const formRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedNumber, setSelectedNumber] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const newSessionId = generateSessionId();
  
  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleNumberChange = (number) => {
    setSelectedNumber(number);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleSubmit = () => {
    // Check if all selections are made
    if (selectedColor && selectedNumber && selectedSize) {
      // Send the data to the backend along with the session ID
      axios
        .post("https://cute-puce-xerus.cyclic.app/api/saveSelection", {
          sessionId: newSessionId,
          color: selectedColor,
          number: selectedNumber,
          size: selectedSize,
        })
        .then((response) => {
          setAlertMessage(response.data.message);
          // Reset the selections after successful submission
          setSelectedColor("");
          setSelectedNumber("");
          setSelectedSize("");
          // Reset the form using the ref
          formRef.current.reset();
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((error) => {
          setAlertMessage("An error occurred while saving the selection.");
        });
    } else {
      setAlertMessage("Please select one color, one number, and one size");
    }
  };

  const handleReset = () => {
    formRef.current.reset();
    window.location.reload();
  };

  return (
    
      <div className="p-2">
      {/* Render Alert component if there is a message */}
      {alertMessage && (
        <Alert
          variant="info"
          dismissible
          style={{ position: "absolute", top: "10px" }}
        >
          {alertMessage}
        </Alert>
      )}
      <ButtonToggle/>
      <LiveGameTimer/>
      <LiveGameTimerShow/>
      <form className="LiveGameDashboard p-2" ref={formRef}>
        <div>
          <p>Session ID: {newSessionId}</p>
        </div>
        <h6 className="text-dark">Choose your Prediction</h6>
        <div>
          <label>
            <input
              type="radio"
              name="size"
              onChange={() => handleSizeChange("Small")}
            />{" "}
            Small
          </label>
          <label>
            <input
              type="radio"
              name="size"
              onChange={() => handleSizeChange("Big")}
            />{" "}
            Big
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="color"
              onChange={() => handleColorChange("Red")}
            />{" "}
            Red
          </label>
          <label>
            <input
              type="radio"
              name="color"
              onChange={() => handleColorChange("Green")}
            />{" "}
            Green
          </label>
          <label>
            <input
              type="radio"
              name="color"
              onChange={() => handleColorChange("BlueViolet")}
            />{" "}
            BlueViolet
          </label>
        </div>
        <div>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <label key={num}>
              <input
                type="radio"
                name="number"
                onChange={() => handleNumberChange(num)}
              />{" "}
              {num}
            </label>
          ))}
        </div>
        <div className="d-flex justify-content-center align-items-center">
        <Button variant="success" className="m-1" onClick={handleSubmit}>
          Submit
        </Button>
        <Button variant="primary" className="p-1 m-2" onClick={handleReset}>
          Reset
        </Button>
        </div>
        
      </form>
    </div>

  );
};

export default AdminLiveGame;
