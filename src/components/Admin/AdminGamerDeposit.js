// src/AdminApp.js
import React, { useEffect, useState } from 'react';

function AdminGamerDeposit() {
  const [requests, setRequests] = useState([]);
  const [isTokenValid, setIsTokenValid] = useState(true);
  const getTokenExpireTime = () => {
    const tokenExpire = localStorage.getItem("tokenExpire");
    return tokenExpire ? parseInt(tokenExpire) : null;
  };
  
  const isTokenExpired = () => {
    const expireTime = getTokenExpireTime();
    return expireTime ? expireTime < Date.now() : true;
  };
  useEffect(() => {
    if (isTokenExpired()) {
      setIsTokenValid(false);
      // redirect to homepage
      window.location.href = "/login";
    }
  }, []); 
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch('/requests');
      if (response.ok) {
        const data = await response.json();
        setRequests(data);
      } else {
        console.error('Error fetching requests');
      }
    } catch (error) {
      console.error('Error fetching requests', error);
    }
  };

  const processRequest = async (id, userId, amount) => {
    try {
      const response = await fetch(`/process-request/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      if (response.ok) {
        console.log('Deposit request approved and balance updated successfully');
        // Fetch the updated list of requests
        fetchRequests();
      } else {
        console.error('Error processing deposit request');
      }
    } catch (error) {
      console.error('Error processing deposit request', error);
    }
  };

  return (
    <>
   
   
    {isTokenValid?(
 <div>
 <h1>Admin Panel</h1>
 <h2>Deposit Requests to Approve:</h2>
 <ul>
   {requests.map((request) => (
     <li key={request._id}>
       {request.name} - {request.amount} - Type: {request.type} - Status:{' '}
       {request.approved}
       {request.approved === 'Pending' && request.type === 'Deposit' && (
         <button
           onClick={() => processRequest(request._id, request.userId, request.amount)}
         >
           Process
         </button>
       )}
     </li>
   ))}
 </ul>
</div>
    ):(
      <></>
    )}
    </>

  );
}

export default AdminGamerDeposit;
