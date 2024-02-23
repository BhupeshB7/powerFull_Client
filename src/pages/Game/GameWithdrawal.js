import React, { useState } from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import { Alert, Button } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
const GameWithdrawal = () => {
    const gameUserId = localStorage.getItem('GamerUserId');
    const gameAccountNo = localStorage.getItem('GameAccountName');
    const GameIFSCCODE = localStorage.getItem('GamerIFSCCODE');
    const GameAccountNo = localStorage.getItem('GameAccountNo');
    const GameUPI = localStorage.getItem('GameGPay');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData1, setFormData1] = useState({
    userId: gameUserId,
    name: gameAccountNo,
    amount: "",
    UPI: GameUPI,
    accountNo: GameAccountNo,
    IFSCCODE: GameIFSCCODE,
  });
  const [loading, setLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ show: false, variant: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData1({ ...formData1, [name]: value });
  };
  const handleWithdrawalError = (errorData) => {
    // Handle withdrawal errors, such as displaying a specific error message
    console.error("Withdrawal error:", errorData);
    // Example: display an alert with the error message
    // alert("Withdrawal request failed: " + errorData.error);
    setAlertInfo({ show: true, variant: 'danger', message: errorData.error });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
//    console.log('formdata:',formData1)
    if (formData1.amount < 110) {
      setAlertInfo({ show: true, variant: 'danger', message: 'Minimum Withdrawal Amount is 110' });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://mlm-psi.vercel.app/api/withdrawalSubmit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData1 }),
        }
      );

      if (response.ok) {
        setAlertInfo({ show: true, variant: 'success', message: 'Withdrawal request submitted successfully' });
      } else {
        const responseData = await response.json();
        handleWithdrawalError(responseData);
      }
    } catch (error) {
      console.error(error);
      setAlertInfo({ show: true, variant: 'danger', message: 'Error submitting withdrawal request. Please try again.' });
    } finally {
      setLoading(false);
    }
  };
  const handleAlertDismiss = () => {
    setAlertInfo({ ...alertInfo, show: false });
  };
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const handleClose = () => {
    setModalIsOpen(false);
  };
  return (
    <>
      <button
        className="btn btn-outline-warning"
        style={{ borderRadius: "22px" }}
        onClick={openModal}
      >
        Withdraw
      </button>
      <Modal
        className="ModalOverlay"
        overlayClassName="Overlay"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Withdraw"
      >
        <div className="ModalContent">
          <div className="CloseButton" onClick={handleClose}>
            <FaTimes />
          </div>
          {/* Modal content */}
          
          <form onSubmit={handleSubmit}>
            <div>
            <Alert
            show={alertInfo.show}
            variant={alertInfo.variant}
            dismissible
            onClose={handleAlertDismiss}
          >
            {alertInfo.message}
          </Alert>
              <h6 className="text-start text-info pt-3">
                *USERID: {formData1.userId}
              </h6>
              <h6
                className="text-start text-warning"
                style={{ border: "1px solid yellow", padding: "7px" }}
              >
                Account Name:{formData1.name}
              </h6>
              <h6
                className="text-start text-warning"
                style={{ border: "1px solid yellow", padding: "7px" }}
              >
                ACCOUNT NO:{formData1.accountNo}
              </h6>
              <h6
                className="text-start text-warning"
                style={{ border: "1px solid yellow", padding: "7px" }}
              >
                IFSC CODE{formData1.IFSCCODE}
              </h6>
              <h6
                className="text-end text-warning"
                style={{ border: "1px solid yellow", padding: "7px" }}
              >
                Google Pay:{formData1.UPI}
              </h6>
              <label className="text-warning ">
                Amount:
                <input
                  type="number"
                  name="amount"
                  value={formData1.amount}
                  onChange={handleChange}
                  style={{
                    border: "1px solid yellow",
                    margin: "8px",
                    padding: "7px",
                  }}
                />
              </label>
              {loading ? (
                <div>
                  Submitting... <Spinner animation="border" />
                </div>
              ) : (
                <Button variant="warning" type="submit">Withdraw</Button>
              )}
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default GameWithdrawal;
