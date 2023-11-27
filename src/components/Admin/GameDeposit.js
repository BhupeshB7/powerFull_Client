import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Col, Container, Row } from "react-bootstrap";
import GameHistory from "./NewGameHistory";
import NavbarComponent from "./NavbarComponent";
import AdminNotice from "../../pages/AdminNotice";

function  GameDeposit() {
  const [gameHistory, setGameHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [statistics, setStatistics] = useState({
    sevenDayTotalAmount: 0,
    sevenDayPendingAmount: 0,
    sevenDayApprovedAmount: 0,
    yesterdayApprovedAmount: 0,
    yesterdayTotalAmount: 0,
  });
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
    // Make a GET request to your backend API endpoint
    fetch('https://mlm-production.up.railway.app/api/statistics') // Assuming your backend is running on the same host/port
      .then((response) => response.json())
      .then((data) => {
        setStatistics(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://mlm-production.up.railway.app/api/deposit/history?page=${currentPage}`
        );
        const { gameHistory, paginationInfo } = response.data;
        setGameHistory(gameHistory);
        setTotalPages(paginationInfo.totalPages);
      } catch (error) {
        console.error("Error fetching game history:", error);
      }
    };

    fetchData();
  }, [currentPage]);
  const amount = gameHistory.amount;
  const id = gameHistory._id;
  
  const handleApprove = async (id, amount) => {
    const alreadyApprovedItem = gameHistory.find(item => item._id === id && item.approved === "Approved");
  
  if (alreadyApprovedItem) {
    alert("Already approved!");
    return;
  }
    try {
      const response = await axios.put(`https://mlm-production.up.railway.app/api/approve/${id}`, { amount });
      alert(response.data.message);
       // Update the status in the gameHistory array
       const updatedGameHistory = gameHistory.map((item) =>
       item._id === id ? { ...item, approved: "Approved" } : item
     );
     // Set the updated gameHistory in the state
     setGameHistory(updatedGameHistory);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
    {isTokenValid ?(

      <div style={{background:'#fbffde',}}>
      <NavbarComponent/>
      <div style={{ minHeight:'100vh', paddingBottom:'20px'}}>
      <h3 className="text-center pt-3">Admin Game</h3>
    <Container>
      <Row>
     
     <Col sm={12} md={4} lg={4} className="balanceCard1 " >
       <h6>Previous 7 Day Total Amount</h6>
       <h6>{statistics.sevenDayTotalAmount}</h6>
     </Col>
     <Col sm={12} md={4} lg={4} className="balanceCard1 " >
       <h6>Previous 7 Day Profit</h6>
       <h6>{statistics.sevenDayApprovedAmount}</h6>
     </Col>
     <Col sm={12} md={4} lg={4} className="balanceCard1" >
       <h6>Yesterday Profit</h6>
       <h6>{statistics.yesterdayApprovedAmount}</h6>
     </Col>
     <Col sm={12} md={4} lg={4} className="balanceCard1" >
      {/* style={{background:"url('https://img.freepik.com/free-vector/growing-financial-schedule-3d-arrow_102902-2327.jpg?size=626&ext=jpg&ga=GA1.1.393936886.1688825666&semt=ais')", height:'100px' , borderRadius:'10px', backgroundSize:'container', backgroundRepeat:'no-repeat', border:'0px !important'}} */}
       <h6>Yesterday Deposit Amount</h6>
       <h6>{statistics.yesterdayTotalAmount}</h6>
     </Col>
    
    
      </Row>
   
      <AdminNotice/>
      <div className="table-responsive">
        <table className="table table-bordered table-warning">
          <thead className="table-primary">
            <tr>
              <th>Name</th>
              <th>UserId</th>
              <th>Amount</th>
              <th>UTR</th>
              <th>Status</th>
              
            </tr>
          </thead>
          <tbody>
            {gameHistory.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.userId}</td>
                <td>{item.amount}</td>
                <td>{item.UTR}</td>
                <td> <Button onClick={()=>handleApprove(item._id, item.amount)} className="ms-1">{item.approved}</Button></td>
                {/* Add more table data cells as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <Button  variant="outline-primary" className='ms-1'
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
       
        <Button variant="outline-primary" className='ms-1'
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <GameHistory/>
        </Container>
    </div>
    
    </div>
    ):(
      <>
      <h6></h6>
      </>
    )}
    </>
  );
}

export default GameDeposit;
