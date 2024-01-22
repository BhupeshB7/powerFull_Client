import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Container, Button } from "react-bootstrap";
import spinner from "../assets/spinner2.gif";
import { Link } from "react-router-dom";

function Topup() {
  const [data, setData] = useState([]);
  const [topUpdata, settopUpData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");

  // Fetch user data
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://mlm-production.up.railway.app/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      // console.log(result); // check the response data
      setData(result);
      setIsLoading(false);
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // `http://localhost:5000/api/topupHistory/${data.userId}`
          `https://mlm-production.up.railway.app/api/topupUser/${data.userId}?page=${currentPage}`
          // `https://mlm-production.up.railway.app/api/topupUser/${data.userId}?${currentPage}`
        );
        const { topUpdata, currentPage:fetchedPage, totalPages } = response.data;
        // console.log(topUpdata);
        settopUpData(topUpdata);
        setCurrentPage(fetchedPage);
        setTotalPages(totalPages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [data.userId, currentPage]);
  if (isLoading) {
    return (
      <div className="text-center" style={{ marginTop: "70px" }}>
        <img src={spinner} alt="spinner" height="100px" width="100px" />
      </div>
    );
  }
  const dashboard = () => {
    window.location.href = "/dashboard";
  };
  return (
    <div className="bg-primary " style={{height:'100vh'}}>
      {token ? (
        <div className="topUPBg1"style={{height:'100vh'}}>
          <h4 className="text-center text-warning pt-4">Hello, {data.name}</h4>
          <h6 className="text-center text-light">TopUp History...</h6>
          <div
            className="d-flex justify-content-end"
            style={{ position: "absolute", right: "20px", top: "30px" }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/189/189254.png"
              height="40px"
              width="40px"
              onClick={dashboard}
              alt="back"
            />
          </div>
          <div className="table-responsive">
            <Container>
              <div className="table-responsive">
                <Container>
                  <Table
                    striped
                    bordered
                    hover
                    style={{ border: "2px solid white" }}
                  >
                    <thead>
                      <tr style={{ color: "yellow" }}>
                        <th className="text-center">#</th>
                        {/* <th className="text-center">Amount</th> */}
                        <th className="text-center">UserId</th>
                        {/* <th className="text-center">Name</th> */}
                        <th className="text-center">TopUp Id</th>
                        <th className="topUpHistoryDate">Date</th>
                        {/* Add more table headers for additional fields */}
                      </tr>
                    </thead>
                    <tbody>
                      {topUpdata.map((item, index) => (
                        <tr key={item._id} className="text-light">
                          <td>{index + 1}</td>
                          {/* <td>{item.amount}</td> */}
                          <td>{item.userId}</td>
                          {/* <td>{item.name}</td> */}
                          <td>{item.targetUserId}</td>
                          {/* <td>{item.createdAt}</td> */}
                          <td className="topUpHistoryDate">
                            {new Date(item.createdAt).toLocaleString("en-IN", {
                              timeZone: "Asia/Kolkata",
                            })}
                          </td>
                          {/* Add more table cells for additional fields */}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Container>
              </div>
            </Container>
          </div>

          <div>
            <Button
              variant="warning"
              className="m-1"
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

export default Topup;
