// LiveGameTimer.js

import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const LiveGameTimer = () => {
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSetTimer = async () => {
    try {
      const response = await axios.post('https://cute-puce-xerus.cyclic.app/api/admin/setTimer', { time });
      setMessage(response.data.message);
      setError('');
    } catch (error) {
      setMessage('');
      setError('Failed to set the timer.');
      console.error(error);
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center m-1 p-1'style={{flexDirection:'column', border:'1px solid white ', borderRadius:'25px'}}>
      <h6 className='text-secondary text-center'>Live Game Timer </h6>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="number" value={time} onChange={(e) => setTime(e.target.value)} />
      <Button variant='light' onClick={handleSetTimer}>Set Timer</Button>
      <p className='text-light bg-danger mt-1'> Note: please, keep in Mind Timer put in Minutes 😊</p>
    </div>
  );
};

export default LiveGameTimer;
