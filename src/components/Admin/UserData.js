// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Button, Col, Container, Row } from "react-bootstrap";

// const itemsPerPage = 20; // Number of items to display per page

// function UserData() {
//   const [users, setUsers] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [count, setCount] = useState(0);
//   const [newUsersCount, setNewUsersCount] = useState(null);
//   const [activeUserCount, setActiveUserCount] = useState(0);
//   useEffect(() => {
//     // Make the API request to fetch daily new users count
//     axios
//       .get("https://cute-puce-xerus.cyclic.app/api/users/daily-new-users")
//       .then((response) => {
//         const { count } = response.data;
//         setNewUsersCount(count);
//       })
//       .catch((error) => {
//         console.error(error);
//         setNewUsersCount(null);
//       });
//   }, []);

//   useEffect(() => {
//     // Fetch data from your backend API
//     fetch("https://cute-puce-xerus.cyclic.app/api/admin/count-active-items")
//       .then((response) => response.json())
//       .then((data) => setActiveUserCount(data.numberOfActiveUser))
//       .catch((error) => console.error(error));
//   }, []);

//   useEffect(() => {
//     fetch("https://cute-puce-xerus.cyclic.app/api/admin/users/count")
//       .then((response) => response.json())
//       .then((data) => setCount(data.count))
//       .catch((error) => console.error(error));
//   }, []);

//   const getUsers = async (page = 1) => {
//     try {
//       const response = await axios.get(
//         `https://cute-puce-xerus.cyclic.app/api/admin/api/users?page=${page}&search=${searchQuery}&itemsPerPage=${itemsPerPage}`
//       );
//       const { users, totalPages } = response.data;
//       setUsers(users);
//       setTotalPages(totalPages);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getUsers();
//   }, [searchQuery]); // Update users when searchQuery changes

//   //   const handleSearch = () => {
//   //     getUsers();
//   //   };

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//     getUsers(newPage);
//   };

//   const handleDeactivate = async (userId) => {
//     try {
//       const response = await axios.patch(
//         `https://cute-puce-xerus.cyclic.app/api/active/${userId}/deactivate`
//       );
//       const updatedUser = response.data;

//       const updatedUsers = users.map((user) =>
//         user._id === updatedUser._id
//           ? {
//               ...user,
//               is_active: updatedUser.is_active,
//               activationTime: updatedUser.activationTime,
//             }
//           : user
//       );
//       setUsers(updatedUsers);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleActivate = async (userId) => {
//     try {
//       const response = await axios.patch(
//         `https://cute-puce-xerus.cyclic.app/api/active/${userId}/activate`
//       );
//       const updatedUser = response.data;

//       const updatedUsers = users.map((user) =>
//         user._id === updatedUser._id
//           ? {
//               ...user,
//               is_active: updatedUser.is_active,
//               activationTime: updatedUser.activationTime,
//             }
//           : user
//       );
//       setUsers(updatedUsers);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleDeleteUser = async (id) => {
//     await axios.delete(
//       `https://cute-puce-xerus.cyclic.app/api/admin/api/users/${id}`
//     );
//     setUsers(users.filter((user) => user._id !== id));
//   };
//   const handleBlock = (id) => {
//     axios.put(`https://cute-puce-xerus.cyclic.app/api/auth/block/${id}`)
//       .then(response => {
//         setUsers(users.map(user => (user._id === id ? response.data : user)));
//       })
//       .catch(error => console.error(error));
//   };

//   const handleUnblock = (id) => {
//     axios.put(`https://cute-puce-xerus.cyclic.app/api/auth/unblock/${id}`)
//       .then(response => {
//         setUsers(users.map(user => (user._id === id ? response.data : user)));
//       })
//       .catch(error => console.error(error));
//   };
//   return (
//     <div className="container-fluid" style={{ backgroundColor: "#fbffde" }}>
//       <Container>
//         <Row className="m-3">
//           <Col sm={12} md={6} lg={4} className="balanceCard1">
//             <div>
//               <div
//                 style={{
//                   height: "50px",
//                   width: "50px",
//                   display: "flex",
//                   background: "rgb(253, 203, 203)",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   marginTop: "-30px",
//                   borderRadius: "50%",
//                 }}
//               >
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/128/11533/11533705.png"
//                   height="35px"
//                   width="35px"
//                   alt="user"
//                   style={{}}
//                 />
//               </div>
//               {newUsersCount !== null ? (
//                 <h6 className="mt-2">
//                   New users created in the last 15 days: &nbsp;
//                   <b>{newUsersCount}</b>
//                 </h6>
//               ) : (
//                 <h6 className="mt-2">Error fetching data.</h6>
//               )}
//             </div>
//           </Col>
//           {/* https://cdn-icons-png.flaticon.com/128/11533/11533705.png */}
//           <Col sm={12} md={6} lg={4} className="balanceCard1">
//             <div>
//               <div
//                 style={{
//                   height: "50px",
//                   width: "50px",
//                   display: "flex",
//                   background: "rgb(223, 219, 251)",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   marginTop: "-30px",
//                   borderRadius: "50%",
//                 }}
//               >
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/128/4837/4837101.png"
//                   height="50px"
//                   width="50px"
//                   alt="user"
//                   style={{}}
//                 />
//               </div>
//               <h6 className="mt-3">
//                 Total Users: &nbsp;{" "}
//                 <b style={{ fontSize: "23px", lineHeight: "2px" }}>{count}</b>{" "}
//               </h6>
//             </div>
//           </Col>
//           <Col sm={12} md={6} lg={4} className="balanceCard1">
//             <div>
//               <div
//                 style={{
//                   height: "50px",
//                   width: "50px",
//                   display: "flex",
//                   background: "rgb(220, 251, 219)",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   marginTop: "-30px",
//                   borderRadius: "50%",
//                 }}
//               >
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/128/9654/9654103.png"
//                   height="40px"
//                   width="40px"
//                   alt="user"
//                 />
//               </div>
//               <h6 className="mt-3">
//                 Active Users: &nbsp;{" "}
//                 <b style={{ fontSize: "20px" }}>{activeUserCount}</b>{" "}
//               </h6>
//             </div>
//           </Col>
//         </Row>
//       </Container>

