/* <th scope="col">IFSC CODE</th>
            <th scope="col">Account Number</th> */

/* <td>UTIB0002620</td>
            <td>923010046330302</td> */
// <th scope="col">UPI</th>
// <td>kumaromprakashhdhdksks@axl</td>

import React, { useState } from "react";
import QRCODE from "../assets/QRCODE4.jpg";
import { Button, Container, Spinner, Table } from "react-bootstrap";
const GameDepositForm = () => {
  const [loading,setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    transactionId: "",
    userId: "",
    depositAmount: "",
    image: null, // To store the selected image file
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData({ ...formData, image: imageFile });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { name, transactionId, userId, depositAmount, image } = formData;

    const formDataToSend = new FormData();
    formDataToSend.append("name", name);
    formDataToSend.append("transactionId", transactionId);
    formDataToSend.append("userId", userId);
    formDataToSend.append("depositAmount", depositAmount);
    formDataToSend.append("image", image);

    try {
      const response = await fetch(
        "https://mlm-psi.vercel.app/api/deposit/userAmount/gameDeposit",
        { method: "POST", body: formDataToSend }
      );

      if (response.status === 201) {
        alert("Deposit successful");
        window.location.href = "/game/colorpridiction";
      } else {
        // Handle the error response
        const data = await response.json();
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Internal server error");
    }finally {
      // Reset loading state to false after submission process is completed
      setLoading(false);
  }
  };
  const dashboard = () => {
    window.location.href = "/game/colorpridiction";
  };
  return (
    <div className="topUPBg depositFormC">
      <h5 className="p-3 text-center text-warning">Deposit</h5>
      <h6 className="text-secondary p-2">Recharge Amount</h6>
      <h6 className="text-light p-2">
        *Min <b>Rs 100/-</b> Max - Unlimited
      </h6>
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
      <div
        className="image"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <img
          src={QRCODE}
          height="200px"
          width="200px"
          alt=""
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid rgb(20, 10, 30)",
            borderRadius: "7px",
          }}
        />
      </div>
      <Container className="pt-3">
        <Table striped bordered hover>
          <thead className="text-warning text-center">
            <tr>
              <th>Account Number</th>
              <th>923010046330302</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-warning text-center">
              <td>IFSC CODE</td>
              <td>UTIB0002620</td>
            </tr>
            <tr className="text-warning text-center">
              <td>UPI</td>
              <td>
                powerfullindia
                <br />
                849@khdfcbank
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>

      <form onSubmit={handleSubmit} className="deposit_box">
        <div>
          {/* <label htmlFor="name">Name:</label> <br/> */}
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter name"
          />
        </div>
        <div>
          {/* <label htmlFor="transactionId">Transaction ID:</label> <br/> */}
          <input
            type="text"
            id="transactionId"
            name="transactionId"
            value={formData.transactionId}
            onChange={handleInputChange}
            placeholder="Enter TransactionId"
          />
        </div>
        <div>
          {/* <label htmlFor="userId">User ID:</label> <br/> */}
          <input
            type="text"
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleInputChange}
            placeholder="Enter user ID"
          />
        </div>
        <div>
          {/* <label htmlFor="depositAmount">Deposit Amount:</label> <br/> */}
          <input
            type="number"
            id="depositAmount"
            name="depositAmount"
            value={formData.depositAmount}
            onChange={handleInputChange}
            placeholder="Enter deposit amount"
          />
        </div>
        <div>
          {/* <label htmlFor="image">Image:</label> <br/> */}
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <Button
          className="m-2"
          variant="primary"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <Spinner
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </div>
  );
};

export default GameDepositForm;
