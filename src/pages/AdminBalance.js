// App.js

import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

function AdminBalance() {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');
  const [isUpdateDisabled, setIsUpdateDisabled] = useState(true);

  const searchUser = async () => {
    try {
      const response = await axios.get(`https://mlm-production.up.railway.app/api/game/balance/${userId}`);
      setName(response.data.name);
      setIsUpdateDisabled(false); // Enable the "Update Balance" button when the name is available
    } catch (error) {
      console.error(error);
      setName('User not found');
      setIsUpdateDisabled(true);
    }
  };

  const updateBalance = async () => {
    try {
      await axios.put(`https://mlm-production.up.railway.app/api/balance/${userId}`, { balance });
      // Optionally, you can fetch and display the updated user details
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='Update_Balance mb-5'>
      <h5>User Balance Update...</h5>
      <div>
      <label className='text-light'>
        Enter User ID:
      </label><br/>
        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
      <Button variant='primary' className='m-1' onClick={searchUser}>Search</Button>
      
        <p>Name: {name}</p>
        <label className='text-light'>
          Enter Balance:
          </label> <br/>
          <input
            type="text"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            disabled={isUpdateDisabled}
            required
          />
       
      </div>
        <Button variant='success' className='m-1' onClick={updateBalance} disabled={isUpdateDisabled}>
          Update Balance
        </Button>
    </div>
  );
}

export default AdminBalance;
