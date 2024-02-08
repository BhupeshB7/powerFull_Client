// UserProfileModal.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';

const ContactInfoModal = ({ showModal, closeModal, userData, setUserData }) => {
  const [formData, setFormData] = useState({
    email: '',
    mobileNo: '',
    telegramGroupLink: '',
    whatsAppGroupLink: '',
    whatsAppNumber: '',
  });

  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateClick = () => {
    setIsUpdateMode(true);
  };

  const handleSave = async () => {
    try {
      // Validation - Add your validation logic here

      // Update user data
      const updatedUserData = await axios.put('https://cute-puce-xerus.cyclic.app/api/users/update', formData);
      setUserData([updatedUserData.data.userUpdated]);
      setIsUpdateMode(false);
      closeModal();
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  useEffect(() => {
    setFormData({
      email: userData.email || '',
      mobileNo: userData.mobileNo || '',
      telegramGroupLink: userData.telegramGroupLink || '',
      whatsAppGroupLink: userData.whatsAppGroupLink || '',
      whatsAppNumber: userData.whatsAppNumber || '',
    });
  }, [userData]);

  return (
    <Modal className="modal" show={showModal}>
      <form>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          readOnly={!isUpdateMode}
          required
        />

        <label>Mobile No:</label>
        <input
          type="text"
          name="mobileNo"
          value={formData.mobileNo}
          onChange={handleChange}
          readOnly={!isUpdateMode}
        />

        <label>Telegram Group Link:</label>
        <input
          type="text"
          name="telegramGroupLink"
          value={formData.telegramGroupLink}
          onChange={handleChange}
          readOnly={!isUpdateMode}
        />

        <label>WhatsApp Group Link:</label>
        <input
          type="text"
          name="whatsAppGroupLink"
          value={formData.whatsAppGroupLink}
          onChange={handleChange}
          readOnly={!isUpdateMode}
        />

        <label>WhatsApp Number:</label>
        <input
          type="text"
          name="whatsAppNumber"
          value={formData.whatsAppNumber}
          onChange={handleChange}
          readOnly={!isUpdateMode}
        />

        {isUpdateMode ? (
          <button type="button" onClick={handleSave}>
            Save
          </button>
        ) : (
          <button type="button" onClick={handleUpdateClick}>
            Update
          </button>
        )}

        <button type="button" onClick={closeModal}>
          Cancel
        </button>
      </form>
    </Modal>
  );
};

export default ContactInfoModal;
