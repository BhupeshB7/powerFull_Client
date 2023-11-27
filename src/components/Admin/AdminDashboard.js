import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import ReTopupUser from "./ReTopupUser";
import AllFundTransfer from "./AllFundTransfer";
// import api from ''
const getTokenExpireTime = () => {
  const tokenExpire = localStorage.getItem("AdmintokenExpire");
  return tokenExpire ? parseInt(tokenExpire) : null;
};

const isTokenExpired = () => {
  const expireTime = getTokenExpireTime();
  return expireTime ? expireTime < Date.now() : true;
};

const AdminDashboard = () => {
  const [isTokenValid, setIsTokenValid] = useState(true);
  const [tasks, setTasks] = useState([]);
  //show user data state
  const [showData, setShowData] = useState(false);
  // hide user data state
  const [showUserData, setShowUserData] = useState(false);
  //show user data state
  const [showWithdrawal, setShowWithdrawal] = useState(false);
  const [showRetopUp, setShowRetopUp] = useState(false);
  // hide user data state
  const [showUserWithdrawal, setShowUserWithdrawal] = useState(false);
  const [showUserReTopUp, setShowUserRetopUp] = useState(false);
  //for deposit
  const [depositusers, setDepositUsers] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [withdrawalQuerySearch, setWithdrawalQuerySearch] = useState("");
  const [searchDepositQuery, setSearchDepositQuery] = useState("");
  const [numberOfActiveUser, setNumberOfActiveUser] = useState(0);
  const [numberOfInActiveUser, setNumberOfInActiveUser] = useState(0);
  const [userId, setUserId] = useState("");
  // const [userID, setUserID] = useState('');
  const [userDetails, setUserDetails] = useState(null);

  const [balance, setBalance] = useState("");
  const [income, setIncome] = useState("");
  const [selfIncome, setSelfIncome] = useState("");
  const [teamIncome, setTeamIncome] = useState("");
  const [withdrawal, setWithdrawal] = useState("");
  const [rewards, setRewards] = useState("");
  const [transfers, setTransfers] = useState([]);
  useEffect(() => {
    const fetchActiveItemsCount = async () => {
      try {
        const response = await axios.get(
          "https://gspserver-0xs1.onrender.com/api/admin/count-active-items"
        );
        const { numberOfActiveUser } = response.data;
        setNumberOfActiveUser(numberOfActiveUser);
      } catch (error) {
        console.error(error);
      }
    };

    fetchActiveItemsCount();
  }, []);

  //Fetch All task
  useEffect(() => {
    fetchTasks();
  }, []);
  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "https://gspserver-0xs1.onrender.com/api/tasks"
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };

  useEffect(() => {
    const fetchInActiveItemsCount = async () => {
      try {
        const response = await axios.get(
          "https://gspserver-0xs1.onrender.com/api/admin/count-inactive-items"
        );
        const { numberOfInActiveUser } = response.data;
        setNumberOfInActiveUser(numberOfInActiveUser);
      } catch (error) {
        console.error(error);
      }
    };

    fetchInActiveItemsCount();
  }, []);
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `https://gspserver-0xs1.onrender.com/api/deposit/depositusers`
      );
      setDepositUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleApproved = async (userID) => {
    try {
      await axios.patch(
        `https://gspserver-0xs1.onrender.com/api/deposit/activate/${userID}`
      );
      // const updatedUser = response.data;

      // const updatedUsers = users.map((user) =>
      //   user._id === updatedUser._id ? { ...user, is_active: updatedUser.is_active, activationTime: updatedUser.activationTime } : user
      // );
      // setDepositUsers(response.data);
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };
  const [showDeposit, setShowDeposit] = useState(false);

  const handleDeposit = () => {
    setShowDeposit(!showDeposit);
  };

  //
  //for Task management Done
  //show user data state
  const [showTask, setShowTask] = useState(false);
  // hide user data state
  const [showUserTask, setShowUserTask] = useState(false);
  useEffect(() => {
    if (isTokenExpired()) {
      setIsTokenValid(false);
      // redirect to homepage
      window.location.href = "/admin-login";
    }
  }, []);

  const [withdrawalRequests, setWithdrawalRequests] = useState([]);
  // const [transactionNumber, setTransactionNumber] = useState('');
  const [transaction, setTransaction] = useState("");

  useEffect(() => {
    axios
      .get("https://gspserver-0xs1.onrender.com/api/withdrawals")
      .then((response) => setWithdrawalRequests(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleWithdrawalSearch = async () => {
    // Call the API endpoint with the search query parameter
    const response = await fetch(
      `https://gspserver-0xs1.onrender.com/api/withdrawals?search=${withdrawalQuerySearch}`
    );
    const data = await response.json();
    setWithdrawalRequests(data);
  };
  const handleApprove = async (id) => {
    try {
      const response = await axios.put(
        `https://gspserver-0xs1.onrender.com/api/withdrawals/${id}`,
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

  //User Management
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  const getUsers = async () => {
    const response = await axios.get(
      "https://gspserver-0xs1.onrender.com/api/admin/api/users"
    );
    setUsers(response.data);
  };
  // getUsers();
  // }, []);
  useEffect(() => {
    getUsers();
  }, []);

  // Fund useEffect start
  useEffect(() => {
    fetchTransferDetail();
  }, []);
  // Fund useEffect End
  const handleSearch = async () => {
    // Call the API endpoint with the search query parameter
    const response = await fetch(
      `https://gspserver-0xs1.onrender.com/api/admin/api/users?search=${searchQuery}`
    );
    const data = await response.json();
    setUsers(data);
  };

  const handleDeleteUser = async (id) => {
    await axios.delete(
      `https://gspserver-0xs1.onrender.com/api/admin/api/users/${id}`
    );
    setUsers(users.filter((user) => user._id !== id));
  };

  // show the user data function
  const handleShow = () => {
    setShowData(!showData);
  };
  const handleClick = () => {
    handleShow();
    toggleContentVisibility();
  };
  const toggleContentVisibility = () => {
    setShowUserData(!showUserData);
  };

  // show the user Task function
  const handleTask = () => {
    setShowTask(!showTask);
  };
  const handleClickTask = () => {
    handleTask();
    toggleContentVisibilityTask();
  };
  const toggleContentVisibilityTask = () => {
    setShowUserTask(!showUserTask);
  };

  // show the user data function
  const handleShowWithdrawal = () => {
    setShowWithdrawal(!showWithdrawal);
  };
  const handleClickWithdrawal = () => {
    handleShowWithdrawal();
    toggleContentVisibilityWithdrawal();
  };
  const toggleContentVisibilityWithdrawal = () => {
    setShowUserWithdrawal(!showUserWithdrawal);
  };
  const handleShowRetopUp = () => {
    setShowRetopUp(!showRetopUp);
  };
  const handleClickRetopUp = () => {
    handleShowRetopUp();
    toggleContentVisibilityRetopUp();
  };
  const toggleContentVisibilityRetopUp = () => {
    setShowUserRetopUp(!showUserReTopUp);
  };

  const handleActivate = async (userId) => {
    try {
      const response = await axios.patch(
        `https://gspserver-0xs1.onrender.com/api/active/${userId}/activate`
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

  const handleDeactivate = async (userId) => {
    try {
      const response = await axios.patch(
        `https://gspserver-0xs1.onrender.com/api/active/${userId}/deactivate`
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
  const handleWithdrawalDelete = async (request) => {
    try {
      await axios.delete(
        `https://gspserver-0xs1.onrender.com/api/withdrawalWallet/${request._id}`
      );
      alert("Deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("An error occurred while deleting the user.");
    }
  };

  const fetchUserAccountDetails = async () => {
    try {
      const response = await axios.get(
        "https://gspserver-0xs1.onrender.com/api/users/sponsors",
        {
          params: {
            userId: userId,
          },
        }
      );

      setUserDetails(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("SORRY, UserId not Found!");
      }
      console.error(error);
    }
  };

  const handleButtonClick = () => {
    if (userId) {
      fetchUserAccountDetails();
    }
  };

  // const handleUserIdChange = (e) => {
  //   setUserId(e.target.value);
  // };

  const formatActivationTime = (time) => {
    const formattedTime = new Date(time).toLocaleString();
    return formattedTime;
  };

  const handleWithdrawalSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://gspserver-0xs1.onrender.com/api/users/userWalletUpdating/",
        {
          userId,
          balance,
          income,
          selfIncome,
          teamIncome,
          withdrawal,
          rewards,
        }
      );
      console.log(response.data); // User wallet updated successfully
      alert("Wallet updated successfully!");
    } catch (error) {
      console.error(error);
    }
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
        `https://gspserver-0xs1.onrender.com/api/deposit/delete/${id}`
      );
      // console.log('Deposit deleted');
      alert(response.data);
      window.location.href = "/admin/dashboard";
    } catch (error) {
      alert(error.response.data);
      console.log(error);
    }
  };
  // Delete all task
  const handleDeleteAllTasks = async () => {
    try {
      await axios.delete("https://gspserver-0xs1.onrender.com/api/tasks");
      // After successful deletion, refetch the tasks to update the list
      alert("All Task Deleted SuccessFully!");
      fetchTasks();
    } catch (error) {
      console.error("Failed to delete all tasks", error);
    }
  };
  // Validation schema using Yup
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    videoLink: Yup.string().required("Video Link is required"),
  });

  // Handle form submission
  const handleCreateTask = async (values, { resetForm }) => {
    try {
      await axios.post("https://gspserver-0xs1.onrender.com/api/tasks", values);
      // Clear the input fields
      alert("Task Created SuccessFully");
      resetForm();
    } catch (error) {
      console.error("Failed to create a task", error);
    }
  };
  //Fund Api and Function code
  const fetchTransferDetail = async () => {
    try {
      const response = await axios.get(
        "https://gspserver-0xs1.onrender.com/api/transferDetail"
      );
      setTransfers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching transfer details:", error);
    }
  };

  const handleFundApprove = async (userId) => {
    if (window.confirm("Are You Sure For Approve Fund?")) {
      try {
        await axios.post(
          `https://gspserver-0xs1.onrender.com/api/transfer/approve/${userId}`
        );
        fetchTransferDetail(); // Refresh the list of transfers after approving
      } catch (error) {
        console.error("Error approving transfer:", error);
      }
    }
  };

  const handleFundReject = async (userId) => {
    if (window.confirm("Are you sure?")) {
      try {
        await axios.post(
          `https://gspserver-0xs1.onrender.com/api/transfer/reject/${userId}`
        );
        fetchTransferDetail(); // Refresh the list of transfers after rejecting
        alert("Fund Rejected!");
      } catch (error) {
        console.error("Error rejecting transfer:", error);
      }
    }
  };

  return (
    <div>
      {isTokenValid ? (
        <>
          <div className="container-fluid admin-dashboard">
            {/* <button onClick={handleLogout}>Logout</button> */}
            {/*  */}

            <ul className="list-group m-2">
              <li className="list-group-item">
                <h6
                  className="text-secondary"
                  style={{ cursor: "pointer" }}
                  onClick={handleDeposit}
                >
                  {showDeposit ? "Hide deposit" : "Show Deposit"}{" "}
                </h6>
              </li>
              <li className="list-group-item">
                <h6
                  className="text-secondary"
                  style={{ cursor: "pointer" }}
                  onClick={handleClickWithdrawal}
                >
                  {showUserWithdrawal ? "Hide WithDrawal" : "Show Withdrawal"}
                </h6>
              </li>
              <li className="list-group-item">
                <h6
                  className="text-secondary"
                  style={{ cursor: "pointer" }}
                  onClick={handleClickTask}
                >
                  {showUserTask ? "Hide Task" : "Show Task"}
                </h6>
              </li>
              <li className="list-group-item">
                <h6
                  className="text-secondary"
                  style={{ cursor: "pointer" }}
                  onClick={handleClick}
                >
                  {showUserData ? "Hide User" : "show user"}
                </h6>
              </li>
              <li className="list-group-item">
                <h6
                  className="text-secondary"
                  style={{ cursor: "pointer" }}
                  onClick={handleClickRetopUp}
                >
                  {showUserReTopUp ? "Hide ReTopUp" : "Show ReTopUp"}
                </h6>
              </li>
            </ul>
            {/*  */}

            {/* <h1>Welcome to the Admin Dashboard!</h1> */}
            {/*  */}
            {/*  */}
            {showDeposit && (
              <>
                <div className="m-1">
                  {/* <FundTransfer/> */}

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
                            <th>Status</th>
                            <th>Actions</th>
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
                                    <td>{transferDetail.status}</td>
                                    <td>
                                    {/* {console.log("*-----TransferId----*")}
                                      {console.log(transfer.id)}
                                      {console.log("*------------*")} */}
                                      <button
                                        className="btn btn-success sm m-1"
                                        onClick={() =>
                                          handleFundApprove(transfer.id)
                                        }
                                      >
                                        Approve
                                      </button>
                                      <button
                                        className="btn btn-danger sm m-1"
                                        onClick={() =>
                                          handleFundReject(transfer.id)
                                        }
                                      >
                                        Reject
                                      </button>
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
                </div>
                <AllFundTransfer />
                <h5 className="text-secondary">All Deposit</h5>
                <h1>User List</h1>
                {/* <ul>
        {depositusers.map(user => (
          <li key={user._id}>
            <p>Name: {user.name}</p>
            <p>Transaction ID: {user.transactionId}</p>
            <p>User ID: {user.userID}</p>
            <img src={`https://gspserver-0xs1.onrender.com/${user.image}`} alt={user.name} />
          </li>
        ))}
      </ul> */}
                <div>
                  <h1>Deposit Users</h1>
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchDepositQuery}
                    onChange={(e) => setSearchDepositQuery(e.target.value)}
                  />
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped table-dark">
                      <thead>
                        <tr>
                          <th>S.No.</th>
                          <th>Name</th>
                          <th>Transaction ID</th>
                          <th>User ID</th>
                          <th>Amount</th>
                          <th>Image</th>
                          <th>Action</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {depositusers.map((user, index) => (
                          <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.transactionId}</td>
                            <td>{user.userID}</td>
                            <td>{user.depositAmount}</td>
                            <td>
                              <img
                                src={`https://gspserver-0xs1.onrender.com/${user.image}`}
                                alt="Deposit user"
                                width="100"
                                height="100"
                              />
                            </td>
                            {/* <td> <button className="btn btn-success">Approved</button> </td> */}
                            <td>
                              {user.isApproved ? (
                                <>
                                  <h6>Approved</h6>
                                </>
                              ) : (
                                <>
                                  <button
                                    className="btn btn-success"
                                    onClick={() => handleApproved(user._id)}
                                  >
                                    Approved
                                  </button>
                                </>
                              )}
                            </td>

                            <td>
                              {" "}
                              <button
                                className="btn btn-danger"
                                onClick={() => handleDeleteDeposit(user._id)}
                              >
                                Delete
                              </button>{" "}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
            {showData && (
              <div className="container-fluid">
                <h1 className="text-center">User Management</h1>
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  className=" btn btn-primary"
                  onClick={handleSearch}
                  style={{ marginLeft: "10px" }}
                >
                  Search
                </button>
                <h5>Number of active users: {numberOfActiveUser}</h5>
                <h5>Number of Total users: {numberOfInActiveUser}</h5>
                <table className="table table-striped table-light">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Mobile No</th>
                      <th>Sponsor Id</th>
                      <th>User Id</th>
                      <th>Status</th>
                      <th>Activtion Time</th>
                      <th>Action</th>
                      <th>Delete User</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={user._id}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.mobile}</td>
                        <td>{user.sponsorId}</td>
                        <td>{user.userId}</td>
                        <td>{user.is_active ? "Active" : "Deactive"}</td>
                        <td>
                          {user.activationTime
                            ? new Date(user.activationTime).toLocaleString()
                            : "Unknown"}
                        </td>
                        <td>
                          {user.is_active ? (
                            <button
                              className="btn btn-dark"
                              onClick={() => handleDeactivate(user._id)}
                            >
                              Deactivate
                            </button>
                          ) : (
                            <button
                              className="btn btn-secondary"
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
            )}
            {/* For Task */}
          </div>
          {/*  */}
          {showTask && (
            <>
              {/* <div className="form_container">

                <form onSubmit={handleSubmit}>
                  <div className="formInput">

                    <div className='form_input'>
                      <label htmlFor="title">Title:</label>
                      <input type="text" name="title" value={title}  required />
                    </div>
                    <div className='form_input'>
                      <label htmlFor="videoLink">Video URL:</label>
                      <input type="text" name="videoLink" value={videoLink} onChange={handleInputChange} required />
                    </div>
                    <button type="submit" className='form_button' >Add Task</button>
                  </div>
                </form>
              </div> */}
              <div className="text-center text-secondary mt-3">
                <Formik
                  initialValues={{
                    title: "",
                    videoLink: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleCreateTask}
                >
                  {({ isSubmitting }) => (
                    <Form style={{ marginLeft: "20px" }}>
                      <h5 className="m-3" style={{ color: "#aaa" }}>
                        CREATE A NEW TASK
                      </h5>
                      <div>
                        <label className="fw-bold m-2">Title:</label>
                        <Field
                          type="text"
                          name="title"
                          style={{
                            padding: "10px",
                            width: "280px",
                            background: "transparent",
                          }}
                          required
                        />
                        <ErrorMessage
                          name="title"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="text-center text-secondary mt-3">
                        <label className="fw-bold m-2">Video Link:</label>
                        <Field
                          type="text"
                          name="videoLink"
                          style={{
                            padding: "10px",
                            width: "300px",
                            background: "transparent",
                          }}
                          required
                        />
                        <ErrorMessage
                          name="videoLink"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="m-3 text-secondary fw-bold"
                        style={{
                          width: "200px",
                          padding: "10px",
                          background: "transparent",
                          fontSize: "20px",
                        }}
                      >
                        {isSubmitting ? "Creating..." : "Create Task"}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
              <div>
                <h6 className="m-2">TASK LIST</h6>
                <ul>
                  {tasks.map((task) => (
                    <li key={task._id}>
                      <h6>Title:- {task.title} </h6>{" "}
                      <h6>VideoLink- {task.videoLink}</h6>
                    </li>
                  ))}
                </ul>
                <button onClick={handleDeleteAllTasks}>Delete All Tasks</button>
              </div>
            </>
          )}
          {/* For Withdrawal */}
          {showRetopUp && <ReTopupUser />}
          {showWithdrawal && (
            <div className="container-fluid">
              <h3
                className="text-center mt-3"
                style={{ fontWeight: "bold", color: "gray" }}
              >
                WithDrawal History
              </h3>

              <div className="form_container mt-5">
                <form>
                  <h6>
                    Check user validation for withdrawal or check user
                    balance...
                  </h6>
                  <div className="formInput mb-3">
                    <label>User Account</label>
                    <input
                      type="text"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      placeholder="Enter User ID"
                      required
                    />
                  </div>
                </form>
              </div>
              <div
                className="content d-flex"
                style={{ justifyContent: "center" }}
              >
                <button
                  className="btn btn-success mt-3"
                  style={{ width: "300px" }}
                  onClick={handleButtonClick}
                >
                  Check
                </button>
              </div>
              {userDetails ? (
                <>
                  <div className="form_container mt-3">
                    <form>
                      <h5 className="mt-3 text-secondary text-center">
                        User Withdrawal Details
                      </h5>
                      <h6>Name: {userDetails.name}</h6>
                      <h6>Income: {userDetails.income}</h6>
                      <h6>Balance: {userDetails.balance}</h6>
                      <h6>SelfIncome: {userDetails.selfIncome}</h6>
                      <h6>TeamIncome: {userDetails.teamIncome}</h6>
                      <h6>withdrawal : {userDetails.withdrawal}</h6>
                      <h6>Rewards : {userDetails.rewards}</h6>
                      <h6>Account No : {userDetails.accountNo}</h6>
                      <h6>IFSC CODE: {userDetails.ifscCode}</h6>
                      <h6>Google Pay: {userDetails.GPay}</h6>
                      <h6>
                        Activation Time:{" "}
                        {formatActivationTime(userDetails.activationTime)}
                      </h6>
                      <h6>
                        Created Time:{" "}
                        {formatActivationTime(userDetails.createdAt)}
                      </h6>
                    </form>
                  </div>
                </>
              ) : (
                <>
                  <h6>Not Available</h6>
                </>
              )}
              {/*  */}

              <div className="form_container">
                <form>
                  <h6 className="mt-3">Update Wallet</h6>
                  <div className="formInput">
                    <label> User Id must required! for update wallet.</label>
                    {/* <label> User ID:</label> */}
                    <input
                      type="text"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      placeholder="User ID"
                    />
                    {/* <label> Balance: </label> */}
                    <input
                      type="text"
                      value={balance}
                      onChange={(e) => setBalance(e.target.value)}
                      placeholder="Balance"
                    />

                    {/* <label> Income: </label> */}
                    <input
                      type="text"
                      value={income}
                      onChange={(e) => setIncome(e.target.value)}
                      placeholder="income"
                    />

                    {/* <label>Self Income: </label> */}
                    <input
                      type="text"
                      value={selfIncome}
                      onChange={(e) => setSelfIncome(e.target.value)}
                      placeholder="Self income"
                    />

                    {/* <label> Team Income: </label> */}
                    <input
                      type="text"
                      value={teamIncome}
                      onChange={(e) => setTeamIncome(e.target.value)}
                      placeholder="Team Income"
                    />

                    {/* <label>Withdrawal: </label> */}
                    <input
                      type="text"
                      value={withdrawal}
                      onChange={(e) => setWithdrawal(e.target.value)}
                      placeholder="Withdrawal"
                    />

                    {/* <label>Rewards:</label> */}
                    <input
                      type="text"
                      value={rewards}
                      onChange={(e) => setRewards(e.target.value)}
                      placeholder="Rewards"
                    />

                    <button
                      type="submit"
                      className="mb-3 btn btn-danger"
                      onClick={handleWithdrawalSubmit}
                    >
                      Update User Wallet
                    </button>
                  </div>
                </form>
              </div>
              <h1>Withdrawal Requests</h1>
             
              <input
                type="text"
                placeholder="Search users..."
                value={withdrawalQuerySearch}
                onChange={(e) => setWithdrawalQuerySearch(e.target.value)}
              />
              <button
                className=" btn btn-primary"
                onClick={handleWithdrawalSearch}
                style={{ marginLeft: "10px" }}
              >
                Search
              </button>

              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <tr>S.No.</tr>
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
                      <td>Delete</td>
                      <td>Date</td>
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
                            <button
                              className="btn btn-success"
                              onClick={() => handleApprove(request._id)}
                            >
                              Approve
                            </button>
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
            </div>
          )}
        </>
      ) : (
        <h1>Your session has expired. Please log in again.</h1>
      )}
    </div>
  );
};

export default AdminDashboard;
