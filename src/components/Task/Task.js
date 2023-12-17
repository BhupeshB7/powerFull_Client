
// Task.js
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from './Services';
import axios from 'axios';
import ParticleComponent from './ParticleComponent';
import spinner from '../../assets/spinner2.gif'
const Task = () => {
  const { taskId } = useParams();
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState([]);
  const [sponsorId, setSponsorId] = useState([]);
  const [mobile, setMobile] = useState([]);
  const [name, setName] = useState([]);
  const [task, setTask] = useState(null);
  const [userTaskStatus, setUserTaskStatus] = useState(false); // Initialize userTaskStatus as false
  const [timerActive, setTimerActive] = useState(false); // Initialize timerActive as false
  const [timeLeft, setTimeLeft] = useState(0); // Initialize timeLeft as 0
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch('https://mlm-production.up.railway.app/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        const data = await response.json();
        setData(data);
        const userId = data?.userId;
        const sponsorId = data?.sponsorId;
        const mobile = data?.mobile;
        const name = data?.name;
        console.log(`Token Data user Id - ${userId}`)
        console.log(`Token Data sponsor Id - ${sponsorId}`)
        if (mobile) {
          setMobile(mobile);
      }
       else {
        throw new Error('Mobile is missing from response data');
      }
      if (name) {
        setName(name);
    }
     else {
      throw new Error('Name is missing from response data');
    }
        if (sponsorId) {
          setSponsorId(sponsorId);
      }
       else {
        throw new Error('SponsorId ID is missing from response data');
      }
        if (userId) {
            setUserId(userId);
        }
         else {
          throw new Error('User ID is missing from response data');
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserId();
  }, [token]);
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await api.get(`/tasks/${taskId}`);
        setTask(response.data);
        //  const userId = userId;
        // Assuming you have the user ID of the logged-in user stored somewhere in your application state
        // const userId = '643ef2a4f3f52691d4459259'; // Replace this with the actual user ID of the logged-in user
        const userTaskResponse = await axios.get(`https://mlm-production.up.railway.app/userTasks/${taskId}/${userId}`);
        // console.log(`Task Page user Id - ${userId} `)
        setUserTaskStatus(userTaskResponse.data.completed);
      } catch (error) {
        console.error('Failed to fetch the task', error);
      }
    };

    fetchTask();
  }, [taskId, userId]);

  const startTimer = (videoLink) => {
    window.open(videoLink,'_blank');
    setTimerActive(true);
    // Set the timer duration in seconds (e.g., 120 seconds)
    const timerDuration = 30;

    // Start the timer
    setTimeLeft(timerDuration);
    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(timerInterval);
      handleTaskCompletion();
    }, timerDuration * 1000);
  };
  console.log('Completed UserId:');
  console.log(sponsorId);
  const handleTaskCompletion = async () => {
      try {
        // const userId = data._id; // Replace this with the actual user ID of the logged-in user
      await api.patch(`/tasks/${taskId}/complete`, { userId,sponsorId,name,mobile });
      setUserTaskStatus(true); // Update the userTaskStatus in the state
      setTimerActive(false); // Reset the timerActive state to false
    } catch (error) {
      console.error('Failed to mark the task as completed', error);
    }
  };


  if (!task) {
    return <h6 className='text-center' style={{ marginTop: '-70px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100%' }}><img src={spinner} alt="spinner" height="90px" width="90px" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} /></h6>;
  }
  return (
    <div className=' task_fluid_container'>
        <ParticleComponent/>
      <h5 className='text-light' style={{ textDecoration: 'underline', marginTop:'50px', }}>{task.title}</h5>
      {/* <h3>{task.videoLink}</h3> */}
      <div className='video_container'>
        <iframe width={330} height={200} style={{ marginTop: '-62px' }} title={task.title} src={`https://www.youtube.com/embed/VIDEO_ID_HERE?autoplay=1&mute=1`} // Replace VIDEO_ID_HERE with the actual video ID
    />
      </div>

      <h6 className='text-light' style={{ marginTop: '-20px', textTransform:'uppercase' }}>Status: {userTaskStatus ? 'Completed' : 'Pending'}</h6>

      {!userTaskStatus && !timerActive && (
        <>
        <button onClick={()=>startTimer(task.videoLink)} style={{ background:'transparent', border:'none'}}>
        <div className="box-3">
            <div className="taskbtn  btn-three "style={{width:'230px'}}>
              <h6 className='p-3' type='button'   onClick={()=>startTimer(task.videoLink)} style={{ background:'transparent', border:'none'}}>START</h6>
            </div>
          </div>
        </button>
       
         </>
      )}

      {timerActive && <h6 className='text-light' >Time Remaining: {timeLeft} seconds</h6>}
     
     <Link  style={{textDecoration:'none', color:'gray', }} to='/tasks'>
      <div className="box-3">
        <div className="taskbtn btn-three m-3 " style={{width:'230px'}}>
          {/* <h6 className='text-center  mt-2'>YOUR TASK IS PENDING</h6> */}
          <h6 className='p-3' >Back to Task List</h6>
        </div>
      </div>
      </Link>
    </div>
  );
};

export default Task;
