import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeamTaskReport = ({ userId }) => {
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await axios.get(`https://mlm-production.up.railway.app/api/teamTaskReport/${userId}`);
        setTeamData(response.data);
      } catch (error) {
        console.error('Error fetching team data:', error);
      }
    };

    fetchTeamData();
  }, [userId]);

  return (
    <div className='table-responsive'>
      <h6 className='text-center text-secondary'>Team Task Report for {userId}</h6>
      <table className="table table-bordered">
        <thead className="fw-300">
          <tr className="text-light text-center">
            <th>S.No</th>
            <th>Level</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(teamData).map((level, index) => (
            <tr key={level}>
              <td className="text-warning text-center">{index + 1}</td>
              <td className="text-center" style={{ color: '#fccb90' }}>
                {level}
              </td>
              <td className="text-light text-center">{teamData[level].completed} &nbsp; &nbsp;<img src='https://cdn-icons-png.flaticon.com/128/190/190411.png' height='20px' width='20px' alt='completed'/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamTaskReport;
