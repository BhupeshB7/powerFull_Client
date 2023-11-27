// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const FundTransfer = () => {
//   const [transfers, setTransfers] = useState([]);

//   useEffect(() => {
//     fetchTransferDetail();
//   }, []);

  
//   return (
//     <div>
//       <h2>Admin Interface - Pending Transfers</h2>
//       <ul>
//         {transfers.map((transfer) => (
//           <li key={transfer.userId}>
//             <strong>User ID:</strong> {transfer.userId}<br />
//             <strong>User Name:</strong> {transfer.userName}<br />
//             <strong>Transfer Amount:</strong> {transfer.pendingTransfer.amount}<br />
//             <strong>Deduction:</strong> {transfer.pendingTransfer.deduction}<br />
//             <strong>Status:</strong> {transfer.pendingTransfer.status}<br />
//             <button onClick={() => handleFundApprove(transfer.userId)}>Approve</button>
//             <button onClick={() => handleFundReject(transfer.userId)}>Reject</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default FundTransfer;
