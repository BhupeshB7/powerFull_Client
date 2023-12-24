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
  const [showModal, setShowModal] = useState(false);
  const [showImage, setShowImage] = useState(null);

  // Open the modal to display the selected image
  const openImage = (image) => {
    setShowImage(image);
    setShowModal(true);
  };

  // Close the modal
  const closeImage = () => {
    setShowImage(null);
    setShowModal(false);
  };
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
    const alreadyApprovedItem = gameHistory.find(item => item._id === id && item.isApproved);
  
    if (alreadyApprovedItem) {
      alert("Already approved!");
      return;
    }
  
    try {
      const response = await axios.put(`https://mlm-production.up.railway.app/api/approve/${id}`, { amount });
      alert(response.data.message);
      
      // Update the status in the gameHistory array
      const updatedGameHistory = gameHistory.map((item) =>
        item._id === id ? { ...item, isApproved: true } : item
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
  const handleDeleteDeposit = (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this deposit?"
    );
    if (shouldDelete) {
      deleteDeposit(id);
    }
  };

  const deleteDeposit = async (id) => {
    try {
      const response = await axios.delete(
        `https://mlm-production.up.railway.app/api/gameDeposit/delete/${id}`
      );
      // console.log('Deposit deleted');
      alert(response.data);
      window.location.href = "/admin/dashboard/game";
    } catch (error) {
      alert(error.response.data);
      console.log(error);
    }
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
              <th>View</th>
              <th>Status</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {gameHistory.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.userId}</td>
                <td>{item.depositAmount}</td>
                <td>{item.transactionId}</td>
                <td>
                <div className="image-list m-5">
                  {item.images.map((image) => (
                    <div key={image.public_id}>
                      <Button variant="warning" onClick={() => openImage(image)} style={{width:'110px',height:'40px'}}>View</Button>
                    </div>
                  ))}
                </div>
              </td>
                <td> <Button onClick={()=>handleApprove(item._id, item.depositAmount)} className="ms-1">{item.isApproved?'Approved':'Pending'}</Button></td>
                <td>
                <Button
                  className="btn btn-danger sm m-1"
                  onClick={() => handleDeleteDeposit(item._id)}
                >
                  Delete
                </Button >
              </td>
                {/* Add more table data cells as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && showImage && (
        <div className="modal modalImage">
          <div className="modal-content modal-contentImage">
            <div className="close" onClick={closeImage}>&times;</div>
            <img
              src={`https://res.cloudinary.com/dmoukvc5o/image/upload/${showImage.public_id}.jpg`}
              alt="Selected"
              height='500px'
              width='300px'
              className="centered-image"
            />
          </div>
        </div>
      )}
      <div className="pagination d-flex justify-content-center align-items-center">
        <Button  variant="outline-primary" className='ms-1'
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <h6 className="m-1">
           {currentPage} <b>/</b> {totalPages}
        </h6>
        <Button variant="outline-primary" className='ms-1'
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
        
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
