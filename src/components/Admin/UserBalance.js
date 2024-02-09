
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Button, Alert } from 'react-bootstrap';

// function UserBalance() {
//   const [abortController, setAbortController] = useState(new AbortController());
//   const [alertMessage, setAlertMessage] = useState(null);
//   const [alertVariant, setAlertVariant] = useState('success');

//   const handleResetBalances = async () => {
//     // Show a confirmation prompt
//     const isConfirmed = window.confirm('Are you sure you want to reset user balances?');

//     if (!isConfirmed) {
//       return;
//     }
//     // Cancel the previous request if it exists
//     abortController.abort();

//     // Create a new AbortController for the current request
//     const newController = new AbortController();
//     setAbortController(newController);

//     try {
//       await axios.post('http://localhost:5000/api/auth/resetBalances', null, { signal: newController.signal });
//       setAlertVariant('success');
//       setAlertMessage('Balances reset successfully.');
//     } catch (error) {
//       if (error.name === 'AbortError') {
//         console.log('Request aborted.');
//         return;
//       }

//       setAlertVariant('danger');
//       setAlertMessage(`Error resetting balances: ${error.message}`);
//     }
//   };

//   useEffect(() => {
//     // Cleanup function to abort the request when the component is unmounted
//     return () => abortController.abort();
//   }, [abortController]);

//   const handleAlertClose = () => {
//     setAlertMessage(null);
//   };

//   return (
//     <div>
//       {alertMessage && (
//         <Alert variant={alertVariant} onClose={handleAlertClose} dismissible>
//           {alertMessage}
//         </Alert>
//       )}

//       <Button variant='primary' onClick={handleResetBalances}>
//         Reset Balances to 0
//       </Button>
//     </div>
//   );
// }

// export default UserBalance;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Alert, Modal } from 'react-bootstrap';

function UserBalance() {
  const [abortController, setAbortController] = useState(new AbortController());
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertVariant, setAlertVariant] = useState('success');
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleResetBalances = async () => {
    // Close the modal
    handleCloseModal();

    // Cancel the previous request if it exists
    abortController.abort();

    // Create a new AbortController for the current request
    const newController = new AbortController();
    setAbortController(newController);

    try {
      await axios.post('https://mlm-eo5g.onrender.com/api/auth/resetBalances', null, { signal: newController.signal });
      setAlertVariant('success');
      setAlertMessage('Balances reset successfully.');
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Request aborted.');
        return;
      }

      setAlertVariant('danger');
      setAlertMessage(`Error resetting balances: ${error.message}`);
    }
  };

  useEffect(() => {
    // Cleanup function to abort the request when the component is unmounted
    return () => abortController.abort();
  }, [abortController]);

  const handleAlertClose = () => {
    setAlertMessage(null);
  };

  return (
    <div>
      {alertMessage && (
        <Alert variant={alertVariant} onClose={handleAlertClose} dismissible>
          {alertMessage}
        </Alert>
      )}
       <h6 className='text-danger'>Set All User Balance 0</h6>
      <Button variant='primary' onClick={handleShowModal}>
        Reset Balances to 0
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Reset</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to reset user balances?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseModal}>
            No
          </Button>
          <Button variant='success' onClick={handleResetBalances}>
            Yes
          </Button> 
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserBalance;