//       <h4 className="text-center text-primary">User Details</h4>
//       <input
//         type="text"
//         placeholder="Search users..."
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//       />
//       {/* <button
//         className="btn btn-primary"
//         onClick={handleSearch}
//         style={{ marginLeft: "10px" }}
//       >
//         Search
//       </button> */}
//       <div className="table-responsive">
//         <table className="table table-bordered table-striped table-warning">
//           <thead className="text-success">
//             <tr>
//               <th>S.No</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Mobile No</th>
//               <th>Sponsor Id</th>
//               <th>User Id</th>
//               <th>Status</th>
//               <th>Block/Unblock</th>
//               <th>Activation Time</th>
//               <th>Action</th>
//               <th>Delete User</th>
//             </tr>
//           </thead>
//           <tbody >
//             {users.map((user, index) => (
//               <tr key={user._id}>
//                 <td>{index + 1}</td>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>{user.mobile}</td>
//                 <td>{user.sponsorId}</td>
//                 <td>{user.userId}</td>
//                 <td>{user.is_active ? "Active" : "Deactive"}</td>
//                <td className="text-center"> {user.isBlocked ? (
//               <button className="btn btn-danger" onClick={() => handleUnblock(user._id)}>Blocked</button>
//             ) : (
//               <button className="btn btn-dark"  onClick={() => handleBlock(user._id)}>UnBlocked</button>
//             )}</td>
//                 <td>
//                   {user.activationTime
//                     ? new Date(user.activationTime).toLocaleString()
//                     : "Unknown"}
//                 </td>
//                 <td>
//                   {user.is_active ? (
//                     <button
//                       className="btn btn-primary"
//                       onClick={() => handleDeactivate(user._id)}
//                     >
//                       Deactivate
//                     </button>
//                   ) : (
//                     <button
//                       className="btn btn-success"
//                       onClick={() => handleActivate(user._id)}
//                     >
//                       Activate
//                     </button>
//                   )}
//                 </td>
//                 <td>
//                   <button
//                     className="btn btn-danger"
//                     onClick={() => handleDeleteUser(user._id)}
//                   >
//                     Delete user
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <Container>
//         <Row>
//           <Col sm={12}>
//             <nav aria-label="Page navigation">
//               <ul
//                 className="pagination"
//                 style={{ display: "flex", justifyContent: "center" }}
//               >
//                 {Array.from({ length: totalPages }, (_, i) => (
//                   <li
//                     key={i}
//                     className={`page-item ${
//                       currentPage === i + 1 ? "active" : ""
//                     }`}
//                   >
//                     <Button
//                       variant="outline-primary m-2"
//                       className="page-link "
//                       onClick={() => handlePageChange(i + 1)}
//                     >
//                       {i + 1}
//                     </Button>
//                   </li>
//                 ))}
//               </ul>
//             </nav>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// }

// export default UserData;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Col, Container, Modal, Row, Table } from "react-bootstrap";
import UserBalance from "./UserBalance";
import AdminCarouselImage from "./AdminCarouselImage";
import NewUsersChart from "./NewUsersChart";
import UserChart from "./UserChart";
import BonanzaOffers from "../BonanzaOffers";

const itemsPerPage = 20;

