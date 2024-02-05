import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
// import ReCAPTCHA from 'react-google-recaptcha';
import logo from "../assets/PI1.png";
import registerImage from "../assets/register.png";
import congrats from "../assets/congrats.png";
import "./LoginSuccess.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Container } from "react-bootstrap";
const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    sponsorId: "",
  });

  const navigate = useNavigate();
  function onClickHome() {
    navigate("/");
  }
  function onLogin() {
    navigate("/login");
  }
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [sponsorId, setSponsorId] = useState("");
  const [sponsorName, setSponsorName] = useState("");

  // const [emailId, setEmailId] = useState('');
  const [errors, setErrors] = useState("");
  //show password
  const [showPassword, setShowPassword] = useState(false);
  const [verified, setVerified] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  //for Form Validation
  const [focused, setFocused] = useState(false);
  const handleFocus = (e) => {
    setFocused(true);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //captcha verification
  function onChange(value) {
    // console.log("Captcha value:", value);
    setVerified(true);
  }
  //for registration Submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();

  // useEffect(() => {
  //   const searchParams = new URLSearchParams(location.search);
  //   const ref = searchParams.get('ref');

  //   if (ref) {
  //     handleChange(ref);
  //   }
  // }, [location.search]);
  // Get the ref parameter from the URL

  const fetchSponsorName = async () => {
    try {
      const sponsorResponse = await axios.get(
        `https://mlm-eo5g.onrender.com/api/users/getSponsorName/${formData.sponsorId}`
        // `https://mlm-eo5g.onrender.com/api/users/getSponsorName/${formData.sponsorId}`
      );
      setSponsorName(sponsorResponse.data.name);
      // alert(sponsorName);
    } catch (error) {
      // Handle any errors when fetching the sponsor's name
      console.error("Error fetching sponsor name:", error);
      setSponsorName(""); // Clear the sponsor name on error
    }
  };
  useEffect(() => {
    fetchSponsorName();
  }, []);
  const searchParams = new URLSearchParams(window.location.search);
  const ref = searchParams.get("ref");

  // If the ref parameter is present, set the sponsorId state with its value
  if (ref) {
    formData.sponsorId = ref;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axios.post(
        "https://mlm-eo5g.onrender.com/api/users/register",
        formData
      );
      setUserId(res.data.userId);
      setName(res.data.name);
      setPassword(res.data.password);
      setSponsorId(res.data.sponsorId);
      setFormData({
        name: "",
        email: "",
        password: "",
        mobile: "",
        sponsorId: "",
      });
      // setErrors({});
      console.log(res.data);
      setIsSubmitting(false);
      alert("User Registered SucceccFully!");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Email or mobile number already in use.");
      } else if (error.response && error.response.status === 404) {
        toast.error("Please Enter Valid SponserID");
      } else {
        setErrors("An error occurred. Please try again later.");
        toast.error("An error occurred. Please try again later.");
      }
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {!userId ? (
        <div className="register_content">
          <Container
            className="Register_Container"
            style={{
              // backgroundImage:"url('https://pin.it/4orZ87g')",
              // backgroundImage:'linear-gradient(to right, #fa709a 0%, #fee140 100%)',
              height: "780px", width:'90%', borderRadius:'7px'
              // background-image: linear-gradient(to right, #fa709a 0%, #fee140 100%);
            }}
          >
            <div
              className="form_container"
              // style={{
              //   // backgroundImage: `url('https://img.freepik.com/free-photo/bank-card-mobile-phone-online-payment_107791-16646.jpg?size=626&ext=jpg&ga=GA1.1.393936886.1688825666&semt=sph')`,
              //    backgroundImage: `url(${registerImage})`,
              //   backgroundRepeat: "no-repeat",
              //   backgroundSize: "100% 100vh",

              // }}
            >
              <div className="form_data">
                <form className="register_img mt-3" onSubmit={handleSubmit}>
                  <div className="formInput register">
                    <div className="form_section mt-4">
                      <div className="img" style={{ marginLeft: "20px" }}>
                        <img
                          src={logo}
                          height={"100px"}
                          width={"100px"}
                          alt="Logo"
                        />
                      </div>
                      <div className="content ">
                        <div
                          className="heading "
                          style={{
                            fontSize: "19px",
                            fontWeight: "600",
                            marginTop: "16px",
                            marginBottom: "-15px",
                            color: "salmon",
                          }}
                        >
                          Welcome
                        </div>{" "}
                        <hr
                          style={{
                            fontWeight: "bold",
                            height: "2px",
                            color: "pink",
                          }}
                        />
                        <div
                          className="body"
                          style={{
                            fontSize: "16px",
                            marginTop: "-15px",
                            color: "sandybrown",
                          }}
                        >
                          Register to continue
                        </div>
                      </div>
                    </div>
                    <div className="form_input">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter Your Name"
                        className={`form-input ${
                          errors.name ? "is-invalid" : ""
                        }`}
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form_input">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter Your Email"
                        // className={`form-input ${errors.email ? 'is-invalid' : ''}`}
                        value={formData.email}
                        onChange={handleChange}
                        required
                        onBlur={handleFocus}
                        focused={focused.toString()}
                      />
                      <span>Enter correct Email ID</span>
                    </div>
                    <div className="form_input">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <div>
                        <div className="password_input-container">
                          <input
                            type={showPassword ? "text" : "password"}
                            id="password "
                            name="password"
                            placeholder="Enter Password"
                            // className={`form-input input-field ${errors.password ? 'is-invalid' : ''}`}
                            value={formData.password}
                            onChange={handleChange}
                            minLength="5"
                            // required
                            onBlur={handleFocus}
                            focused={focused.toString()}
                            // pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
                          />
                          <button
                            className="password-button "
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? (
                              <AiFillEyeInvisible
                                style={{
                                  fontSize: "23px",
                                  color: "sandyBrown",
                                }}
                              />
                            ) : (
                              <AiFillEye
                                style={{
                                  fontSize: "23px",
                                  color: "sandyBrown",
                                }}
                              />
                            )}
                          </button>
                        </div>
                        <span className="text-danger">
                          {/* Password must contain 1 Capital, 1 Small letter, 1number

                      and 1 special character. */}
                          Enter Password
                        </span>
                      </div>
                    </div>
                    <div className="form_input">
                      <label htmlFor="mobile" className="form-label">
                        Mobile
                      </label>
                      <input
                        type="text"
                        id="mobile"
                        name="mobile"
                        placeholder="Enter Mobile No"
                        // className={`form-input ${errors.mobile ? 'is-invalid' : ''}`}
                        value={formData.mobile}
                        onChange={handleChange}
                        pattern="[0-9]{1}[0-9]{9}"
                        onBlur={handleFocus}
                        focused={focused.toString()}
                        // required
                      />
                      <span>Mobile No should be 10 Digit, Or only number</span>
                    </div>
                    <div className="form_input">
                      <label htmlFor="sponsorId" className="form-label">
                        Sponsor ID
                      </label>
                      {/* <input
                    type="text"
                    id="sponsorId"
                    name="sponsorId"
                    placeholder="Enter Sponsor ID"
                    className={`form-input ${
                      errors.sponsorId ? "is-invalid" : ""
                    }`}
                    value={formData.sponsorId}
                    onChange={handleChange}
                    required={!location.search}
                    readOnly={location.search ? true : false}
                    defaultValue={location.search.substring(1)}
                  /> */}

                      <input
                        type="text"
                        id="sponsorId"
                        name="sponsorId"
                        placeholder="Enter Sponsor ID"
                        className={`form-input ${
                          errors.sponsorId ? "is-invalid" : ""
                        }`}
                        value={formData.sponsorId}
                        onChange={handleChange}
                        required={!location.search}
                        onBlur={() => {
                          handleFocus();
                          fetchSponsorName(); // Fetch sponsor name when input loses focus
                        }}
                        readOnly={location.search ? true : false}
                        defaultValue={location.search.substring(1)}
                      />
                    </div>
                    {sponsorName ? (
                      <div className="sponsor-name">
                        Sponsor Name: {sponsorName}
                      </div>
                    ) : (
                      <div className="text-center text-danger">
                        Sponsor Name Not Found
                      </div>
                    )}
                    <div className="captcha">
                      {/* <ReCAPTCHA sitekey='6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI' onChange={onChange} /> */}
                    </div>

                    {/* <button
                    type="submit"
                    className="btn btn-success mt-2"
                    disabled={!sponsorName}
                  >
                    {isSubmitting ? "processing..." : "Register"}
                  </button> */}

                    <Button
                      variant="success"
                      type="submit"
                      disabled={!sponsorName}
                      className="btn text-light m-3"
                      style={{ letterSpacing: "4px", scale: "1.03" }}
                    >
                      {isSubmitting ? "processing..." : "Register"}
                    </Button>
                    <Link
                      style={{ color: "white", marginBottom: "8px" }}
                      to={"/login"}
                    >
                      Already registered{" "}
                      <b style={{ textDecoration: "underline" }}>Login</b>
                    </Link>
                  </div>
                  <div style={{ height: "50px" }}></div>
                </form>
                <ToastContainer />
                {/* {userId && (
      <div className="user-display">
        <h2>User ID: {userId}</h2>
        <h3>Email Id: {emailId}</h3>
      </div>
    )}  */}
              </div>
            </div>
          </Container>
        </div>
      ) : (
        <div className="row loginSuccessCard mt-5">
          <div className="col-10 col-sm-10 col-md-6 col-lg-5 ">
            <div className="loginCardContainer  ">
              <div className="card-circle">
                <h2>✓</h2>
              </div>
              <div className="cardImage">
                <img src={congrats} height="200px" alt="" />
              </div>
              <div className="user-details">
                <h6 className="text-center text-success">
                  You have Successfully Completed your Registration process.
                </h6>
                <h6
                  className="text-center text-secondary"
                  style={{ fontWeight: "bold" }}
                >
                  Hello, {name}
                </h6>
                {/* <h6 className='text-center text-primary' style={{fontWeight:"bold"}}>UserID: {userId}</h6>
                            <h6 className='text-center text-info' style={{fontWeight:"bold"}}>SponsorID: {sponsorId}</h6>
                            <h6 className='text-center text-danger' style={{fontWeight:"bold"}}>Password: {password}</h6> */}
                <div
                  className="table_align mt-3"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <table
                    className=" responsive "
                    style={{
                      width: "280px",
                      boxShadow: "0  1px 6px rgba(0,0,0,0.35)",
                      borderRadius: "7px",
                    }}
                  >
                    <thead>
                      <tr
                        className="text-center text-secondary"
                        style={{ height: "35px" }}
                      >
                        <th>*USERID</th>
                        <td className="text-dark fw-bold">{userId}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        className="text-center text-secondary"
                        style={{ height: "35px" }}
                      >
                        <th>SponsorID</th>
                        <td
                          className="text-secondary"
                          style={{ fontStyle: "700" }}
                        >
                          {sponsorId}
                        </td>
                      </tr>
                      <tr className="text-center" style={{ height: "35px" }}>
                        <th>Password</th>
                        <td className="text-danger">{password}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="loginSuccessButton">
                <button
                  className="m-4 btn btn-secondary "
                  onClick={onClickHome}
                >
                  Go to Home
                </button>
                {/* <button className='btn btn-outline-secondary' onClick={() => navigator.clipboard.writeText(userId)} >
                          Copy userId
                         </button> */}
                {/* <button className='btn btn-outline-secondary' onClick={() => {
                                navigator.clipboard.writeText(userId);
                                    alert('User Id is copied!');
                                    alert(userId);
                             }}>copy userId</button> */}
                {/* <button
                  className="btn btn-outline-secondary"
                  onClick={async () => {
                    try {
                      // Display userId in the console
                      console.log(userId);

                      // Attempt to copy userId to clipboard
                      await navigator.clipboard.writeText(userId);

                      // Display a success message
                      alert("User Id is copied!");
                    } catch (error) {
                      console.error("Unable to copy userId", error);
                      alert("Unable to copy userIds");
                    }
                  }}
                >
                  Copy userId
                </button> */}

                <button
                  className="m-2 btn btn-primary  btn-sm "
                  onClick={onLogin}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterForm;
