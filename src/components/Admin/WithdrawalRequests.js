import axios from "axios";
import React, { useState, useEffect } from "react";

function  WithdrawalRequests() {
  const [withdrawalRequests, setWithdrawalRequests] = useState([]);
  const [withdrawalQuerySearch, setWithdrawalQuerySearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [transaction, setTransaction] = useState("");

  useEffect(() => {
    // Fetch data from your backend API with pagination and search
    fetch(
      `https://mlm-psi.vercel.app/api/withdraw/withdrawals?search=${withdrawalQuerySearch}&page=${currentPage}`
      // http://localhost:5000/api/withdraw/withdrawals
    )
      .then((response) => response.json())
      .then((data) => {
        setWithdrawalRequests(data.withdrawalRequests);
        setTotalPages(data.totalPages);
      })
      .catch((error) => console.error(error));
  }, [currentPage, withdrawalQuerySearch]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  const handleApprove = async (id) => {
    try {
      const response = await axios.put(
        `https://mlm-psi.vercel.app/api/withdraw/withdrawals/${id}`,
        { status: "approved", transaction }
      );
      setWithdrawalRequests(
        withdrawalRequests.map((request) =>
          request._id === id ? response.data : request
        )
      );
      setTransaction("");
    } catch (error) {
      console.log(error);
    }
  };
  const handleWithdrawalDelete = async (request) => {
    try {
      await axios.delete(
        `https://mlm-psi.vercel.app/api/withdraw/withdrawalWallet/${request._id}`
      );
      alert("Deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("An error occurred while deleting the user.");
    }
  };
  const handleReject = async (id) => {
    try {
      const response = await axios.put(
        // `http://localhost:5000/api/withdraw/withdrawals/reject/${id}`
        `https://mlm-psi.vercel.app/api/withdraw/withdrawals/reject/${id}`
      );
      setWithdrawalRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === id ? { ...request, status: response.data.status } : request
        )
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
     
      <h6 className="text-center text-secondary">Withdrawal Requests</h6>
      <input
        type="text"
        placeholder="Search users..."
        value={withdrawalQuerySearch}
        onChange={(e) => setWithdrawalQuerySearch(e.target.value)}
      />
      {/* <button
        className="btn btn-primary"
        onClick={() => handlePageChange(1)} // Reset to page 1 when searching
        style={{ marginLeft: "10px" }}
      >
        Search
      </button> */}

      <div className="table-responsive">
        <table className="table table-bordered table-warning">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>User ID</th>
              <th>Amount</th>
              <th>Account Holder Name</th>
              <th>Account No</th>
              <th>IFSC CODE</th>
              <th>Google Pay</th>
              <th>Status</th>
              <th>Transaction</th>
              <th>TransactionId</th>
              <th>Action</th>
              <th>Delete</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {withdrawalRequests.map((request, index) => (
              <tr key={request._id}>
                <td>{index + 1}</td>
                <td>{request.userId}</td>
                <td>{request.amount}</td>
                <td>{request.accountHolderName}</td>
                <td>{request.accountNo}</td>
                <td>{request.ifscCode}</td>
                <td>{request.GPay}</td>
                <td>{request.status}</td>
                <td>{request.transactionNumber}</td>
                <td>
                  <input
                    type="text"
                    value={transaction}
                    onChange={(e) => setTransaction(e.target.value)}
                  />
                </td>
                <td>
                  {request.status === "pending" && (
                    <>
                      <button
                        className="btn btn-success"
                        onClick={() => handleApprove(request._id)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger ms-1"
                        onClick={() => handleReject(request._id)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleWithdrawalDelete(request)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  {request.createdAt
                    ? new Date(request.createdAt).toLocaleString()
                    : "unknown"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          className="btn btn-outline-primary ms-1"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-outline-secondary ms-3"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default WithdrawalRequests;
