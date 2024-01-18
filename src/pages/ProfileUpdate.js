// export default ProfileUpdate;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import spinner from '../assets/spinner2.gif';
import { Button, Container } from 'react-bootstrap';

const ProfileUpdate = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileData, setProfileData] = useState({
    // name: '',
    bio: '',
    mobile: '',
    email: '',
    accountNo: '',
    ifscCode: '',
    GPay: '',
    // aadhar: '',
    accountHolderName: ''
  });
    const [isDetailsUpdatedOnServer, setIsDetailsUpdatedOnServer] = useState(false);
  const [updateCount, setUpdateCount] = useState(0);
  const [maxUpdateLimit] = useState(3);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('token');
  // for navigate user
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://mlm-production.up.railway.app/api/users/profile',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        console.log(response.data); // check the response data
        setProfileData(response.data);
                setIsDetailsUpdatedOnServer(response.data.detailsUpdated || false);

        setUpdateCount(response.data.updateCount || 0);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    if (isDetailsUpdatedOnServer) {
      alert('You have reached your update limit. Cannot update again.');
      setIsSubmitting(false);
      return;
    }

    if (updateCount >= maxUpdateLimit) {
      alert('You have reached your update limit. Cannot update again.');
      setIsSubmitting(false);
      return;
    }
    try {
      // Make API call to update profile using profileData state
      const response = await axios.post(
        'https://mlm-production.up.railway.app/api/users/profileUpdate',
        profileData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      setErrorMessage('');
      console.log(response.data.message);
      setIsSubmitting(false);
      alert(response.data.message);
      navigate('/dashboard');
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error || 'Error updating profile');
      } else {
        setErrorMessage('Error updating profile');
      }
      setIsSubmitting(false);
    }
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  if (!isAuthenticated) {
    return <p>Please log in to update your profile</p>;
  }

  if (isLoading) {
    return (
      <h6
        className="text-center"
        style={{
          marginTop: '-70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          width: '100%'
        }}
      >
        <img
          src={spinner}
          alt="spinner"
          height="100px"
          width="100px"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        />
      </h6>
    );
  }
const remainingUpdate = maxUpdateLimit -updateCount;
  return (
    <div className='profile-Update'>
        <h6 className='text-center text-success mt-2'> Please, Update Your Profile</h6>
      <div className='updateRemainig'>
      <h6 className='text-end text-danger mt-1 ' style={{zIndex:'1'}}>*You have {remainingUpdate} Attempts left to  update your Profile</h6>
      </div>
    <div className='profileUpdate'>
    </div>
    <Container>
    <div className="form_container form_containers">
      <div className="form_data">
        <form onSubmit={handleSubmit}>

          <div className="form_input">
            <label htmlFor="bio">Biography:</label>
            <input
              type="text"
              id="bio"
              name="bio"
              value={profileData.bio || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="form_input">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={profileData.email || ''}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form_input">
            <label htmlFor="accountHolderName">AccountHolderName:</label>
            <input
              type="text"
              id="accountHolderName"
              name="accountHolderName"
              value={profileData.accountHolderName || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="form_input">
            <label htmlFor="accountNo">AccountNo:</label>
            <input
              type="text"
              id="accountNo"
              name="accountNo"
              value={profileData.accountNo || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="form_input">
            <label htmlFor="ifscCode">IFSCCode:</label>
            <input
              type="text"
              id="ifscCode"
              name="ifscCode"
              value={profileData.ifscCode || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="form_input">
            <label htmlFor="GPay">GPay:</label>
            <input
              type="text"
              id="GPay"
              name="GPay"
              value={profileData.GPay || ''}
              onChange={handleInputChange}
            />
          </div>
          {/* Add other input fields as needed */}

          {errorMessage && <p>{errorMessage}</p>}

          <Button variant='dark' type="submit"className='m-1 w-100' disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update'}
          </Button>

          <Button variant='secondary 'className='m-1 w-100' onClick={handleProfile}>
            Profile
          </Button>
        </form>
      </div>
    </div>
    </Container>
    
    </div>
  );
};

export default ProfileUpdate;

// ProfileUpdate.js

// ProfileUpdate.js

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import spinner from '../assets/spinner2.gif';

// const ProfileUpdate = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [profileData, setProfileData] = useState({
//     name: '',
//     mobile: '',
//     email: ''
//   });
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isDetailsUpdatedOnServer, setIsDetailsUpdatedOnServer] = useState(false);
//   const [updateCount, setUpdateCount] = useState(0);
//   const [maxUpdateLimit] = useState(3);
//   const [isLoading, setIsLoading] = useState(true);
//   const token = localStorage.getItem('token');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           'http://localhost:3001/api/users/profile',
//           {
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           }
//         );

//         console.log(response.data);
//         setProfileData(response.data);

//         setIsDetailsUpdatedOnServer(response.data.detailsUpdated || false);

//         setUpdateCount(response.data.updateCount || 0);

//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error fetching profile data:', error);
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, [token]);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setProfileData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (isDetailsUpdatedOnServer) {
//       alert('Details already updated. Cannot update again.');
//       return;
//     }

//     if (updateCount >= maxUpdateLimit) {
//       alert('You have reached your update limit. Cannot update again.');
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const response = await axios.post(
//         'http://localhost:3001/api/users/profileUpdate',
//         profileData,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`
//           }
//         }
//       );

//       setErrorMessage('');
//       console.log(response.data.message);
//       setIsSubmitting(false);

//       setIsDetailsUpdatedOnServer(true);

//       setUpdateCount((prevCount) => prevCount + 1);

//       alert(response.data.message);
//       navigate('/dashboard');
//     } catch (error) {
//       if (error.response && error.response.data) {
//         setErrorMessage(error.response.data.error || 'Error updating profile');
//       } else {
//         setErrorMessage('Error updating profile');
//       }
//       setIsSubmitting(false);
//     }
//   };
//   useEffect(() => {
//     // Check if token exists in local storage
//     const token = localStorage.getItem('token');
//     if (token) {
//       setIsAuthenticated(true);
//     }
//   }, []);
//   if (!isAuthenticated) {
//     return <p>Please log in to update your profile</p>;
//   }
//   const handleProfile = () => {
//     navigate('/profile');
//   };
//   if (isLoading) {
//     return (
//       <h6
//         className="text-center"
//         style={{
//           marginTop: '-70px',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           height: '100vh',
//           width: '100%'
//         }}
//       >
//         <img
//           src={spinner}
//           alt="spinner"
//           height="100px"
//           width="100px"
//           style={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center'
//           }}
//         />
//       </h6>
//     );
//   }

//   return (
//     <div className="form_container">
//       <div className="form_data">
//         <form onSubmit={handleSubmit}>
//           <div className="form_input mt-4">
//             <label htmlFor="name">Name:</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={profileData.name || ''}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div className="form_input mt-4">
//             <label htmlFor="mobile">Mobile:</label>
//             <input
//               type="tel"
//               id="mobile"
//               name="mobile"
//               value={profileData.mobile || ''}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div className="form_input mt-4">
//             <label htmlFor="email">Email:</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={profileData.email || ''}
//               onChange={handleInputChange}
//             />
//           </div>

//           {errorMessage && <p>{errorMessage}</p>}

//           <button className="form_button" type="submit" disabled={isSubmitting}>
//             {isSubmitting ? 'Updating...' : 'Update'}
//           </button>

//           <button className="form_button" onClick={handleProfile}>
//             Profile
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProfileUpdate;
