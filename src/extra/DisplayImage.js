// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const DisplayImage = () => {
//   const [imageData, setImageData] = useState(null);
//   const userId = 'PI17108161';
//   useEffect(() => {
//     // Make an HTTP GET request to fetch the image
//     axios.get(`https://mlm-eo5g.onrender.com/api/image/${userId}`, {
//       responseType: 'arraybuffer', // Set the response type to arraybuffer to handle binary data
//     })
//       .then((response) => {
//         // Create a blob from the binary data
//         const blob = new Blob([response.data], { type: response.headers['content-type'] });

//         // Create a data URL from the blob
//         const imageUrl = URL.createObjectURL(blob);

//         // Set the image data URL in the state
//         setImageData(imageUrl);
//       })
//       .catch((error) => {
//         console.error('Error fetching image:', error);
//       });
//   }, [userId]);

//   return (
//     <div className='company-logo'>
//       {imageData ? (
//         <img src={imageData} alt="User's Image" height='200px' width='200px' style={{borderRadius:'50%', border:'1px solid red ', padding:'5px', objectFit:'contain'}}/>
//       ) : (
//         <p>Loading image...</p>
//       )}
//     </div>
//   );
// };

// export default DisplayImage;












import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayImage = ({ userId }) => {
  const [imageData, setImageData] = useState(null);
  const [imageFound, setImageFound] = useState(true); // Track if the image is found or not

  useEffect(() => {
    // Make an HTTP GET request to fetch the image
    axios.get(`https://mlm-eo5g.onrender.com/api/image/${userId}`, {
      responseType: 'arraybuffer', // Set the response type to arraybuffer to handle binary data
    })
      .then((response) => {
        // Create a blob from the binary data
        const blob = new Blob([response.data], { type: response.headers['content-type'] });

        // Create a data URL from the blob
        const imageUrl = URL.createObjectURL(blob);

        // Set the image data URL in the state
        setImageData(imageUrl);
        setImageFound(true); // Image found
      })
      .catch(() => {
        // Image not found
        setImageFound(false);
      });
  }, [userId]);

  return (
    <div className='company-logo'>
      {imageFound && imageData && (
        <img src={imageData} alt="User's Image" height='200px' width='200px' style={{borderRadius:'50%'}}/>
      )}

      {!imageFound && (
        <p>No image is currently uploaded.</p>
      )}
    </div>
  );
};

export default DisplayImage;
