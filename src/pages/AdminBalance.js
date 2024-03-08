// App.js

import React, { useState } from 'react';
import axios from 'axios';
import { Button, Alert } from 'react-bootstrap';

function AdminBalance() {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');
  const [isUpdateDisabled, setIsUpdateDisabled] = useState(true);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  const searchUser = async () => {
    try {
      const response = await axios.get(`https://mlm-eo5g.onrender.com/api/game/balance/${userId}`);
      setName(response.data.name);
      setIsUpdateDisabled(false);
      setAlert({ show: false, type: '', message: '' }); // Reset alert state
    } catch (error) {
      console.error(error);
      setName('User not found');
      setIsUpdateDisabled(true);
      setAlert({ show: true, type: 'danger', message: 'User not found' });
    }
  };

  const updateBalance = async () => {
    try {
      if (!balance || isNaN(balance)) {
        setAlert({ show: true, type: 'danger', message: 'Balance should be a valid number' });
        return;
      }

      await axios.put(`https://mlm-eo5g.onrender.com/api/game/balance/${userId}`, { balance });
      setAlert({ show: true, type: 'success', message: 'Balance updated successfully' });
      // Optionally, you can fetch and display the updated user details
    } catch (error) {
      console.error(error);
      console.log(error);
      setAlert({ show: true, type: 'danger', message: 'Failed to update balance' });
    }
  };

  return (
    <div className='Update_Balance '>
      <h5>User Balance Update...</h5>
      <div className='p-2'>
        <label className='text-light'>Enter User ID:</label><br />
        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
        <Button variant='primary' className='m-1' onClick={searchUser}>
          Search
        </Button>

        <p>Name: {name}</p>

        <label className='text-light'>Enter Balance:</label><br />
        <input
          type="text"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          disabled={isUpdateDisabled}
          required
        />
        <Button
          variant='success'
          className='m-1'
          onClick={updateBalance}
          disabled={isUpdateDisabled}
        >
          Update Balance
        </Button>

        {isUpdateDisabled && (
          <Alert variant="info" className='AlertBalance' onClose={() => setAlert({ show: false, type: '', message: '' })} dismissible>
            Button is disabled
          </Alert>
        )}

        {alert.show && (
          <Alert variant={alert.type} className='AlertBalance' onClose={() => setAlert({ show: false, type: '', message: '' })} dismissible>
            {alert.message}
          </Alert>
        )}
      </div>
    </div>
  );
}

export default AdminBalance;
