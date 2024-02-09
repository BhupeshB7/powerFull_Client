import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import spinner from '../assets/spinner2.gif'
const FundHistory = ({ userId }) => {
    const [transfersPerPage] = useState(10);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem('token');
    const [allTransfers, setAllTransfers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
//for navigate user
const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://mlm-psi.vercel.app/api/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
    //   const {_id, userId, name } = result;

      setData(result);
    //   console.log(result); // check the response data
      setIsLoading(false);
    };
    fetchData();
  }, [token]);


  useEffect(() => {
    const fetchPendingTransfers = async () => {
      try {
        const response = await axios.get(`https://mlm-psi.vercel.app/api/pendingTransfers/${data._id}`);
        setAllTransfers(response.data.allTransfers);
      } catch (error) {
        console.error("Error fetching transfers:", error);
      }
    };

    fetchPendingTransfers();
  }, [data._id]);

  if (isLoading) {
    return <h6 className='text-center' style={{marginTop:'-70px',display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', width:'100%' }}><img src={spinner} alt="spinner" height="90px" width="90px"  style={{display:'flex', justifyContent:'center', alignItems:'center'}}/></h6>;
  }
//for user go to dashboard
const handleDashBoard = ()=>{
    navigate('/dashboard');
  }
  
  if (!allTransfers) {
    return <div>Loading...</div>;
  }
  
  // Calculate current transfers for the current page
  const indexOfLastTransfer = currentPage * transfersPerPage;
  const indexOfFirstTransfer = indexOfLastTransfer - transfersPerPage;
  const currentTransfers = allTransfers.slice(indexOfFirstTransfer, indexOfLastTransfer);

  // Change page
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
    {token ?(
        <div className="container pt-3 topUPBg">
        <div className="table-responsive">
        <h6 className="m-1 text-light">Hey, {data.name}</h6>
        <h4 className="fw-bold text-center text-secondary">Fund History</h4>
        <div className="table-responsive">

       
        <table className="table table-bordered table-striped" style={{border:'1px solid white'}}>
          <thead className="text-warning">
            <tr className="text-warning">
              <th>#</th>
              <th>Total</th>
              <th>TopUp</th>
              <th>Deduct Amount</th>
              {/* <th>Status</th> */}
              <th>Date</th>
              {/* Add other table headers for additional transfer details */}
            </tr>
          </thead>
          <tbody className="text-light">
            {currentTransfers.map((transfer,index) => (
              <tr key={transfer._id} className="text-light">
                <td>{index +1}</td>
                <td>{transfer.total}</td>
                <td>{transfer.amount}</td>
                <td>{transfer.deduction}</td>
                {/* <td>{transfer.status}</td> */}
                <td> {transfer.createdAt ? new Date(transfer.createdAt).toLocaleString() : 'unknown'}</td>
                {/* Add other table data cells for additional transfer details */}
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <div className="pagination">
          {Array.from({ length: Math.ceil(allTransfers.length / transfersPerPage) }, (_, index) => (
            <button className="btn btn-outline-warning m-1" key={index} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <div className="container mb-5" style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
    <button className='btn btn-outline-light m-1' onClick={handleDashBoard}>DashBoard</button>
    </div>
        </div>
    ):(<>
    <h6 className="text-center m-5">Login To Continue</h6>
    </>)}
    
   
    </>
  );
};

export default FundHistory;
