import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeamTable = ({ userId }) => {
  const [teamStructure, setTeamStructure] = useState(null);
  const [currentMember, setCurrentMember] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://cute-puce-xerus.cyclic.app/api/teamTaskMember/${userId}`);
        setTeamStructure(response.data);
        setCurrentMember(response.data);
      } catch (error) {
        console.error('Error fetching team structure:', error);
      }
    };

    fetchData();
  }, [userId]);

  const handleViewMore = (memberIndex) => {
    const newCurrentMember = currentMember.downline[memberIndex];
    setCurrentMember({ ...newCurrentMember, parent: currentMember });
  };

  const handleViewBack = () => {
    if (currentMember && currentMember.parent) {
      setCurrentMember(currentMember.parent);
    }
  };

  const renderChain = (member) => (
    <div key={member.userId}>
      <div className='text-light'>
        <strong className='text-warning'>Level:</strong> {member.level} | <strong>SponsorID:</strong> {member.sponsorId} | <strong>User ID:</strong> {member.userId} | <strong>Name:</strong> {member.name} | <strong>Mobile:</strong> {member.mobile} | <strong>Status:</strong> {member.status}
      </div>
      {member.downline.length > 0 && (
        <div style={{ marginLeft: '30px',color:'white' }}>
          {member.downline.map((downlineMember, index) => (
            <div key={downlineMember.userId}>
              {renderChain(downlineMember)}
              {index < member.downline.length - 1 && <hr />} {/* Add a horizontal line between downline members */}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div>
      <h5 className='text-warning'>Team Viewer</h5>
      {currentMember && renderChain(currentMember)}
      {currentMember && currentMember.parent && (
        <button onClick={handleViewBack}>View Back</button>
      )}
    </div>
  );
};

export default TeamTable;
