
import axios from "axios";
import React, { useEffect, useState } from "react";
import {  Container } from "react-bootstrap";
import { Link } from "react-router-dom";
// import spinner from '../assets/spinner2.gif'
const SpinGame = () => {
return (
    <>
    <>
     <div style={{backgroundColor:'black', minHeight:'100vh',}}>

        <Container >
            <h3 className="text-center text-warning pt-5">Comming Soon...</h3>
            <h6 className="text-center text-info pt-2">we Apologize for this convenience</h6>
        </Container>
      <div>
        <div className="bottom_section " style={{ marginTop: "100px" }}>
          <div
            className="row footer_row_content"
            style={{ height: "90px", color: "cyan", background: "#000427" }}
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
                  <div className="footer_icon">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/10701/10701014.png"
                      alt="wallet"
                      height="40px"
                      width="40px"
                      className="dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    />
                    <h6
                      className="mt-1 dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Menu
                    </h6>
                    <ul className="dropdown-menu">
                      <li>
                        <h6
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                        >
                          Deposit
                        </h6>
                      </li>
                      <li>
                        <h6
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop2"
                        >
                          Withdrawal
                        </h6>
                      </li>
                      <li>
                        <h6
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop3"
                        >
                          Withdrawal History
                        </h6>
                      </li>
                      <li>
                        <h6
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop4"
                        >
                          Deposit History
                        </h6>
                      </li>
                    </ul>
                  </div>
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
                    <h6 className="mt-1">Game</h6>
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
    </>
  
</>
  );
};

export default SpinGame;
