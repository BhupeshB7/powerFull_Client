// mern-frontend/src/Form.js
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const FormComponent = () => {
  const initialValues = {
    name: '',
    userID: '',
    oldWallet: '',
    reservedWallet: '',
  };
  const [users, setUsers] = useState([]);

  // Fetch data from the backend
  const fetchUsers = async () => {
    try {
      const response = await fetch('https://gspwebserver.onrender.com/api/users/reTopup');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []); // Fetch data when the component mounts

  const validationSchema = Yup.object({
    name: Yup.string().required('Name Required!'),
    userID: Yup.string().required('UserId Required!'),
    oldWallet: Yup.number().required(' Required!').positive('Must be a positive number'),
    reservedWallet: Yup.number().required(' Required!').positive('Must be a positive number'),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch('https://gspwebserver.onrender.com/api/users/reTopup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      console.log('Data inserted:', data);
      // Optionally, you can display a success message or redirect to another page here
    } catch (error) {
      console.error('Error inserting data:', error);
      // Handle error scenarios here
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  return (
    <>
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <div>
            <h6 className='m-1 p-3 text-danger text-center'>ReTopupUser Form</h6>
            <Field type="text" id="name" name="name" placeholder="Name"  style={{ padding: '10px',width:'280px', background:'transparent' }}/>
            <ErrorMessage name="name" component="div" className="error" style={{color:'red'}}/>
          </div>

          <div>
            <Field type="text" id="userID" name="userID" placeholder="User ID" style={{ padding: '10px',width:'280px', background:'transparent' }}/>
            <ErrorMessage name="userID" component="div" className="error" style={{color:'red'}} />
          </div>

          <div>
            <Field type="number" id="oldWallet" name="oldWallet" placeholder="OLD WALLET" style={{ padding: '10px',width:'280px', background:'transparent' }} />
            <ErrorMessage name="oldWallet" component="div" className="error" style={{color:'red'}}/>
          </div>

          <div>
            <Field type="number" id="reservedWallet" name="reservedWallet" placeholder="Reserved Wallet" style={{ padding: '10px',width:'280px', background:'transparent' }}/>
            <ErrorMessage name="reservedWallet" component="div" className="error"style={{color:'red'}} />
          </div>
          <button className='btn btn-secondary m-2' type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </Form>
      )}
      
    </Formik>
    <div>
        <h5 className='m-3 test-success'>All ReTopup User Data </h5>
        {users.length > 0 ? (
          <ul>
            {users.map((user,index) => (
              <li key={user._id}>
               S.No: <b>{index +1}</b>, Name: {user.name}, UserID: {user.userID}, OLD WALLET: {user.oldWallet}, RESERVED WALLET: {user.reservedWallet}
              </li>
            ))}
          </ul>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </>
  );
};

export default FormComponent;
