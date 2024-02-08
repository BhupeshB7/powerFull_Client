// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Table, Container, Button } from "react-bootstrap";
// import spinner from "../assets/spinner2.gif";
// import { Link } from "react-router-dom";

// function DepsoitHistory() {
//   const [data, setData] = useState([]);
//   const [depositHistory, setdepositHistory] = useState([]);
//   const [totalPages, setTotalPages] = useState(1);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isLoading, setIsLoading] = useState(true);
//   const token = localStorage.getItem("token");

//   // Fetch user data
//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch(
//         "https://cute-puce-xerus.cyclic.app/api/users/profile",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const result = await response.json();
//       // console.log(result); // check the response data
//       setData(result);
//       setIsLoading(false);
//     };
//     fetchData();
//   }, [token]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           // `http://localhost:5000/api/topupHistory/${userId}`
//           `https://cute-puce-xerus.cyclic.app/api/deposit/depositHistory/PI45059879`
//         );
//         const { depositHistory, currentPage, totalPages } = response.data;
//         console.log(depositHistory);
//         setdepositHistory(depositHistory);
//         setCurrentPage(currentPage);
//         setTotalPages(totalPages);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, [data.userId, currentPage]);
//   if (isLoading) {
//     return (
//       <div className="text-center" style={{ marginTop: "70px" }}>
//         <img src={spinner} alt="spinner" height="100px" width="100px" />
//       </div>
//     );
//   }

//   return (
//     <div>
//       {token ? (
//         <div className="topUPBg">
//           <h4 className="text-center text-warning pt-4">Hello, {data.name}</h4>
//           <h6 className="text-center text-light">Deposit History...</h6>
//           <div className="table-responsive">
//             <Container>
//               <div className="table-responsive">
//                 <Container>
//                   <Table
//                     striped
//                     bordered
//                     hover
//                     style={{ border: "2px solid white" }}
//                   >
//                     <thead>
//                       <tr style={{ color: "yellow" }}>
//                         <th className="text-center">#</th>
//                         <th className="text-center">Name</th>
//                         <th className="text-center">UserId</th>
//                         <th className="text-center">Amount</th>
//                         <th className="text-center">Transaction Id</th>
//                         <th className="text-center">Status</th>
//                         <th>Date</th>
//                         {/* Add more table headers for additional fields */}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {depositHistory.map((item, index) => (
//                         <tr key={item._id} className="text-light">
//                           <td>{index +1}</td>
//                           <td>{item.name}</td>
//                           <td>{item.userID}</td>
//                           <td>{item.depositAmount}</td>
//                           <td>{item.transactionId}</td>
//                           {/* <td>{item.isApproved?'Approved':'Pending'}</td> */}
//                           {/* <td>{item.createdAt}</td> */}
//                           <td>
//                             {new Date(item.createdAt).toLocaleString("en-IN", {
//                               timeZone: "Asia/Kolkata",
//                             })}
//                           </td>
//                           {/* Add more table cells for additional fields */}
//                         </tr>
//                       ))}
//                     </tbody>
//                   </Table>
//                 </Container>
//               </div>
//             </Container>
//           </div>

//           <div>
//             <Button
//               variant="warning"
//               className="m-1"
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage(currentPage - 1)}
//             >
//               Previous
//             </Button>
//             <label className="text-light">
//               Page {currentPage} of {totalPages}
//             </label>
//             <Button
//               variant="warning"
//               className="m-1"
//               disabled={currentPage === totalPages}
//               onClick={() => setCurrentPage(currentPage + 1)}
//             >
//               Next
//             </Button>
//           </div>
//         </div>
//       ) : (
//         <>
//           <h6 className="text-center text-secondary">
//             Re-login to continue...
//           </h6>
//           <Link to="/login" style={{ textDecoration: "underline" }}>
//             <p className="text-center text-primary">Login</p>
//           </Link>
//         </>
//       )}
//     </div>
//   );
// }

// export default DepsoitHistory;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Container, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

function DepositHistory() {
  const [data, setData] = useState({});
  const [depositHistory, setDepositHistory] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://cute-puce-xerus.cyclic.app/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = response.data;
        setData(result);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    if (data && data.userId) {
      const fetchDepositData = async () => {
        try {
          const response = await axios.get(
            `https://cute-puce-xerus.cyclic.app/api/deposit/depositHistory/${data.userId}`
          );
          const { depositHistory, currentPage, totalPages } = response.data;
          if (Array.isArray(depositHistory)) {
            setDepositHistory(depositHistory);
            setCurrentPage(currentPage);
            setTotalPages(totalPages);
          } else {
            // Handle the case where the response is not an array
            setDepositHistory([]);
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchDepositData();
    }
  }, [data.userId]);

  if (isLoading) {
    return (
      <div className="text-center d-flex align-items-center justify-content-center" style={{ marginTop: "70px" }}>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
const dashboard =()=>{
    window.location.href='/dashboard';
}
  return (
    <div>
      {token ? (
        <div className="topUPBg">
          <h4 className="text-center text-warning pt-4">Hello, {data.name}</h4>
          <h6 className="text-center text-light">Deposit History...</h6>
          <div className="d-flex justify-content-end" style={{position:'absolute', right:'20px', top:'30px'}}>

         <img src="https://cdn-icons-png.flaticon.com/128/189/189254.png" height='40px' width='40px' onClick={dashboard} alt="back"/>
          </div>
          <Container className="table-responsive">
            {depositHistory.length > 0 ? ( // Check if depositHistory is not empty
              <Table striped bordered hover style={{ border: "2px solid white" }}>
                <thead>
                  <tr style={{ color: "yellow" }}>
                    <th className="text-center">#</th>
                    <th className="text-center">Name</th>
                    <th className="text-center">UserId</th>
                    <th className="text-center">Amount</th>
                    <th className="text-center">Transaction Id</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {depositHistory.map((item, index) => (
                    <tr key={item._id} className="text-light">
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.userID}</td>
                      <td>{item.depositAmount}</td>
                      <td>{item.transactionId}</td>
                      {/* Add more table cells for additional fields */}
                      <td>
                        {item.isApproved ? "Approved" : "Pending"}
                      </td>
                      <td>
                        {new Date(item.createdAt).toLocaleString("en-IN", {
                          timeZone: "Asia/Kolkata",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div className="text-center text-light">No deposit history available.</div>
            )}
            </Container>
            <div className="text-center">
              <Button
                variant="warning"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </Button>
              <label className="text-light">
                Page {currentPage} of {totalPages}
              </label>
              <Button
                variant="warning"
                className="m-1"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </Button>
            </div>
          
        </div>
      ) : (
        <>
          <h6 className="text-center text-secondary">
            Re-login to continue...
          </h6>
          <Link to="/login" style={{ textDecoration: "underline" }}>
            <p className="text-center text-primary">Login</p>
          </Link>
        </>
      )}
    </div>
  );
}

export default DepositHistory;
