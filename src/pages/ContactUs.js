


import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    const dataToSubmit = {
      name,
      email,
      message,
    };

    try {
      const response = await axios.post('https://cute-puce-xerus.cyclic.app/api/send-email', dataToSubmit);

      if (response.status === 200) {
        alert('Contact us form submitted!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        alert('Oops, something went wrong. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Oops, something went wrong. Please try again.');
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const validateForm = () => {
    let isValid = true;

    if (!name) {
      alert('Please enter your name.');
      isValid = false;
    }

    if (!email) {
      alert('Please enter your email address.');
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        isValid = false;
      }
    }

    if (!message) {
      alert('Please enter a message.');
      isValid = false;
    }

    return isValid;
  };

  return (
    <Container  id='contact'>
      <Row className="contact-row" style={{ marginTop: "20px" }}>
        <Col sm={12} md={6} lg={7} className="contact-section ">
          <Form onSubmit={handleSubmit} style={{minWidth:'100%'}}>
            <div className="formInput" style={{ marginTop: "10px" }}>
              <div className='form_input' style={{ marginTop: "10px" }}>
                <Form.Group controlId="name">
                  <Form.Label>Name:</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className='contact_input'
                  />
                </Form.Group>
              </div>
              <div className='form_input' style={{ marginTop: "10px" }}>
                <Form.Group controlId="email">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    className='contact_input'
                  />
                </Form.Group>
              </div>
              <div className='form_input' style={{ marginTop: "10px" }}>
                <Form.Group controlId="message">
                  <Form.Label>Message:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className='contact_input'
                  />
                </Form.Group>
                {/* Similar structure for email and message */}
                <div className='d-flex m-auto'>
                <Button variant="outline-primary" className='m-2 p-2'  style={{width:'150px'}} type="submit">Send</Button>
                </div>
              </div>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ContactForm;
