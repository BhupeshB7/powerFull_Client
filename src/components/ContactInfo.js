// App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container } from 'react-bootstrap';

const ContactInfo = () => {
  const [userDetails, setUserDetails] = useState({
    email: '',
    mobile: '',
    telegramLink: '',
    whatsAppGroupLink: '',
    whatsAppNumber: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // Fetch user details on component mount
    axios.get('https://mlm-eo5g.onrender.com/api/contactInfo').then((response) => setUserDetails(response.data));
  }, []);

  const handleInputChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Determine whether to send a POST or PUT request
    const requestMethod = 'post';

    // Send request to save/update user details
    axios[requestMethod]('https://mlm-eo5g.onrender.com/api/contactInfo', userDetails).then(() => {
      setIsEditMode(false);
    });
  };

  return (
    <Container>
      <h1 className='text-center text-light'>Update Info</h1>
      {isEditMode ? (
        <div>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={userDetails.email}
            onChange={handleInputChange}
          />
          <br />
          <label>Mobile:</label>
          <input
            type="text"
            name="mobile"
            value={userDetails.mobile}
            onChange={handleInputChange}
          />
          <br />
          <label>Telegram Link:</label>
          <input
            type="text"
            name="telegramLink"
            value={userDetails.telegramLink}
            onChange={handleInputChange}
          />
          <br />
          <label>WhatsApp Group Link:</label>
          <input
            type="text"
            name="whatsAppGroupLink"
            value={userDetails.whatsAppGroupLink}
            onChange={handleInputChange}
          />
          <br />
          <label>WhatsApp Number:</label>
          <input
            type="text"
            name="whatsAppNumber"
            value={userDetails.whatsAppNumber}
            onChange={handleInputChange}
          />
          <br />
        </div>
      ) : (
        <div>
          <p>Email: {userDetails.email}</p>
          <p>Mobile: {userDetails.mobile}</p>
          <p>Telegram Link: {userDetails.telegramLink}</p>
          <p>WhatsApp Group Link: {userDetails.whatsAppGroupLink}</p>
          <p>WhatsApp Number: {userDetails.whatsAppNumber}</p>
        </div>
      )}
      <Button variant='primary' onClick={() => setIsEditMode(!isEditMode)}>
        {isEditMode ? 'Cancel' : 'Edit'}
      </Button>
      {isEditMode && <Button variant='warning' onClick={handleSave}>Save</Button>}
    </Container>
  );
};

export default ContactInfo;