function UserData() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [newUsersCount, setNewUsersCount] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationUserId, setConfirmationUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  useEffect(() => {
    axios
      .get("https://cute-puce-xerus.cyclic.app/api/users/daily-new-users")
      .then((response) => {
        const { count } = response.data;
        setNewUsersCount(count);
      })
      .catch((error) => {
        console.error(error);
        setNewUsersCount(null);
      });
  }, []);

  const getUsers = async (page = 1) => {
    try {
      const response = await axios.get(
        `https://cute-puce-xerus.cyclic.app/api/admin/api/users?page=${page}&search=${searchQuery}&itemsPerPage=${itemsPerPage}`
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
  }, [searchQuery]);
  const handleViewDetails = (userId) => {
    const user = users.find((user) => user._id === userId);
    setModalIsOpen(true);
    // console.log(user)
    setSelectedUser(user);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    getUsers(newPage);
  };

  const handleDeactivate = async (userId) => {
    try {
      const response = await axios.patch(
        `https://cute-puce-xerus.cyclic.app/api/active/${userId}/deactivate`
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
        `https://cute-puce-xerus.cyclic.app/api/active/${userId}/activate`
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
      `https://cute-puce-xerus.cyclic.app/api/admin/api/users/${id}`
    );
    setUsers(users.filter((user) => user._id !== id));
  };

  const handleBlock = (id) => {
    // Show the confirmation dialog
    handleConfirmation(id);
  };

  const handleUnblock = (id) => {
    // Show the confirmation dialog
    handleConfirmation(id);
  };

  const handleConfirmation = (userId) => {
    setShowConfirmation(true);
    setConfirmationUserId(userId);
  };

  // const confirmAction = () => {
  //   setShowConfirmation(false);
  //   if (confirmationUserId) {
  //     // Perform the action based on the user's choice
  //     axios
  //       .put(`https://cute-puce-xerus.cyclic.app/api/auth/block/${confirmationUserId}`)
  //       .then((response) => {
  //         setUsers(users.map((user) => (user._id === confirmationUserId ? response.data : user)));
  //       })
  //       .catch((error) => console.error(error));

  //     // Reset the confirmationUserId
  //     setConfirmationUserId(null);
  //   }

  // };
  const confirmAction = async () => {
    setShowConfirmation(false);

    if (confirmationUserId !== null) {
      const updatedUsers = await Promise.all(
        users.map(async (user) => {
          if (user._id === confirmationUserId) {
            const endpoint = user.isBlocked
              ? `https://cute-puce-xerus.cyclic.app/api/auth/unblock/${confirmationUserId}`
              : `https://cute-puce-xerus.cyclic.app/api/auth/block/${confirmationUserId}`;

            try {
              const response = await axios.put(endpoint);
              return response.data;
            } catch (error) {
              console.error(error);
              return user; // Return the original user in case of an error
            }
          } else {
            return user; // Return unchanged users
          }
        })
      );

      // Update the state with the updated users
      setUsers(updatedUsers);

      // Reset the confirmationUserId
      setConfirmationUserId(null);
    }
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: "#fbffde" }}>
      <Container>
        <UserChart />
        <NewUsersChart />
        <BonanzaOffers/>
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
        </Row>
      </Container>
      <AdminCarouselImage />
      <UserBalance />
      <h4 className="text-center text-dark p-2">User Details</h4>
      <input
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="table-responsive">
        <table className="table table-bordered table-striped table-warning">
          <thead className="text-success">
            <tr>
              <th>S.No</th>
              <th>All Details</th>
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
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  <button
                    style={{ minWidth: "130px" }}
                    className="btn btn-primary"
                    onClick={() => handleViewDetails(user._id)}
                  >
                    View Details
                  </button>
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>{user.sponsorId}</td>
                <td>{user.userId}</td>
                <td>{user.is_active ? "Active" : "Deactive"}</td>
                <td className="text-center">
                  {user.isBlocked ? (
                    <button
                      className="btn btn-danger"
                      onClick={() => handleUnblock(user._id)}
                    >
                      Blocked
                    </button>
                  ) : (
                    <button
                      className="btn btn-dark"
                      onClick={() => handleBlock(user._id)}
                    >
                      UnBlocked
                    </button>
                  )}
                </td>
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
      {/*  */}
      {/* React Modal for displaying user details */}
      <Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h6>{selectedUser && selectedUser.userId} All Details...</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{selectedUser.name}</td>
                </tr>
                <tr>
                  <td>UserId</td>
                  <td>{selectedUser.userId}</td>
                </tr>
                <tr>
                  <td>Balance</td>
                  <td>{selectedUser.balance}</td>
                </tr>
                <tr>
                  <td>Income</td>
                  <td>{selectedUser.income}</td>
                </tr>
                <tr>
                  <td>Self Income</td>
                  <td>{selectedUser.selfIncome}</td>
                </tr>
                <tr>
                  <td>Team Income</td>
                  <td>{selectedUser.teamIncome}</td>
                </tr>
                <tr>
                  <td>Topup Wallet</td>
                  <td>{selectedUser.topupWallet}</td>
                </tr>
                <tr>
                  <td>Withdrawal</td>
                  <td>{selectedUser.withdrawal}</td>
                </tr>
                {/* Add other details as needed */}
              </tbody>
            </Table>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalIsOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Container>
        <Row>
          <Col sm={12}>
            <nav aria-label="Page navigation">
              <ul
                className="pagination"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <Button
                    variant="outline-primary m-2"
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                </li>

                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <Button
                    variant="outline-primary m-2"
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </li>
              </ul>
            </nav>
          </Col>
        </Row>
      </Container>

      {/* Confirmation Modal */}
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to Blocked/UnBlocked?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmation(false)}
          >
            Cancel
          </Button>
          <Button variant="success" onClick={confirmAction}>
            {/* {users.isBlocked?"Blocked":"Unblocked"} */} Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserData;
