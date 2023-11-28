// import React, { useState } from 'react';
// import { Container } from 'react-bootstrap';
// import Carousel from 'react-bootstrap/Carousel';
// import carousel1 from '../assets/Carousel1.jpg'
// import carousel2 from '../assets/carousel2.jpg'
// import carousel3 from '../assets/carousel3.jpg'
// function ControlledCarousel() {
//   const [index, setIndex] = useState(0);

//   const handleSelect = (selectedIndex) => {
//     setIndex(selectedIndex);
//   };

//   // Replace these placeholder image URLs with your actual image URLs
//   const imageUrls = [
//     carousel1,
//     carousel2,
//     carousel3,
//   ];

//   return (
//     <Container fluid className='p-1 w-100 h-35%' >
//     <Carousel activeIndex={index} onSelect={handleSelect} className='carousel'>
//       {imageUrls.map((imageUrl, i) => (
//         <Carousel.Item key={i}>
//           <img className="d-block w-100" src={imageUrl} alt={`Slide ${i}`} height='250px' style={{borderRadius:'7px'}} />
//           {/* <Carousel.Caption>
//             <h3>Slide {i + 1} label</h3>
           
//           </Carousel.Caption> */}
//         </Carousel.Item>
//       ))}
//     </Carousel>
//     </Container>
//   );
// }

// export default ControlledCarousel;

import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';

function ControlledCarousel() {
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState([]);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://mlm-production.up.railway.app/images');
        setImages(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchImages();
  }, []);

  return (
    <Container fluid className='p-1 w-100 h-35%'>
      <Carousel activeIndex={index} onSelect={handleSelect} className='carousel'>
        {images.map((img, i) => (
          <Carousel.Item key={i}>
            <img
              className="d-block w-100"
              src={`data:${img.contentType};base64,${arrayBufferToBase64(img.data.data)}`}
              alt={`Slide ${i}`}
              height='250px'
              style={{ borderRadius: '7px' }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}

function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export default ControlledCarousel;
