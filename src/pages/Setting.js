import React, { useState, useEffect } from "react";
import spinner from "../assets/spinner2.gif";
import { BsWhatsapp } from "react-icons/bs";
import QRCodeGenerator from "./QRCodeGenerator";
import { Link } from "react-router-dom";
function Setting() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [copied, setCopied] = useState(false);
  //for navigate user
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://mlm-eo5g.onrender.com/api/users/profile",
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

  const referralLink = `https://powerfullindia.com/register?ref=${data.userId}`;
  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(referralLink)
        .then(() => setCopied(true))
        .catch((error) => console.error("Failed to copy: ", error));
    } else {
      fallbackCopyTextToClipboard(referralLink);
    }
  };
  const handleWhatsAppClick = () => {
    const message = ` https://powerfullindia.com/register?ref=${data.userId}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://api.whatsapp.com/send?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };
  const fallbackCopyTextToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // Set the textarea off-screen
    textArea.style.position = "fixed";
    textArea.style.top = "-9999px";
    textArea.style.left = "-9999px";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand("copy");
      setCopied(successful);
    } catch (error) {
      console.error("Failed to copy: ", error);
    }

    document.body.removeChild(textArea);
  };
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

  // For User LogOut
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };
  // For User LogOut
  const handleLogin = () => {
    window.location.href = "/login";
  };
  return (
    <div>
      {token ? (
        <div className="setting_dashboard" style={{ background: "#000428" }}>
          <div>
            <h5
              className="text-warning text-center pt-5 fw-bold"
              style={{ fontFamily: "sans-serif" }}
            >
              Hello, {data.name}
            </h5>
            <div className="mt-3">
              <h6 style={{ marginLeft: "20%" }}> PROFILE </h6>
            </div>
            < div className="container">
              <div className="row">
                <div className="col-11  col-sm-9 col md-6 col-lg-5 balanceCard ">
                  <li>
                    <a
                      className="nav-link active"
                      aria-current="page"
                      href="/profile"
                      style={{ color: "cyan", fontWeight: "600" }}
                    >
                      {" "}
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/10613/10613753.png"
                        alt="profile"
                        height="20px"
                        width="20px"
                      />{" "}
                      &nbsp; Profile{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      className="nav-link active"
                      aria-current="page"
                      href="/profile-update"
                      style={{ color: "cyan", fontWeight: "600" }}
                    >
                      {" "}
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/11121/11121490.png"
                        alt="Profile update"
                        height="20px"
                        width="20px"
                      />{" "}
                      &nbsp; Profile-update{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      className="nav-link active"
                      aria-current="page"
                      href="/change-password"
                      style={{ color: "cyan", fontWeight: "600" }}
                    >
                      {" "}
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/11135/11135315.png "
                        alt="forgot Password"
                        height="23px"
                        width="23px"
                      />{" "}
                      &nbsp; Change password{" "}
                    </a>
                  </li>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <h6 style={{ marginLeft: "20%" }}> LINKS </h6>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-11  col-sm-9 col md-6 col-lg-5 balanceCard ">
                  <li>
                    {isLoggedIn ? (
                      <div
                        onClick={handleLogout}
                        style={{ color: "cyan", cursor: "pointer" }}
                      >
                        <img
                          src="https://cdn-icons-png.flaticon.com/128/10313/10313098.png"
                          alt="forgot Password"
                          height="23px"
                          width="23px"
                        />{" "}
                        &nbsp; LogOut{" "}
                      </div>
                    ) : (
                      <>
                        {" "}
                        <button
                          className="btn btn-secondary"
                          onClick={handleLogin}
                        >
                          Login
                        </button>
                      </>
                    )}
                  </li>
                </div>
              </div>
            </div>
            {/* Referral Section */}
            <div className="row rowBalanceCard">
              <div className="col-12 col-sm-9 col-md-5 col-lg-4 ">
                <div className="card mb-3 referralCard">
                  <div className="card-heading" style={{ color: "darkorchid" }}>
                    Referral Link
                  </div>
                  <div>
                    <div className="form_input">
                      <input
                        type="text"
                        value={referralLink}
                        readOnly
                        style={{ color: "#eee" }}
                      />
                    </div>

                    <button className="referral-button" onClick={handleCopy}>
                      {copied ? (
                        <div className="text-light">Copied!</div>
                      ) : (
                        <>
                          {/* <h6 className='text-dark' style={{paddingTop:"5px"}}>COPY LINK</h6> */}
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/1828/1828249.png"
                            height="25px"
                            width="25px"
                            alt=""
                          />
                        </>
                      )}
                    </button>

                    <div style={{ marginLeft: "20px", display: "inline" }}>
                      {/* <a className='text-success' href={`https://api.whatsapp.com/send?text=${encodeURIComponent(referralLink)}`} target="_blank"> */}

                      <BsWhatsapp
                        style={{
                          height: "28px",
                          width: "28px",
                          color: "green",
                        }}
                        onClick={handleWhatsAppClick}
                      />
                      <div>
                        <QRCodeGenerator userId={data.userId} />
                      </div>
                    </div>
                  </div>
                  {/*  */}
                </div>
              </div>
            </div>
            {/* Referal section End */}

            <div className="bottom_section " style={{ marginTop: "90px" }}>
            <div
              className="row  footer_row_content"
              style={{
                height: "90px",
            color:'cyan'
              }}
            >
              <div className="col-12">
                <div className="footer_container">
                  <div className="footer_content">
                    <Link to='/dashboard' className="footer_icon" style={{color:'cyan'}}>
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/9187/9187555.png"
                        alt="account Activation"
                        height="35px"
                        width="35px"
                      />
                      <h6 className=" mt-1">Home</h6>
                    </Link>
                    <Link to='/wallet'  className="footer_icon">
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/9181/9181081.png"
                        alt="wallet"
                        height="35px"
                        width="35px"
                      />
                      <h6 className="mt-1" style={{color:'cyan'}}>Wallet</h6>
                    </Link>
                    <Link to='/game/colorpridiction'  className="footer_icon" style={{color:'cyan'}}>
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/8002/8002123.png"
                        alt="fund"
                        height="35px"
                        width="35px"
                      />
                      <h6 className="mt-1">Game</h6>
                    </Link>
                    <Link to='/setting' className="footer_icon" >
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/3953/3953226.png"
                        alt="account Activation"
                        height="35px"
                        width="35px"
                      />
                      <h6 className="mt-1" style={{color:'cyan'}}>Setting</h6>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      ) : (
        <h3>Re login to continue...</h3>
      )}
    </div>
  );
}

export default Setting;
