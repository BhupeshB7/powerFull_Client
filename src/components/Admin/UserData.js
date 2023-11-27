import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Col, Container, Row } from "react-bootstrap";

const itemsPerPage = 20; // Number of items to display per page

function UserData() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [count, setCount] = useState(0);
  const [newUsersCount, setNewUsersCount] = useState(null);
  const [activeUserCount, setActiveUserCount] = useState(0);
  useEffect(() => {
    // Make the API request to fetch daily new users count
    axios
      .get("https://mlm-production.up.railway.app/api/users/daily-new-users")
      .then((response) => {
        const { count } = response.data;
        setNewUsersCount(count);
      })
      .catch((error) => {
        console.error(error);
        setNewUsersCount(null);
      });
  }, []);

  useEffect(() => {
    // Fetch data from your backend API
    fetch("https://mlm-production.up.railway.app/api/admin/count-active-items")
      .then((response) => response.json())
      .then((data) => setActiveUserCount(data.numberOfActiveUser))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch("https://mlm-production.up.railway.app/api/admin/users/count")
      .then((response) => response.json())
      .then((data) => setCount(data.count))
      .catch((error) => console.error(error));
  }, []);

  const getUsers = async (page = 1) => {
    try {
      const response = await axios.get(
        `https://mlm-production.up.railway.app/api/admin/api/users?page=${page}&search=${searchQuery}&itemsPerPage=${itemsPerPage}`
      );
      const { users, totalPages } = response.data;
      setUsers(users);
      setTotalPages(totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [searchQuery]); // Update users when searchQuery changes

  //   const handleSearch = () => {
  //     getUsers();
  //   };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    getUsers(newPage);
  };

  const handleDeactivate = async (userId) => {
    try {
      const response = await axios.patch(
        `https://mlm-production.up.railway.app/api/active/${userId}/deactivate`
      );
      const updatedUser = response.data;

      const updatedUsers = users.map((user) =>
        user._id === updatedUser._id
          ? {
              ...user,
              is_active: updatedUser.is_active,
              activationTime: updatedUser.activationTime,
            }
          : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.log(error);
    }
  };

  const handleActivate = async (userId) => {
    try {
      const response = await axios.patch(
        `https://mlm-production.up.railway.app/api/active/${userId}/activate`
      );
      const updatedUser = response.data;

      const updatedUsers = users.map((user) =>
        user._id === updatedUser._id
          ? {
              ...user,
              is_active: updatedUser.is_active,
              activationTime: updatedUser.activationTime,
            }
          : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async (id) => {
    await axios.delete(
      `https://mlm-production.up.railway.app/api/admin/api/users/${id}`
    );
    setUsers(users.filter((user) => user._id !== id));
  };
  const handleBlock = (id) => {
    axios.put(`https://mlm-production.up.railway.app/api/auth/block/${id}`)
      .then(response => {
        setUsers(users.map(user => (user._id === id ? response.data : user)));
      })
      .catch(error => console.error(error));
  };

  const handleUnblock = (id) => {
    axios.put(`https://mlm-production.up.railway.app/api/auth/unblock/${id}`)
      .then(response => {
        setUsers(users.map(user => (user._id === id ? response.data : user)));
      })
      .catch(error => console.error(error));
  };
  return (
    <div className="container-fluid" style={{ backgroundColor: "#fbffde" }}>
      <Container>
        <Row className="m-3">
          <Col sm={12} md={6} lg={4} className="balanceCard1">
            <div>
              <div
                style={{
                  height: "50px",
                  width: "50px",
                  display: "flex",
                  background: "rgb(253, 203, 203)",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "-30px",
                  borderRadius: "50%",
                }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/11533/11533705.png"
                  height="35px"
                  width="35px"
                  alt="user"
                  style={{}}
                />
              </div>
              {newUsersCount !== null ? (
                <h6 className="mt-2">
                  New users created in the last 15 days: &nbsp;
                  <b>{newUsersCount}</b>
                </h6>
              ) : (
                <h6 className="mt-2">Error fetching data.</h6>
              )}
            </div>
          </Col>
          {/* https://cdn-icons-png.flaticon.com/128/11533/11533705.png */}
          <Col sm={12} md={6} lg={4} className="balanceCard1">
            <div>
              <div
                style={{
                  height: "50px",
                  width: "50px",
                  display: "flex",
                  background: "rgb(223, 219, 251)",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "-30px",
                  borderRadius: "50%",
                }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/4837/4837101.png"
                  height="50px"
                  width="50px"
                  alt="user"
                  style={{}}
                />
              </div>
              <h6 className="mt-3">
                Total Users: &nbsp;{" "}
                <b style={{ fontSize: "23px", lineHeight: "2px" }}>{count}</b>{" "}
              </h6>
            </div>
          </Col>
          <Col sm={12} md={6} lg={4} className="balanceCard1">
            <div>
              <div
                style={{
                  height: "50px",
                  width: "50px",
                  display: "flex",
                  background: "rgb(220, 251, 219)",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "-30px",
                  borderRadius: "50%",
                }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/9654/9654103.png"
                  height="40px"
                  width="40px"
                  alt="user"
                />
              </div>
              <h6 className="mt-3">
                Active Users: &nbsp;{" "}
                <b style={{ fontSize: "20px" }}>{activeUserCount}</b>{" "}
              </h6>
            </div>
          </Col>
        </Row>
      </Container>

      <h4 className="text-center text-primary">User Details</h4>
      <input
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {/* <button
        className="btn btn-primary"
        onClick={handleSearch}
        style={{ marginLeft: "10px" }}
      >
        Search
      </button> */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-warning">
          <thead className="text-success">
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Sponsor Id</th>
              <th>User Id</th>
              <th>Status</th>
              <th>Block/Unblock</th>
              <th>Activation Time</th>
              <th>Action</th>
              <th>Delete User</th>
            </tr>
          </thead>
          <tbody >
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>{user.sponsorId}</td>
                <td>{user.userId}</td>
                <td>{user.is_active ? "Active" : "Deactive"}</td>
               <td className="text-center"> {user.isBlocked ? (
              <button className="btn btn-danger" onClick={() => handleUnblock(user._id)}>Unblock</button>
            ) : (
              <button className="btn btn-dark"  onClick={() => handleBlock(user._id)}>Block</button>
            )}</td>
                <td>
                  {user.activationTime
                    ? new Date(user.activationTime).toLocaleString()
                    : "Unknown"}
                </td>
                <td>
                  {user.is_active ? (
                    <button
                      className="btn btn-primary"
                      onClick={() => handleDeactivate(user._id)}
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      className="btn btn-success"
                      onClick={() => handleActivate(user._id)}
                    >
                      Activate
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete user
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Container>
        <Row>
          <Col sm={12}>
            <nav aria-label="Page navigation">
              <ul
                className="pagination"
                style={{ display: "flex", justifyContent: "center" }}
              >
                {Array.from({ length: totalPages }, (_, i) => (
                  <li
                    key={i}
                    className={`page-item ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                  >
                    <Button
                      variant="outline-primary m-2"
                      className="page-link "
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  </li>
                ))}
              </ul>
            </nav>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default UserData;
