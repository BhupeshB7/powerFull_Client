import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import carousel1 from '../assets/Carousel1.jpg'
import carousel2 from '../assets/carousel2.jpg'
import carousel3 from '../assets/carousel3.jpg'
function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  // Replace these placeholder image URLs with your actual image URLs
  const imageUrls = [
    carousel1,
    carousel2,
    carousel3,
  ];

  return (
    <Container fluid className='p-1 w-100 h-35%' >
    <Carousel activeIndex={index} onSelect={handleSelect} className='carousel'>
      {imageUrls.map((imageUrl, i) => (
        <Carousel.Item key={i}>
          <img className="d-block w-100" src={imageUrl} alt={`Slide ${i}`} height='250px' style={{borderRadius:'7px'}} />
          {/* <Carousel.Caption>
            <h3>Slide {i + 1} label</h3>
           
          </Carousel.Caption> */}
        </Carousel.Item>
      ))}
    </Carousel>
    </Container>
  );
}

export default ControlledCarousel;
