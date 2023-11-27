import React, { useState } from 'react';

function AdminNoticeForm({ onSubmit }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a notice"
        required
      />
      <div style={{display:'flex', justifyContent:'flex-end', width:'100%'}}>
      <button type="submit" style={{border:'none', width:'40px', height:'40px',borderRadius:'10px'}}><img src='https://cdn-icons-png.flaticon.com/128/2161/2161491.png' height='35px' width='35px' alt='icon'/></button>
      </div>
    </form>
  );
}

export default AdminNoticeForm;
