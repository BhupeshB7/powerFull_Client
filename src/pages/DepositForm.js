/* <th scope="col">IFSC CODE</th>
            <th scope="col">Account Number</th> */

/* <td>UTIB0002620</td>
            <td>923010046330302</td> */
// <th scope="col">UPI</th>
// <td>kumaromprakashhdhdksks@axl</td>

import React, { useState } from "react";
import QRCODE from "../assets/QRCODE4.jpg";
import { Button, Container, Spinner, Table, Form } from "react-bootstrap";
const DepositForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    transactionId: "",
    userID: "",
    depositAmount: "",
    // image: null, // To store the selected image file
  });
  const [errors, setErrors] = useState({
    name: "",
    transactionId: "",
    userID: "",
    depositAmount: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };
  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData({ ...formData, image: imageFile });
  };
  const validateField = (name, value) => {
    let errorMessage = "";
    switch (name) {
      case "name":
      case "transactionId":
      case "userID":
        // Check if the field is empty
        errorMessage = value.trim() === "" ? "This field is required" : "";
        break;
      case "depositAmount":
        // Check if the amount is greater than 0
        errorMessage =
          parseFloat(value) <= 0||value.trim() === "" ? "Amount must be greater than 1" : "";
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { name, transactionId, userID, depositAmount, image } = formData;
    let shouldSubmit = true; // Flag to track whether the form should be submitted

    // Validate each field
    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key]);
      if (errors[key] !== "") {
        // If any error is found, set the flag to false
        shouldSubmit = false;
      }
    });

    // Check if there are any errors
    if (!shouldSubmit) {
      // If there are errors, do not proceed with form submission
      setLoading(false); // Reset loading state
      return;
    }
    const formDataToSend = new FormData();
    formDataToSend.append("name", name);
    formDataToSend.append("transactionId", transactionId);
    formDataToSend.append("userID", userID);
    formDataToSend.append("depositAmount", depositAmount);
    formDataToSend.append("image", image);

    try {
      // const response = await fetch(
      // "https://mlm-eo5g.onrender.com/api/deposit/userAmount",
      // {
      // const response = await fetch("http://localhost:5500/api/deposit/userAmount", {
      const response = await fetch(
        "https://mlm-psi.vercel.app/api/deposit/userAmount",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (response.status === 201) {
        // Successfully uploaded the deposit
        alert("Deposit successful");
        window.location.href = "/dashboard";
      } else {
        // Handle the error response
        const data = await response.json();
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Internal server error");
    } finally {
      // Reset loading state to false after submission process is completed
      setLoading(false);
    }
  };
  const dashboard = () => {
    window.location.href = "/dashboard";
  };
  return (
    <div className="topUPBg depositFormC">
      <h5 className="p-3 text-center text-warning">Deposit</h5>
      <h6 className="text-secondary p-2">Recharge Amount</h6>
      <h6 className="text-light p-2">Rs 850/-</h6>
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
        {errors.name && (
          <Form.Text className="text-danger">{errors.name}</Form.Text>
        )}
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
        {errors.transactionId && (
          <Form.Text className="text-danger">{errors.transactionId}</Form.Text>
        )}
        <div>
          {/* <label htmlFor="userID">User ID:</label> <br/> */}
          <input
            type="text"
            id="userID"
            name="userID"
            value={formData.userID}
            onChange={handleInputChange}
            placeholder="Enter user ID"
          />
        </div>
        {errors.userID && (
          <Form.Text className="text-danger">{errors.userID}</Form.Text>
        )}
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
        {errors.depositAmount && (
          <Form.Text className="text-danger">{errors.depositAmount}</Form.Text>
        )}
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

export default DepositForm;

// New code
// import React, { useState } from "react";
// import QRCODE from "../assets/QRCODE4.jpg";
// import { Button, Container, Spinner, Table, Form } from "react-bootstrap";

// const DepositForm = () => {
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     transactionId: "",
//     userID: "",
//     depositAmount: "",
//     image: null, // To store the selected image file
//   });
//   const [errors, setErrors] = useState({
//     name: "",
//     transactionId: "",
//     userID: "",
//     depositAmount: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     // Validate the input field
//     validateField(name, value);
//   };

//   const validateField = (name, value) => {
//     let errorMessage = "";
//     switch (name) {
//       case "name":
//       case "transactionId":
//       case "userID":
//         // Check if the field is empty
//         errorMessage = value.trim() === "" ? "This field is required" : "";
//         break;
//       case "depositAmount":
//         // Check if the amount is greater than 0
//         errorMessage =
//           parseFloat(value) <= 0 ? "Amount must be greater than 0" : "";
//         break;
//       default:
//         break;
//     }
//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       [name]: errorMessage,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const imageFile = e.target.files[0];
//     setFormData({ ...formData, image: imageFile });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Validate all fields before submitting
//     Object.keys(formData).forEach((key) => {
//       validateField(key, formData[key]);
//     });

//     // Check if there are any errors
//     if (Object.values(errors).every((error) => error === "")) {
//       setLoading(true);
//       const { name, transactionId, userID, depositAmount, image } = formData;

//       const formDataToSend = new FormData();
//       formDataToSend.append("name", name);
//       formDataToSend.append("transactionId", transactionId);
//       formDataToSend.append("userID", userID);
//       formDataToSend.append("depositAmount", depositAmount);
//       formDataToSend.append("image", image);

//       try {
//         const response = await fetch(
//           "https://mlm-psi.vercel.app/api/deposit/userAmount",
//           {
//             method: "POST",
//             body: formDataToSend,
//           }
//         );

//         if (response.status === 201) {
//           // Successfully uploaded the deposit
//           alert("Deposit successful");
//           window.location.href = "/dashboard";
//         } else {
//           // Handle the error response
//           const data = await response.json();
//           alert("Error: " + data.message);
//         }
//       } catch (error) {
//         console.error(error);
//         alert("Internal server error");
//       } finally {
//         // Reset loading state to false after submission process is completed
//         setLoading(false);
//       }
//     }
//   };

//   const dashboard = () => {
//     window.location.href = "/dashboard";
//   };

//   return (
//     <div className="topUPBg depositFormC">
//       <h5 className="p-3 text-center text-warning">Deposit</h5>
//       <h6 className="text-secondary p-2">Recharge Amount</h6>
//       <h6 className="text-light p-2">Rs 850/-</h6>
//       <div
//         className="d-flex justify-content-end"
//         style={{ position: "absolute", right: "20px", top: "30px" }}
//       >
//         <img
//           src="https://cdn-icons-png.flaticon.com/128/189/189254.png"
//           height="40px"
//           width="40px"
//           onClick={dashboard}
//           alt="back"
//         />
//       </div>
//       <div
//         className="image"
//         style={{ display: "flex", justifyContent: "center" }}
//       >
//         <img
//           src={QRCODE}
//           height="200px"
//           width="200px"
//           alt=""
//           style={{
//             display: "flex",
//             alignItems: "center",
//             border: "1px solid rgb(20, 10, 30)",
//             borderRadius: "7px",
//           }}
//         />
//       </div>
//       <Container className="pt-3">
//         <Table striped bordered hover>
//           <thead className="text-warning text-center">
//             <tr>
//               <th>Account Number</th>
//               <th>923010046330302</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr className="text-warning text-center">
//               <td>IFSC CODE</td>
//               <td>UTIB0002620</td>
//             </tr>
//             <tr className="text-warning text-center">
//               <td>UPI</td>
//               <td>
//                 powerfullindia <br /> 849@khdfcbank
//               </td>
//             </tr>
//           </tbody>
//         </Table>
//       </Container>

//       <Form onSubmit={handleSubmit} className="deposit_box">
//         <Form.Group controlId="name">
//           <Form.Control
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             placeholder="Enter name"
//           />
//           {errors.name && (
//             <Form.Text className="text-danger">{errors.name}</Form.Text>
//           )}
//         </Form.Group>
//         <Form.Group controlId="transactionId">
//           <Form.Control
//             type="text"
//             name="transactionId"
//             value={formData.transactionId}
//             onChange={handleInputChange}
//             placeholder="Enter TransactionId"
//           />
//           {errors.transactionId && (
//             <Form.Text className="text-danger">
//               {errors.transactionId}
//             </Form.Text>
//           )}
//         </Form.Group>
//         <Form.Group controlId="userID">
//           <Form.Control
//             type="text"
//             name="userID"
//             value={formData.userID}
//             onChange={handleInputChange}
//             placeholder="Enter user ID"
//           />
//           {errors.userID && (
//             <Form.Text className="text-danger">{errors.userID}</Form.Text>
//           )}
//         </Form.Group>
//         <Form.Group controlId="depositAmount">
//           <Form.Control
//             type="number"
//             name="depositAmount"
//             value={formData.depositAmount}
//             onChange={handleInputChange}
//             placeholder="Enter deposit amount"
//           />
//           {errors.depositAmount && (
//             <Form.Text className="text-danger">
//               {errors.depositAmount}
//             </Form.Text>
//           )}
//         </Form.Group>
//         <Button
//           className="m-2"
//           variant="primary"
//           type="submit"
//           disabled={loading}
//         >
//           {loading ? (
//             <Spinner
//               animation="border"
//               size="sm"
//               role="status"
//               aria-hidden="true"
//             />
//           ) : (
//             "Submit"
//           )}
//         </Button>
//       </Form>
//     </div>
//   );
// };

// export default DepositForm;
