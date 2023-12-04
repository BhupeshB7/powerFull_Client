import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeamTable from './TeamTable';
import { Button, Modal } from 'react-bootstrap';

const TeamTaskReport = ({ userId }) => {
  const [teamData, setTeamData] = useState([]);
  const [showModal,setShowModal] =useState(false);
  const showTaskModal=()=>{
    setShowModal(true);
  }
  const closeModal=()=>{
    setShowModal(false);
  }
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
    <>
    <div className='d-flex align-items-center justify-content-center'>
    <Button className='m-2' variant='outline-warning' style={{width:'210px'}}  onClick={showTaskModal}>Team Task Report</Button>
    </div>
    <Modal show={showModal}
    onHide={closeModal}
    style={{ background:'rgba(0,0,0,0.80'}}>
    {/* style={{ backgroundImage:'linear-gradient(to top, #f43b47 0%, #453a94 100%)'}}> */}
      <Modal.Header closeButton  style={{ backgroundImage: 'linear-gradient(to top, #9890e3 0%, #b1f4cf 100%)'}}>
      
        <Modal.Title>
          <h5 className='text-success'>User Task Report</h5> 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body  style={{ backgroundImage:'linear-gradient(to top, #233333 0%, #453c94 100%)'}}>
      <div className='table-responsive'>
      <h6 className='text-center text-info'>Team Task Report for {userId}</h6>
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
              <td className=" text-center" style={{color:'rgb(211, 246, 211)'}}>{teamData[level].completed} &nbsp; &nbsp;<img src='https://cdn-icons-png.flaticon.com/128/190/190411.png' height='20px' width='20px' alt='completed'/></td>
            </tr>
          ))}
        </tbody>
      </table>
      <TeamTable userId={userId}/>
    </div>
      </Modal.Body>
    </Modal>
    

    </>
  );
};

export default TeamTaskReport;
