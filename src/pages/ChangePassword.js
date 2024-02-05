import React, { useState, useEffect } from "react";
import spinner from "../assets/spinner2.gif";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
function ChangePassword() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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
      //   console.log(result); // check the response data

      setData(result);
      setIsLoading(false);
    };
    fetchData();
  }, [token]);
  const userId = "abcd";
  const handleChangePassword = async () => {
    setOldPasswordError("");
    setNewPasswordError("");
    setConfirmPasswordError("");
    setSuccessMessage("");
    setErrorMessage("");
    let hasError = false;

    if (!oldPassword) {
      setOldPasswordError("Please enter Old Password");
      hasError = true;
    }

    if (!newPassword) {
      setNewPasswordError("Please enter New Password");
      hasError = true;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Please enter Confirm Password");
      hasError = true;
    }
    if (newPassword === oldPassword) {
      if (!newPassword) {
        setNewPasswordError("Please enter New Password");
        hasError = true;
        return;
      }
      setNewPasswordError("New Password must be different from Old Password");
      hasError = true;
    }
    if (newPassword !== confirmPassword) {
      setConfirmPasswordError("New Password and Confirm Password must match");
      hasError = true;
    }

    if (!hasError) {
      try {
        const response = await fetch(
          "https://mlm-eo5g.onrender.com/api/change-password",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: data.userId, // Move the data.userId here
              oldPassword,
              newPassword,
              confirmPassword,
            }),
          }
        );

        const responseData = await response.json();

        if (response.status === 200) {
          // Password changed successfully, set the success message
          setSuccessMessage(responseData.message);
        } else {
          // Handle the error and set the error message
          setErrorMessage(responseData.message);
        }
      } catch (error) {
        console.log(error);
        // Handle network or other errors and set the error message
        setErrorMessage("An error occurred while updating the password.");
      }
    }
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
  const dashboard = () => {
    window.location.href = "/dashboard";
  };
  return (
    <div>
      {token ? (
        <div className="topUPBg">
          <Container className="login_Image ">
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
            <Row>
              <h6 className="text-center text-light">Change Password</h6>

              <Col xs={12} sm={12} md={12}>
                <div className="changePassword">
                  {successMessage && (
                    <Alert variant="success">{successMessage}</Alert>
                  )}
                  {errorMessage && (
                    <Alert variant="danger">{errorMessage}</Alert>
                  )}
                  <div>
                    <label>Old Password</label> <br />
                    <input
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      required
                    />
                    {oldPasswordError && (
                      <Alert variant="danger" style={{ width: "300px" }}>
                        {oldPasswordError}
                      </Alert>
                    )}
                  </div>
                  <div>
                    <label>New Password</label>
                    <br />
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    {newPasswordError && (
                      <Alert variant="danger" style={{ width: "300px" }}>
                        {newPasswordError}
                      </Alert>
                    )}
                  </div>

                  <div>
                    <label>Confirm Password</label> <br />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {confirmPasswordError && (
                      <Alert variant="danger" style={{ width: "300px" }}>
                        {confirmPasswordError}
                      </Alert>
                    )}
                  </div>
                  <Button
                    variant="warning"
                    className="changePasswordButton"
                    onClick={handleChangePassword}
                  >
                    Update Password
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        <>
          <h6 className="text-center text-secondary m-3">
            Re login to continue...
          </h6>
          <div className="text-center">
            <Link
              to="/login"
              className="text-center text-primary"
              style={{ textDecoration: "underline" }}
            >
              Login
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default ChangePassword;
