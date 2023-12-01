import React, { useRef, useState } from "react";
import logo from "../assets/PI1.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";
import spinner2 from "../assets/spinner2.gif";
const LoginForm = ({ setToken }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState(true);
  const [captchaResponse, setCaptchaResponse] = useState("");
  const [error, setError] = useState(null);
  const captchaRef = useRef();
  //for Login Submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const BASE_URl = process.env.BASE_URL
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    captchaRef.current.reset();
    try {
      const response = await fetch(
        "https://mlm-production.up.railway.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, password, captchaResponse }),
        }
      );

      if (response.status === 400) {
        throw new Error("Invalid userId or password");
      }
      if (response.status === 401) {
        throw new Error("Invalid Captcha");
      }

      const { token } = await response.json();

      localStorage.setItem("token", token);
      // token will expire in 6 hours
      localStorage.setItem("tokenExpire", Date.now() + 21600000); //86400000 for 24
      //  setToken(token);
      setError(null);
      setIsSubmitting(false);
      toast.success("LogIn successfully!");
      // redirect to dashboard page
      window.location.href = "/dashboard";
    } catch (error) {
      setError(error.message);
      alert(error.message);
      setIsSubmitting(false);
    }
  };

  const handleCaptchaChange = (response) => {
    setCaptchaResponse(response);
  };
  const handleClickShowPassword =()=>{
    setPassword1(!password1)
  }
  return (
    <>
      <div
        className="loginBG"
        style={{
          // backgroundImage: "url('https://assets-global.website-files.com/5a9423a3f702750001758d4f/64ddbcac254f68d3f78c983e_%20-%2012-p-500.jpg')",  backgroundRepeat:'no-repeat',
          backgroundSize: "100% 100vh",
        }}
      >
        <div className="card12 login_Image">
          <div className="login_Image2">
            <div className="img">
              <img src={logo} height={"140px"} width={"150px"} alt="Logo" />
            </div>
          </div>
          <div className="form_container loginBG1">
            {/* <img src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg?size=626&ext=jpg&uid=R102726883&ga=GA1.2.1717175719.1670043102&semt=sph" alt="" /> */}
            <form onSubmit={handleSubmit}>
              <div>
                {error && (
                  <div
                    className="error text-danger"
                    style={{ marginLeft: "10px" }}
                  >
                    {error}
                  </div>
                )}
                <div className="loginInput">
                  {/* <label>UserId:</label> */}
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/12515/12515987.png"
                    height="30px"
                    width="30px"
                    alt="user"
                    style={{ marginLeft: "20px" }}
                  />
                  <input
                    type="text"
                    placeholder="Enter userID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                  />
                </div>
                <div className="loginInput">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/11135/11135314.png"
                    height="30px"
                    width="30px"
                    alt="password"
                    style={{ marginLeft: "20px" }}
                  />

                  <input
                    type={password1?'password':'text'}
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="showPassword" style={{marginLeft:'-20px'}}>
                      {
                        password1? <img src="https://cdn-icons-png.flaticon.com/128/7222/7222897.png" height='30px' width='30px' alt="eye" onClick={handleClickShowPassword}/>:<img src="https://cdn-icons-png.flaticon.com/128/8861/8861449.png" height='30px' width='30px' alt="eye"onClick={handleClickShowPassword} />
                      }
                  </div>
                </div>
                <div className="form_input">
                  <ReCAPTCHA
                    style={{ background: "transparent", margin: "10px" }}
                    sitekey="6LesDAkmAAAAANop2voHvPE_NCuh17wZf7J85ybm"
                    onChange={handleCaptchaChange}
                    ref={captchaRef}
                  />
                </div>
                {/* <button type="submit" className='btn text-light m-2 mt-0' style={{  backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpF5Q7kZdjUq-gfzOvwIDxu93MNZRCjC3zKMNe2YS2&s')", letterSpacing:'4px', scale:'1.03',}} >
      {isSubmitting? {spinner2}:'LOGIN'}
      </button> */}
                <button
                  type="submit"
                  className="btn text-light m-2 mt-0"
                  style={{
                    backgroundImage:
                      "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpF5Q7kZdjUq-gfzOvwIDxu93MNZRCjC3zKMNe2YS2&s')",
                    letterSpacing: "4px",
                    transform: "scale(1.03)",
                  }}
                >
                  {isSubmitting ? (
                    <img src={spinner2} height='30px' width='30px' alt="Loading" />
                  ) : (
                    "LOGIN"
                  )}
                </button>
                <br />
                <Link
                  to={"/register"}
                  style={{ color: "#eee", marginLeft: "8px" }}
                >
                  Don't have an account yet?{" "}
                  <a
                    href="/register"
                    style={{ textDecoration: "underline", color: "gray" }}
                  >
                    SignUp
                  </a>{" "}
                </Link>
                <Link
                  to={"/password-reset"}
                  style={{
                    marginBottom: "10px",
                    color: "#ddd",
                    marginLeft: "8px",
                  }}
                >
                  {" "}
                  <b style={{ textDecoration: "underline", fontWeight: "500" }}>
                    Forgot Password
                  </b>{" "}
                </Link>
              </div>
            </form>
          </div>

          <ToastContainer />
        </div>
      </div>
    </>
  );
};
export default LoginForm;
