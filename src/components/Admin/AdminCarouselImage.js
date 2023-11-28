import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import imageSpinner from '../../assets/imageSpinner.gif'
const App = () => {
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(true);

  const controller = new AbortController();
  const signal = controller.signal;

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', image);

      await axios.post('https://mlm-production.up.railway.app/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Fetch the updated images after upload
      const response = await axios.get('https://mlm-production.up.railway.app/images', { signal });
      setImages(response.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
      } else {
        console.error(error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://mlm-production.up.railway.app/delete/${id}`, { signal });

      // Fetch the updated images after deletion
      const response = await axios.get('https://mlm-production.up.railway.app/images', { signal });
      setImages(response.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://mlm-production.up.railway.app/images', { signal });
console.log('Server Response:', response);
setImages(response.data);

        setLoadingImages(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled:', error.message);
        } else {
          console.error(error);
        }
      }
    };

    fetchImages();

    // Cleanup function to cancel pending requests when the component unmounts
    return () => {
      controller.abort();
    };
  }, [signal]);
//   console.log('Image Data:', images.data)

function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }
  
  return (
    <Container>
      <input type="file" accept="image/*" onChange={handleFileChange} style={{maxWidth:'200px'}} />
      <Button variant="primary" className='m-1' onClick={handleUpload} disabled={!image}>
        Upload Image
      </Button>

      <div style={{ marginTop: '20px' }}>
        {loadingImages ? (
          <p className='text-center'><img src={imageSpinner} height='55px' width='55px' alt='spinner'/></p>
        ) : (
            <Container>
            <Row>
              <Col sm={12} md={6} lg={4} className='CarouselImage'>
                {images.map((img) => (
                  <Card key={img._id} style={{ width: '18rem', height: '14rem', marginBottom: '10px' }}>
                    <Card.Img
                      variant="top"
                      src={`data:${img.contentType};base64,${arrayBufferToBase64(img.data.data)}`}
                      height='165px'
                      width='100%'
                    />
                    <Card.Body>
                      <Button variant="danger" onClick={() => handleDelete(img._id)}>
                        Delete
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
              </Col>
            </Row>
          </Container>
          
        )}
      </div>
    </Container>
  );
};

export default App;
