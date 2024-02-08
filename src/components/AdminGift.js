// GenerateCodeForm.jsx
import React, { useState } from 'react';

const AdminGift = () => {
  const [amount, setAmount] = useState('');
  const [giftTime, setGiftTime] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [expirationTime, setExpirationTime] = useState('');
  const [error, setError] = useState('');
  const [copyMessage, setCopyMessage] = useState('');

  const handleGenerateCode = async () => {
    try {
      const response = await fetch('https://cute-puce-xerus.cyclic.app/api/gift/generateCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, giftTime }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      const data = await response.json();
      setGeneratedCode(data.code);
      setExpirationTime(formatISTDateTime(data.expirationTime));
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  const formatISTDateTime = (dateString) => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Kolkata',
    };
    return new Date(dateString).toLocaleString('en-IN', options);
  };

  const handleCopyCode = () => {
    const codeElement = document.getElementById('generatedCode');
    codeElement.select();
    document.execCommand('copy');
    setCopyMessage('Copied!');
    setTimeout(() => {
      setCopyMessage('');
    }, 2000);
  };

  return (
    <div className='admiGift-container'>
      <div className='adminGift'>
        <h2>Gift Rewards</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <label>
           Max Amount:<br/>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
        <br />
        <label>
          Gift Time (minutes):<br/>
          <input type="number" value={giftTime} onChange={(e) => setGiftTime(e.target.value)} />
        </label>
        <br />
        <button className='btn btn-success' onClick={handleGenerateCode}>Get Code</button>
        <br />
        {generatedCode && (
          <div>
            <p>Generated Code:</p>
            <div className='gift-code'>
            <input type="text" style={{border:'none', background:'transparent', width:'130px'}} value={generatedCode} id="generatedCode" readOnly />
            <button className='btn btn-success' style={{width:'130px'}} onClick={handleCopyCode}>{copyMessage || 'Copy Code'}</button>
            </div>
            <p>Expiration Time: {expirationTime}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminGift;
