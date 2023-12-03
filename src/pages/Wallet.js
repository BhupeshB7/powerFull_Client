import React, { useState, useEffect } from "react";
import spinner from "../assets/spinner2.gif";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import TransferForm from "./TransferForm";
function Setting() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  //for navigate user
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
      console.log(result); // check the response data
      setData(result);
      setIsLoading(false);
    };
    fetchData();
  }, [token]);
  if (isLoading) {
    return (
      <h6
        className="text-center"
        style={{
          marginTop: "-70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <img
          src={spinner}
          alt="spinner"
          height="100px"
          width="100px"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </h6>
    );
  }
  const totalIncome =  data.selfIncome + data.teamIncome +data.rewards;
 
  return (
    <>
    {
      data.isBlocked?(
      <>
      <h3 className="text-center text-danger m-3">Sorry, you are blocked from accessing this content.</h3>
      </>
      ):(
      <>
      <div>
      {token ? (
        <div className="setting_dashboard" style={{ background: "#000428" }}>
          <div>
            <h5
              className="text-warning text-center pt-5  m-2fw-bold"
              style={{ fontFamily: "cursive" }}
            >
              Hello, {data.name}
            </h5>
            <h6 className="text-light" style={{paddingLeft:'15px'}} ><b style={{fontFamily:'poppins', fontSize:'36px'}}>"</b> Welcome to the Wallet...</h6>
            <Container>
              <Row>
                <div className="col-11 col-sm-9 col md-6 col-lg-5 balanceCard">
                  <p>TOP UP BALANCE</p>
                  {/* <h4>{topUpAmount !== null ? topUpAmount : 'N/A'} Rs</h4> */}
                  {/* <h6>{data.topUpAmount} Rs</h6> */}
                  {data.topupWallet}
                </div>

                <div className="col-11 col-sm-9 col md-6 col-lg-5 balanceCard">
                  <p>TOTAL BALANCE</p>
                  {/* <h4>{topUpAmount !== null ? topUpAmount : 'N/A'} Rs</h4> */}
                  <h6>{data.balance} Rs</h6>
                </div>
                <div className="col-11 col-sm-9 col md-6 col-lg-5 balanceCard">
                  <p>INCOME WALLET</p>
                  <h6>{data.income} Rs</h6>
                </div>
                <div className="col-11 col-sm-9 col md-6 col-lg-5 balanceCard">
                  <p>WITHDRAWAL WALLET</p>
                  <h6>{data.withdrawal} Rs</h6>
                </div>
              </Row>
            </Container>

            <div className="row rowBalanceCard ">
              <div className="col-12 col-sm-9 col-md-5 col lg-4 ">
                <div className="card incomeCard">
                  <div
                    className="card-heading text-warning"
                    style={{
                      marginLeft: "20px",
                      fontWeight: "600",
                      marginTop: "10px",
                    }}
                  >
                    INCOME
                  </div>
                  <div
                    className="card-text text-light"
                    style={{ marginLeft: "15px" }}
                  >
                    Your Total Income: {totalIncome} Rs
                  </div>
                  <div className="col">
                    <div className="d-flex flex-row">
                      <div className="p-2">
                        <div className="d-flex flex-column income-border">
                          <div className="p-2 text-light">Self Income</div>
                          <div className="p-2" style={{ color: "cyan" }}>
                            {data.selfIncome} Rs
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <div className="d-flex flex-column income-border">
                          <div className="p-2 text-light">Team income</div>
                          <div className="p-2" style={{ color: "cyan" }}>
                            {data.teamIncome} Rs
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <div className="d-flex flex-column">
                          <div className="p-2 text-light">Reward</div>
                          <div className="p-2" style={{ color: "cyan" }}>
                            {data.rewards}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Container>
              <TransferForm sourceUserId={data.userId}/>
            </Container>
            <div className="bottom_section " style={{ marginTop: "100px" }}>
              <div
                className="row  footer_row_content "
                style={{
                  background: "#000428",
                  height: "90px",
                  color: "cyan",
                }}
              >
                <div className="col-12">
                  <div className="footer_container">
                    <div className="footer_content">
                      <Link
                        to="/dashboard"
                        className="footer_icon"
                        style={{ color: "cyan" }}
                      >
                        <img
                          src="https://cdn-icons-png.flaticon.com/128/9187/9187555.png"
                          alt="account Activation"
                          height="35px"
                          width="35px"
                        />
                        <h6 className=" mt-1">Home</h6>
                      </Link>
                      <Link to='/wallet'  style={{ color: "cyan" }} className="footer_icon">
                        <img
                          src="https://cdn-icons-png.flaticon.com/128/9181/9181081.png"
                          alt="wallet"
                          height="35px"
                          width="35px"
                        />
                        <h6 className=" mt-1">Wallet</h6>
                      </Link>
                      <Link
                        to="/game"
                        className="footer_icon"
                        style={{ color: "cyan" }}
                      >
                        <img
                          src="https://cdn-icons-png.flaticon.com/128/8002/8002123.png"
                          alt="fund"
                          height="35px"
                          width="35px"
                        />
                        <h6 className=" mt-1">Game</h6>
                      </Link>
                      <Link to="/setting" className="footer_icon">
                        <img
                          src="https://cdn-icons-png.flaticon.com/128/3953/3953226.png"
                          alt="account Activation"
                          height="35px"
                          width="35px"
                        />
                        <h6 className="mt-1" style={{ color: "cyan" }}>
                          Setting
                        </h6>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
        <h6 className="text-center text-secondary">Re login to continue...</h6>
        <Link to="/login"  style={{textDecoration:'underline'}}><p className="text-center text-primary">Login</p></Link>
        </>
      )}
    </div>
      </>
      )}
    
    </>
  );
}

export default Setting;
