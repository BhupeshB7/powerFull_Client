import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import NavbarComponent from "./NavbarComponent";
import ContactInfo from "../ContactInfo";

const UserWallet = () => {
  const [isTokenValid, setIsTokenValid] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const [userId, setUserId] = useState('');
  const [balance, setBalance] = useState('');
  const [income, setIncome] = useState('');
  const [selfIncome, setSelfIncome] = useState('');
  const [teamIncome, setTeamIncome] = useState('');
  const [withdrawal, setWithdrawal] = useState('');
  const [rewards, setRewards] = useState('');
 
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
  const handleWalletSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://mlm-psi.vercel.app/api/users/userWalletUpdating/",
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
      // console.log(response.data); // User wallet updated successfully
      alert("Wallet updated successfully!");
    } catch (error) {
      console.error(error);
    }
  };
  const fetchUserAccountDetails = async () => {
    try {
      const response = await axios.get(
        "https://mlm-psi.vercel.app/api/users/sponsors",
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
  const formatActivationTime = (time) => {
    const formattedTime = new Date(time).toLocaleString();
    return formattedTime;
  };
  return (
    <div style={{backgroundColor:'#fbffde'}}>
      {isTokenValid ? 
      (
          <div >
            <NavbarComponent/>
            <ContactInfo />
          <Container>
            <div className="form_container pt-5">
              <form>
                <h6>
                  Check user Account...
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
                <h6 className="text-center text-secondary">Not Available</h6>
              </>
            )}
          </Container>
          <Container>
        <div className="form_container">
          <form>
            <h6 className="mt-3 text-warning">Update Wallet</h6>
            <div className="formInput">
              <label className="text-danger"> User Id must required! for update wallet.</label>
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
                onClick={handleWalletSubmit}
              >
                Update User Wallet
              </button>
            </div>
          </form>
        </div>
      </Container>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserWallet;
