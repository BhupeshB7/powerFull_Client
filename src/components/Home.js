import React, { useEffect, useState } from "react";
import "./Home.css";
import { ImLocation, ImWhatsapp } from "react-icons/im";
import { IoCall, IoRefresh } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
// import ReCAPTCHA from 'react-google-recaptcha'
// for Accordian or Faq
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { MdExpandMore } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import ContactForm from "../pages/ContactUs";
import { useInView } from "react-intersection-observer";
// import NewUsersChart from "./Admin/NewUsersChart";
const Home = ({ contactInfoList }) => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Only trigger the animation once
  });

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Trigger the animation when the element comes into view
    if (inView) {
      setIsActive(true);
    }
  }, [inView]); //
  return (
    <>
      {/* Navbar */}
      <div>
        <nav className="navbar homeNavbar p-1">
          <a
            className="navbar-brand text-bold"
            href="/"
            style={{
              marginLeft: "10px",
              color: "#30ABE2",
              fontWeight: "bolder",
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/1625/1625674.png"
              height="50px"
              width="50px"
              alt="logo"
            />
          </a>
          {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />dssv
                           <span ><img src={navIcon} alt="" /></span>
                        </button> */}
          <h6
            className="text-light"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasWithBothOptions"
            aria-controls="offcanvasWithBothOptions"
          >
            {" "}
            <img
              src="https://img.icons8.com/?size=1x&id=44024&format=png"
              height="50px"
              width="50px"
              style={{ marginRight: "10px" }}
            />
          </h6>
          <div
            className="offcanvas offcanvas-start"
            data-bs-scroll="true"
            tabIndex={-1}
            id="offcanvasWithBothOptions"
            aria-labelledby="offcanvasWithBothOptionsLabel"
          >
            <div className="offcanvas-header">
              {/* <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Backdrop with scrolling</h5> */}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                style={{ marginRight: "0px" }}
              />
            </div>
            <div className="offcanvas-body">
              <div className="home_navbar" id="navbarNav">
                <ul className="ms-auto navbar-nav ">
                  <li className="nav-item">
                    <a
                      className="nav-link active text-dark"
                      aria-current="page"
                      href="/"
                    >
                      Home
                    </a>
                  </li>{" "}
                  <div className="horizontal">
                    {" "}
                    <hr />{" "}
                  </div>
                  <li className="nav-item">
                    <a className="nav-link " href="/login">
                      Login
                    </a>
                  </li>{" "}
                  <div className="horizontal">
                    {" "}
                    <hr />{" "}
                  </div>
                  <li className="nav-item">
                    <a className="nav-link" href="/register">
                      Get Started
                    </a>
                  </li>
                  <div className="horizontal">
                    {" "}
                    <hr />{" "}
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </nav>
        {/* <nav className="navbar homeNavbar navbar-expand-lg ">
                    <div className="container-fluid ms-3">
                        <a className="navbar-brand text-bold" href="/" style={{color:"#30ABE2",fontWeight:"bolder"}}>GSP</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                           <span ><img src={navIcon} alt="" /></span>
                        </button>
                        <div className=" collapse navbar-collapse" id="navbarNav">
                            <ul className="ms-auto navbar-nav ">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href='/login'>Login</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href='/register'>Get Started</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav> */}
      </div>
      {/* Navbar End... */}
      {/* Home section */}
      {/* <NewUsersChart/> */}
      
     
      <div className="home-content">
        {/* Home Section */}
        <div className="home-section">
          <div className="home-container d-flex ">
            <h1>Welcome to</h1>
            <h2>POWERFULL INDIA</h2>
            <h6>Please, Login to continue...</h6>
            <div>
              <a className="home-button" href="/register">
                Get Started{" "}
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1634/1634158.png"
                  height="25px"
                  width="25px"
                  alt="right_arrow"
                />
                {/* Get Started → */}
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Home section-End */}
      {/* About-section */}
      <div className="about-content">
        <div className="about-container head-container">
          <h3 style={{ textAlign: "center" }}>About Us</h3>
          <div
            ref={ref}
            className={`row about-row-section contentOfRow2 ${
              isActive ? "slide-in active" : "slide-in"
            }`}
          >
            <div className="col-12 col-sm-12 col-md-6 col-lg-5 about-col-section-1 about-col-section">
              <p>
                {" "}
                we are team of dedicated of &nbsp;&nbsp;&nbsp;
                &nbsp;professionals who are passionate about &nbsp;&nbsp;
                helping people achieves their dream through our &nbsp;unique MLM
                program. Our mission is to empower individuals and communities
                with the tools and resources they need to succed in the
                ever-evolving world of entrepreneurship.
              </p>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 about-col-section-2 about-col-section">
              {/* <img src="https://img.freepik.com/free-vector/online-world-concept-illustration_114360-1092.jpg?size=338&ext=jpg&ga=GA1.2.1717175719.1670043102&semt=sph" alt="mlm_aboutImage" width="45%" height="30%" style={{borderRadius:"8px"}} /> */}
              <img
                src="https://img.freepik.com/free-vector/connected-world-concept-illustration_114360-3027.jpg?size=626&ext=jpg&ga=GA1.2.393936886.1688825666&semt=sph"
                width="80%"
                height="60%"
                style={{ borderRadius: "8px" }}
              />
            </div>
          </div>
          <div
            ref={ref}
            className={` row about-row-section flex-column-reverse flex-md-row contentOfRow ${
              isActive ? "slide-in active" : "slide-in"
            }`}
          >
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 about-col-section-3 about-col-section">
              <img
                src="https://img.freepik.com/free-vector/illustration-diverse-people_53876-28662.jpg?size=626&ext=jpg&ga=GA1.1.393936886.1688825666&semt=sph"
                alt="mlm_aboutImage"
                width="80%"
                height="60%"
                style={{ borderRadius: "8px" }}
              />
              {/* <img src="https://img.freepik.com/free-vector/connected-world-concept-illustration_114360-4240.jpg?w=740&t=st=1679376370~exp=1679376970~hmac=e5c464e99187d34b73fd468730aec3a32f4c951233aa80fda94f8e18c9b2c654" alt="mlm_aboutImage" width="50%" height="40%" style={{borderRadius:"8px"}} /> */}
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 about-col-section-2 about-col-section">
              <p className="p">
                {" "}
                At our MLM company, we are passionate about providing our
                members with the tools and resources they need to succeed. We
                believe that when individuals come together to work towards a
                common goal, amazing things can happen.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* About-section-End */}
      {/* Contact-us-section */}
      <div className="head-container">
        <h3>Contact Us</h3>
      </div>
      <div className="container" style={{ marginBottom: "40px" }}>
        <div className="row contact-row" style={{ marginTop: "20px" }}>
          <div className="col-sm-10 col-11 col-md-6 col-lg-5 contact-section-1">
            <h3>Get In Touch...</h3>
            {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae deleniti illum labore, voluptatum iusto dolor? Totam vitae ratione consectetur necessitatibus?</p> */}
            <div className="contact-us">
              <div className="row">
                <div className="contact-icon col-2">
                  <ImLocation className="contact-svg" />
                </div>
                <div className="contact-details col-10">
                  <a href="/" className="p-text">
                    Rajasthan
                  </a>
                  {/* <a href="tel:+91 8581869783" className="p-text">+91 8581869783</a> */}
                </div>
              </div>
              <div className="row">
                <div className="contact-icon col-2">
                  <IoCall className="contact-svg" />
                </div>
                <div className="contact-details col-10">
                  <a href={`tel:${contactInfoList.mobile}`} className="p-text">
                    {contactInfoList.mobile}
                  </a>
                </div>
              </div>
              <div className="row">
                <div className="contact-icon col-2">
                  <MdEmail className="contact-svg" />
                </div>
                <div className="contact-details col-10">
                  <a
                    href={`mailto:${contactInfoList.email}`}
                    className="p-text"
                  >
                    {contactInfoList.email}
                  </a>
                </div>
              </div>
              <div className="row">
                <div className="contact-icon col-2">
                  <ImWhatsapp className="contact-svg" />
                </div>
                <div className="contact-details col-10">
                  <a
                    href={`https://wa.me/${contactInfoList.whatsAppNumber}/?text=Hi!%20I'm%20interested%20to%20know%20more.`}
                    className="p-text"
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-sm-12 col-12 col-md-6 col-lg-7 "
            style={{ marginLeft: "-30px" }}
          >
            <ContactForm />
          </div>
        </div>
      </div>

      {/* Contact-us-section-End */}
      {/* Faq */}
      <h4
        style={{ textAlign: "center", marginBottom: "20px", color: "#8186d5" }}
      >
        Frequently Asked Question
      </h4>

      <div
        className="container"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className="Faq" style={{ width: "90vw" }}>
          <Accordion>
            <AccordionSummary
              expandIcon={<MdExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className="faqBody"
              style={{ marginTop: "10px" }}
            >
              <Typography>
                How can I play the color prediction games?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                To play the color prediction games, you need to create an
                account and deposit a certain amount. Once your account is
                funded, you can start predicting the colors and potentially win
                rewards based on your predictions.
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/*  */}
          <Accordion>
            <AccordionSummary
              expandIcon={<MdExpandMore />}
              aria-controls="panel1ab-content"
              id="panel1ab-header"
              style={{ marginTop: "10px" }}
            >
              <Typography>Is the gaming website safe and secure?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Yes, we prioritize the safety and security of our users. We use
                encryption to protect your personal and financial information,
                and we have measures in place to ensure fair gameplay.
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/*  */}
          <Accordion>
            <AccordionSummary
              expandIcon={<MdExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              style={{ marginTop: "10px" }}
            >
              <Typography>
                Why PowerFul India? or IT is trustable or not!
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                PowerFul India is 100% genuine platform , where you can earn by
                watching video daily.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<MdExpandMore />}
              aria-controls="panel2a-content"
              id="panel2a-header"
              style={{ marginTop: "10px" }}
            >
              <Typography> I can withdraw without any direct.</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                yes, you can withdraw 200 without any direct.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<MdExpandMore />}
              aria-controls="panel2a-content"
              id="panel2a-header"
              style={{ marginTop: "10px" }}
            >
              <Typography>Minimum withdrawal Amount.</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                First Withdrawal :200 <br /> Second Withdrawal :500 and, <br />{" "}
                After then unlimited withdrawal above 800
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<MdExpandMore />}
              aria-controls="panel2a-content"
              id="panel2a-header"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              <Typography>
                what is the minimum direct to make withdrawal!
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>2</Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      {/* Faq-end */}
      {/* Footer */}
      <footer className="footer-20192">
        <div className="site-section">
          <div className="container-fluid">
            <div className="row footer-row">
              <div className="col-sm ">
                <a
                  href="/"
                  className="footer-logo"
                  style={{ fontWeight: "700" }}
                >
                  {" "}
                  PI
                </a>
                <p className="copyright">
                  <small>© 2023</small>
                </p>
              </div>
              {/* <div className="col-sm">
          <h3>Customers</h3>
          <ul className="list-unstyled links">
            <li><a href="/">Buyer</a></li>
            <li><a href="/">Supplier</a></li>
          </ul>
        </div> */}
              <div className="col-sm">
                <h3>Quick Links</h3>
                <ul className="list-unstyled links">
                  <li>
                    <a href="/about">About us</a>
                  </li>
                  {/* <li><a href="/contact">Careers</a></li> */}
                  <li>
                    <a href="#contact">Contact us</a>
                  </li>
                </ul>
              </div>

              <div className="col-sm">
                <h3>Further Information</h3>
                <ul className="list-unstyled links">
                  <li>
                    <a href="/term">Terms &amp; Conditions</a>
                  </li>
                  <li>
                    <a href="/policy">Privacy Policy</a>
                  </li>
                </ul>
              </div>
              <div className="col-sm">
                <h3>Login to continue</h3>
                <ul className="list-unstyled links mt-4">
                  <li>
                    <a
                      href="/login"
                      className="login-button"
                      style={{ color: "#fff" }}
                    >
                      Login
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col-sm">
                <ul className="list-unstyled links mt-4">
                  <li className="text-center mt-4">
                    {" "}
                    PI &copy; All Right Reserved
                  </li>{" "}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
