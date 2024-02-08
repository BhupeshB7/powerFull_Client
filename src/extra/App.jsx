import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import { Button, Form } from 'react-bootstrap';
import DisplayImage from './DisplayImage';
// https://mlm-eo5g.onrender.com
const FileInput = ({userId}) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState('success'); // 'success' or 'danger' for success and error messages
  // const [userId] = useState('PI17108161');
  const [showInputBox, setShowInputBox] = useState(true); // State to control input box visibility
  const [imageFound, setImageFound] = useState(true); // State to track if the image is found or not

  useEffect(() => {
    // Check if the image exists by making an API request
    axios.get(`https://mlm-eo5g.onrender.com/api/image/${userId}`)
      .then(() => {
        // Image found
        setImageFound(true);
      })
      .catch(() => {
        // Image not found
        setImageFound(false);
      });
  }, [userId]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    setShowAlert(false);

    if (!file) {
      setMessage('Please select a file to upload.');
      setAlertVariant('danger');
      setShowAlert(true);
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(`https://mlm-eo5g.onrender.com/api/image/upload/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setMessage('Image uploaded successfully');
        setAlertVariant('success');
        setShowAlert(true);
        setShowInputBox(false); // Hide the input box when the image is uploaded successfully
      } else {
        setMessage('An error occurred while uploading the image.');
        setAlertVariant('danger');
        setShowAlert(true);
      }
    } catch (error) {
      console.error(error);

      if (error.response || error.response.status === 400) {
        setMessage('File size exceeds the maximum limit (100KB).');
        setAlertVariant('danger');
        setShowAlert(true);
      } else {
        setMessage('An error occurred while uploading the image.');
        setAlertVariant('danger');
        setShowAlert(true);
      }
    }
  };

  return (
    <div>
      {showAlert && (
        <div className="file-input-container">
          <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
            {message}
          </Alert>
        </div>
      )}

      {imageFound && (
        <DisplayImage userId={userId} />
      )}

      {!imageFound && showInputBox && (
        <Form className='imageContainer'>
          <Form.Group controlId="fileUpload">
            <Form.Label>Select an image to upload</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group> <br/>
          <Button variant="outline-info" onClick={handleUpload}>
            Upload Image
          </Button>
        </Form>
      )}
    </div>
  );
};

export default FileInput;










// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Alert from 'react-bootstrap/Alert';
// import { Button, Form } from 'react-bootstrap';
// import DisplayImage from './DisplayImage';

// const FileInput = () => {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState('');
//   const [showAlert, setShowAlert] = useState(false);
//   const [alertVariant, setAlertVariant] = useState('success'); // 'success' or 'danger' for success and error messages
//   const [userId] = useState('PI17108161');
//   const [showInputBox, setShowInputBox] = useState(true); // State to control input box visibility
//   const [imageFound, setImageFound] = useState(true); // State to track if the image is found or not

//   useEffect(() => {
//     // Check if the image exists by making an API request
//     axios.get(`https://mlm-eo5g.onrender.com/api/image/${userId}`)
//       .then(() => {
//         // Image found
//         setImageFound(true);
//       })
//       .catch(() => {
//         // Image not found
//         setImageFound(false);
//       });
//   }, [userId]);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     setShowAlert(false);

//     if (!file) {
//       setMessage('Please select a file to upload.');
//       setAlertVariant('danger');
//       setShowAlert(true);
//       return;
//     }

//     const formData = new FormData();
//     formData.append('image', file);

//     try {
//       const response = await axios.post(`https://mlm-eo5g.onrender.com/api/image/upload/${userId}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.status === 200) {
//         setMessage('Image uploaded successfully');
//         setAlertVariant('success');
//         setShowAlert(true);
//         setShowInputBox(false); // Hide the input box when the image is uploaded successfully
//       } else {
//         setMessage('An error occurred while uploading the image.');
//         setAlertVariant('danger');
//         setShowAlert(true);
//       }
//     } catch (error) {
//       console.error(error);

//       if (error.response || error.response.status === 400) {
//         setMessage('File size exceeds the maximum limit (100KB).');
//         setAlertVariant('danger');
//         setShowAlert(true);
//       } else {
//         setMessage('An error occurred while uploading the image.');
//         setAlertVariant('danger');
//         setShowAlert(true);
//       }
//     }
//   };

//   return (
//     <div>
//       {showAlert && (
//         <div className="file-input-container">
//           <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
//             {message}
//           </Alert>
//         </div>
//       )}

//       {imageFound && (
//         <DisplayImage userId={userId} />
//       )}

//       {!imageFound && showInputBox && (
//         <Form>
//           <Form.Group controlId="fileUpload">
//             <Form.Label>Select an image to upload</Form.Label>
//             <Form.Control type="file" onChange={handleFileChange} />
//           </Form.Group>
//           <Button variant="outline-primary" onClick={handleUpload}>
//             Upload Image
//           </Button>
//         </Form>
//       )}
//     </div>
//   );
// };

// export default FileInput;
