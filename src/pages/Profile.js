import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import spinner from "../assets/spinner2.gif";
import { Button, Col, Container, Row } from "react-bootstrap";
function Profile() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  //for navigate user
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://mlm-psi.vercel.app/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      console.log(result); // check the response data
      if (result.role) {
        const userrole = result.role;
        if (userrole === "admin") {
          localStorage.setItem("check", "nfwnwen");
        }
      }
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
  //for user go to dashboard
  const handleDashBoard = () => {
    navigate("/dashboard");
  };
  // for user go to profile Update
  const handleProfile = () => {
    navigate("/profile-update");
  };
  return (
    <div>
      {token ? (
        <div className="topUPBg">
          <div className="login_Image ">
            <Container>
              <Row>
                <Col xs={12} md={12}>
                  <h5 className="text-center text-secondary">
                    Welcome, {data.name}
                  </h5>
                  <div
                    className="table-responsive"
                    style={{ marginTop: "20px", color: "white" }}
                  >
                    <table className="table table-bordered text-white">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">{data.name}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Email:</td>
                          <td>{data.email}</td>
                        </tr>
                        <tr>
                          <td>Mobile:</td>
                          <td>{data.mobile}</td>
                        </tr>
                        <tr>
                          <td>SponsorId:</td>
                          <td>{data.sponsorId}</td>
                        </tr>
                        <tr>
                          <td>UserId:</td>
                          <td>{data.userId}</td>
                        </tr>
                        <tr>
                          <td>Biography:</td>
                          <td>{data.bio}</td>
                        </tr>
                        <tr>
                          <td>Account No:</td>
                          <td>{data.accountNo}</td>
                        </tr>
                        <tr>
                          <td>IFSC CODE:</td>
                          <td>{data.ifscCode}</td>
                        </tr>

                        <tr>
                          <td>Profile Created:</td>
                          <td>{data.createdAt}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Col>
                <div className="container ">
                  <Button
                    className="m-1 changePasswordButton"
                    onClick={handleDashBoard}
                  >
                    DashBoard
                  </Button>
                  <Button
                    className="m-1 changePasswordButton"
                    onClick={handleProfile}
                  >
                    ProfileUpdate
                  </Button>
                </div>
              </Row>
            </Container>
          </div>
        </div>
      ) : (
        <>
          <h6 className="text-center text-secondary">
            Re login to continue...
          </h6>
          <Link
            to="/login"
            className="text-center text-primary"
            style={{ textDecoration: "underline" }}
          >
            Login
          </Link>
        </>
      )}
    </div>
  );
}

export default Profile;
