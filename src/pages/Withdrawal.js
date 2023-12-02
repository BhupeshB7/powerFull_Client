
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import spinner from '../assets/spinner.gif'
// import axios from 'axios';
// function Withdrawal() {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [withdrawalRequest, setWithdrawalRequest] = useState([]);
//   const token = localStorage.getItem('token');
// //for navigate user
// const navigate = useNavigate();
//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch('https://mlm-production.up.railway.app/api/users/profile', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const result = await response.json();
//       console.log(result); // check the response data
//       setData(result);
//       setIsLoading(false);
//     };
//     fetchData();
//   }, [token]);

//   useEffect(() => {
//     axios.get(`https://mlm-production.up.railway.app/api/withdrawals/${data.userId}`)
//       .then(response => setWithdrawalRequest(response.data))
//       .catch(error => console.log(error));
//   }, [data.userId]);
  
//   if (isLoading) {
//     return <h6 className='text-center' style={{marginTop:'-70px',display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', width:'100%' }}><img src={spinner} alt="spinner" height="90px" width="90px"  style={{display:'flex', justifyContent:'center', alignItems:'center'}}/></h6>;
//   }
// //for user go to dashboard
// const handleDashBoard = ()=>{
//   navigate('/dashboard');
// }

// if (!withdrawalRequest) {
//   return <div>Loading...</div>;
// }


//   return (
//     <div>
//       {token ? ( <div className="dashboard-profile-center">
//           <div className="user-profile">
//           <div className="container" style={{marginTop:"20px"}}>
//         <h5 className='text-center text-secondary'>Welcome, {data.name}</h5>
//           {/* <table className="table table-bordered">
//   <thead>
//     <tr>
//       <th scope="col">Name</th>
//       <th scope="col">{data.name}</th>
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//       <td>Email:</td>
//       <td>{data.email}</td>
//     </tr>
//     <tr>
//       <td>Mobile:</td>
//       <td>{data.mobile}</td>
//     </tr>
//     <tr>
//       <td>SponsorId:</td>
//       <td>{data.sponsorId}</td>
//     </tr>
//     <tr>
//       <td>UserId:</td>
//       <td>{data.userId}</td>
//     </tr>
//     <tr>
//       <td>Bio:</td>
//       <td>{data.bio}</td>
//     </tr>
//     <tr>
//       <td>Address:</td>
//       <td>{data.address}</td>
//     </tr>
//     <tr>
//       <td>Account No:</td>
//       <td>{data.accountNo}</td>
//     </tr>
//     <tr>
//       <td>IFSC CODE:</td>
//       <td>{data.ifscCode}</td>
//     </tr>
//     <tr>
//       <td>Google Pay:</td>
//       <td>{data.GPay}</td>
//     </tr>
//     <tr>
//       <td>Aadhar No:</td>
//       <td>{data.aadhar}</td>
//     </tr>
//     <tr>
//       <td>Profile Created:</td>
//       <td>{data.createdAt}</td>
//     </tr>
//   </tbody>
// </table> */}
//     <h1>Withdrawal Requests</h1>
//     <div className="table_container">
//       <table className='table table-bordered '>
//         <thead>
//           <tr>
//             <th>S.No.</th>
//             <td>User ID</td>
//             <td>Amount</td>
//             <td>Transaction No</td>
//             <td>Account No</td>
//             <td>ifscCode</td>
//             <td>Google Pay</td>
//             <td>Status</td>
//             <td>Date</td>
//           </tr>
//         </thead>
//         <tbody>
//           {withdrawalRequest.map((request, index) => (
//             <tr key={index}>
//               <td>{index + 1}</td>
//               <td>{request.userId}</td>
//               <td>{request.amount}</td>
//               <td>{request.transactionNumber}</td>
//               <td>{request.accountNo}</td>
//               <td>{request.ifscCode}</td>
//               <td>{request.GPay}</td>
//               <td>{request.status}</td>
//               <td>{request.createdAt ? new Date(request.createdAt).toLocaleString():'unknown'}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       </div>
// <div className="container ">
//   <button className='form_button' onClick={handleDashBoard}>DashBoard</button>
// </div>
//       </div>

//           </div>
//         </div>):(
//           <h3>Re login to continue...</h3>
//         )}
//     </div>
//   );
// }

// export default Withdrawal;







import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import spinner from '../assets/spinner2.gif'
import axios from 'axios';

function Withdrawal() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [withdrawalRequest, setWithdrawalRequest] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [withdrawalsPerPage] = useState(10); // 10 withdrawals per page
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://mlm-production.up.railway.app/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        setData(result);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    if (data.userId) {
      axios.get(`https://mlm-production.up.railway.app/api/withdraw/withdrawals/${data.userId}`)
        .then(response => setWithdrawalRequest(response.data))
        .catch(error => console.log(error));
    }
  }, [data.userId]);

  const handleDashBoard = () => {
    navigate('/dashboard');
  }

  // Calculate current withdrawals for the current page
  const indexOfLastWithdrawal = currentPage * withdrawalsPerPage;
  const indexOfFirstWithdrawal = indexOfLastWithdrawal - withdrawalsPerPage;
  const currentWithdrawals = withdrawalRequest.slice(indexOfFirstWithdrawal, indexOfLastWithdrawal);

  // Change page
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) {
    return (
      <h6 className='text-center' style={{ marginTop: '-70px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100%' }}>
        <img src={spinner} alt="spinner" height="90px" width="90px" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
      </h6>
    );
  }

  return (
    <div >
      {token ? (
        <div style={{minHeight:'100vh',backgroundImage:' linear-gradient(to top, #30cfd0 0%, #330867 100%)', height:'100%'}}>
          <div className='container'>
            <div>
              <h6 className='text-secondary p-3'>Welcome, {data.name}</h6>
              <h6 className='text-center fw-bold text-light'>Withdrawal History...</h6>
              <div className='container'>
              <div className="table-responsive">
                <table className='table table-bordered ' style={{border:'1px solid white'}}>
                  <thead>
                    <tr className='text-warning'>
                      <th>S.No.</th>
                      <td>User ID</td>
                      <td>Amount</td>
                      <td>Transaction No</td>
                      <td>Account No</td>
                      <td>ifscCode</td>
                      {/* <td>Google Pay</td> */}
                      <td>Status</td>
                      <td>Date</td>
                    </tr>
                  </thead>
                  <tbody className='text-light'>
                    {currentWithdrawals.map((request, index) => (
                      <tr key={index} className='text-light'>
                        <td>{index + 1}</td>
                        <td>{request.userId}</td>
                        <td>{request.amount}</td>
                        <td>{request.transactionNumber}</td>
                        <td>{request.accountNo}</td>
                        <td>{request.ifscCode}</td>
                        {/* <td>{request.GPay}</td> */}
                        <td>{request.status}</td>
                        <td>{request.createdAt ? new Date(request.createdAt).toLocaleString() : 'unknown'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="pagination">
                {Array.from({ length: Math.ceil(withdrawalRequest.length / withdrawalsPerPage) }, (_, index) => (
                  <button  className='btn btn-outline-secondary m-1' key={index} onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                  </button>
                ))}
                
              </div>
              <div className="container ">
                <button className='btn btn-outline-warning m-3' onClick={handleDashBoard}>DashBoard</button>
              </div>
              </div>
             
              
             
            </div>
          </div>
        </div>
      ) : (
        <>
        <h6 className="text-center text-secondary">Re login to continue...</h6>
        <Link to="/login" className="text-center text-primary" style={{textDecoration:'underline'}}>Login</Link>
        </>
      )}
    </div>
  );
}

export default Withdrawal;
