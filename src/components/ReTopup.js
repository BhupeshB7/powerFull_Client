import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ReTopup({ userId }) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivationStatus = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5500/api/auth/checkActivation/${userId}`);
        setMessage(response.data.message);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivationStatus();

    // Clean-up function
    return () => {
      // Any clean-up code if needed
    };
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <p>{message}</p>
    </div>
  );
}

export default ReTopup;
