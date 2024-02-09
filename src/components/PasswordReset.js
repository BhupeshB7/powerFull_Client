import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

const PasswordReset = () => {
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");

  const setVal = (e) => {
    setEmail(e.target.value);
  };

  const sendLink = async (e) => {
    e.preventDefault();

    if (email === "") {
      // toast.error("email is required!", {
      //     position: "top-center"
      // });
      alert("Email is Required!");
    } else if (!email.includes("@")) {
      toast.warning("includes @ in your email!", {
        position: "top-center",
      });
    } else {
      const res = await fetch(
        "https://mlm-psi.vercel.app/api/auth/sendpasswordlink",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (data.status === 201) {
        setEmail("");
        setMessage(true);
      } else {
        // toast.error("Invalid User",{
        //     position: "top-center"
        // })
        alert("Email not Found , Please check your email address😔");
      }
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col sm={10} md={12} >
            <div className="mt-5">
              <div >
                <div className="form_heading">
                  <h4
                    className="text-center mb-3"
                    style={{ fontWeight: "bold", color: "gray" }}
                  >
                    Forgot Password
                  </h4>
                </div>

                {message ? (
                  <p style={{ color: "green"}}>
                    pasword reset link send Succsfully in Your Email
                  </p>
                ) : (
                  ""
                )}
                <div className="password_Form">
                <form style={{ maxWidth: "310px" }}>
                  <div >
                    <label
                      htmlFor="email"
                      style={{ fontSize: "17px", marginTop: "20px" }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={setVal}
                      name="email"
                      id="email"
                      placeholder="Enter Your Email Address"
                    />
                  </div>

                  <Button variant="outline-primary" className="m-2 p-2" onClick={sendLink} style={{width:'200px'}}>
                    Send
                  </Button>
                  <p className="text-gray">
                    Note:- wait 10-15 seconds, for send Link.
                  </p>
                </form>
                </div>
                
                <ToastContainer />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PasswordReset;
