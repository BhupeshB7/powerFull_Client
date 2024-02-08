
import React, { useState, useEffect } from "react";
import axios from "axios";

const AllFundTransfer = () => {
  const [allTransfers, setAllTransfers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [transfersPerPage] = useState(20);
  const [transfers, setTransfers] = useState([]);
  useEffect(() => {
    const fetchAllTransfers = async () => {
      try {
        // const response = await axios.get("https://cute-puce-xerus.cyclic.app/api/allTransfers");
        const response = await axios.get("https://cute-puce-xerus.cyclic.app/api/allTransfers");
        setAllTransfers(response.data.allTransfers);
      } catch (error) {
        console.error("Error fetching transfers:", error);
      }
    };

    fetchAllTransfers();
  }, []);

    // Fund useEffect start
    useEffect(() => {
      fetchTransferDetail();
    }, []);
  //Fund Api and Function code
  const fetchTransferDetail = async () => {
    try {
      const response = await axios.get(
        "https://cute-puce-xerus.cyclic.app/api/transferDetail"
      );
      setTransfers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching transfer details:", error);
    }
  };

  // const handleFundApprove = async (userId) => {
  //   if (window.confirm("Are You Sure For Approve Fund?")) {
  //     try {
  //       await axios.post(
  //         `https://cute-puce-xerus.cyclic.app/api/transfer/approve/${userId}`
  //       );
  //       fetchTransferDetail(); // Refresh the list of transfers after approving
  //     } catch (error) {
  //       console.error("Error approving transfer:", error);
  //     }
  //   }
  // };

  // const handleFundReject = async (userId) => {
  //   if (window.confirm("Are you sure?")) {
  //     try {
  //       await axios.post(
  //         `https://cute-puce-xerus.cyclic.app/api/transfer/reject/${userId}`
  //       );
  //       fetchTransferDetail(); // Refresh the list of transfers after rejecting
  //       alert("Fund Rejected!");
  //     } catch (error) {
  //       console.error("Error rejecting transfer:", error);
  //     }
  //   }
  // };
  // Calculate current transfers for the current page
  const indexOfLastTransfer = currentPage * transfersPerPage;
  const indexOfFirstTransfer = indexOfLastTransfer - transfersPerPage;
  const currentTransfers = allTransfers.slice(indexOfFirstTransfer, indexOfLastTransfer);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div>
                    <h2>Admin Interface - Pending Transfers</h2>
                    <div className="table-responsive">
                      <table className="table table-dark table-bordered table-striped">
                        <thead>
                          <tr>
                            <th>User ID</th>
                            <th>User Name</th>
                            <th>Transfer Amount</th>
                            <th>Deduction</th>
                            {/* <th>Status</th> */}
                            {/* <th>Actions</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {transfers.map((transfer) => (
                            <React.Fragment key={transfer.userId}>
                              {transfer.pendingTransfer.map(
                                (transferDetail, index) => (
                                  <tr key={`${transfer.userId}-${index}`}>
                                    {index === 0 ? (
                                      <>
                                        <td
                                          rowSpan={
                                            transfer.pendingTransfer.length
                                          }
                                        >
                                          {transfer.userId}
                                        </td>
                                        <td
                                          rowSpan={
                                            transfer.pendingTransfer.length
                                          }
                                        >
                                          {transfer.userName}
                                        </td>
                                      </>
                                    ) : null}
                                    <td>{transferDetail.amount}</td>
                                    <td>{transferDetail.deduction}</td>
                                    {/* <td>{transferDetail.status}</td> */}
                                    <td>
                                    {/* {console.log("*-----TransferId----*")}
                                      {console.log(transfer.id)}
                                      {console.log("*------------*")} */}
                                      {/* <button
                                        className="btn btn-success sm m-1"
                                        onClick={() =>
                                          handleFundApprove(transfer.id)
                                        }
                                      >
                                        Approve
                                      </button> */}
                                      {/* <button
                                        className="btn btn-danger sm m-1"
                                        onClick={() =>
                                          handleFundReject(transfer.id)
                                        }
                                      >
                                        Reject
                                      </button> */}
                                    </td>
                                  </tr>
                                )
                              )}
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
    
    <div className="table-responsive">
      <h2>All Fund Transfers</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>User ID</th>
            <th>User Name</th>
            <th>Total</th>
            <th>TopUp</th>
            <th>Deduction</th>
            <th>Status</th>
            {/* Add other table headers for additional transfer details */}
          </tr>
        </thead>
        <tbody>
          {currentTransfers.map((transfer) => (
            <tr key={transfer.transferDetails._id}>
              <td>{transfer.userId}</td>
              <td>{transfer.userName}</td>
              <td>{transfer.transferDetails.total}</td>
              <td>{transfer.transferDetails.amount}</td>
              <td>{transfer.transferDetails.deduction}</td>
              <td>{transfer.transferDetails.status}</td>
              {/* Add other table data cells for additional transfer details */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination " style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
        {Array.from({ length: Math.ceil(allTransfers.length / transfersPerPage) }, (_, index) => (
          <button className="btn btn-outline-primary m-1" key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
    </>
  );
};

export default AllFundTransfer;





