// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import api from './Services';
// import axios from 'axios';
// import error from '../../assets/error.png';
// import ParticleComponent from './ParticleComponent';
// import './TaskList.css';
// import spinner from '../../assets/spinner2.gif'
// const TaskList = () => {
//   const [data, setData] = useState([]);
//   const [userId, setUserId] = useState('');
//   const [id, setId] = useState('');
//   const [tasks, setTasks] = useState([]);
//   const [taskStatus, setTaskStatus] = useState({});
//   const [allTasksCompleted, setAllTasksCompleted] = useState(false);
//   const [incomeWalletUpdated, setIncomeWalletUpdated] = useState(false);
//   const token = localStorage.getItem('token');
//   const [lastAlertTime, setLastAlertTime] = useState(localStorage.getItem('lastAlertTime'));
//   const [authorizationChecked, setAuthorizationChecked] = useState(false);

//   useEffect(() => {
//     const fetchUserAndCheckAuthorization = async () => {
//       try {
//         const response = await fetch('https://mlm-production.up.railway.app/api/users/profile', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         if (!response.ok) {
//           throw new Error('Failed to fetch user profile');
//         }
//         const data = await response.json();
//         setData(data);
//         const userId = data?.userId;
//         if (userId) {
//           setUserId(userId);
//         } else {
//           throw new Error('User ID is missing from response data');
//         }
//         const id = data?._id;
//         if (id) {
//           setId(id);
//         } else {
//           throw new Error('User ID is missing from response data');
//         }
//         setAuthorizationChecked(true);
//       } catch (error) {
//         console.error(error);
//         setAuthorizationChecked(true);
//       }
//     };
//     fetchUserAndCheckAuthorization();
//   }, [token]);

//   useEffect(() => {
//     if (authorizationChecked && token && data && data.is_active) {
//       const fetchTasks = async () => {
//         try {
//           const response = await api.get('/tasks');
//           setTasks(response.data);
//         } catch (error) {
//           console.error('Failed to fetch tasks', error);
//         }
//       };
//       fetchTasks();
//     }
//   }, [authorizationChecked, token, data]);

//   useEffect(() => {
//     const fetchTaskStatus = async () => {
//       try {
//         const taskStatusData = {};
//         for (const task of tasks) {
//           const taskId = task._id;
//           const response = await axios.get(`https://mlm-production.up.railway.app/userTasks/${taskId}/${id}`);
//           taskStatusData[taskId] = response.data.completed;
//         }
//         setTaskStatus(taskStatusData);
//         const allTasksCompleted = tasks.every((task) => taskStatusData[task._id]);
//         // console.log(allTasksCompleted);
//         // console.log(taskStatusData);
//         setAllTasksCompleted(allTasksCompleted);
//       } catch (error) {
//         console.error('Failed to fetch task completion status', error);
//       }
//     };

//     if (tasks.length > 0) {
//       fetchTaskStatus();
//     }
//   }, [tasks, id]);

//   const updateIncomeWallet = async () => {
//     if(allTasksCompleted){
//       return;
//     }
//     try {
//       const response = await axios.post(`https://mlm-production.up.railway.app/api/updateWallet/${userId}`);
//       console.log('Income Wallet updated successfully:', response.data);
//       alert('Updated');
//     } catch (error) {
//       console.error('Failed to update Income Wallet:', error);
//     }
//   };

//   useEffect(() => {
//     // const alertShown = localStorage.getItem('alertShown');

//     if (allTasksCompleted) {
//       updateIncomeWallet();
//       setIncomeWalletUpdated(true);
//       alert('All tasks are completed successfully!');
//       // localStorage.setItem('alertShown', 'true');
//       const currentTime = new Date().getTime();
//       // localStorage.setItem('lastAlertTime', currentTime);
//       // setLastAlertTime(currentTime);
//     }
//   }, [allTasksCompleted]);

//   // useEffect(() => {
//   //   // Call updateIncomeWallet when allTasksCompleted becomes true for the first time
//   //   if (allTasksCompleted && !incomeWalletUpdated) {
//   //     updateIncomeWallet();
//   //     setIncomeWalletUpdated(true); // Mark income wallet as updated
//   //   }
//   // }, [allTasksCompleted, incomeWalletUpdated]);


//   useEffect(() => {
//     const currentTime = new Date().getTime();
//     const timeDiff = currentTime - lastAlertTime;
//     const twelveHoursInMs = 12 * 60 * 60 * 1000;

//     if (timeDiff >= twelveHoursInMs) {

//       localStorage.removeItem('alertShown');
//       setLastAlertTime(null);
//     }
//   }, [lastAlertTime]);


//   // const updateIncomeWallet = async () => {
//   //   try {
//   //     const response = await axios.post(`https://mlm-production.up.railway.app/api/updateWallet/${userId}`);
//   //     console.log('Income Wallet updated successfully:', response.data);
//   //   } catch (error) {
//   //     console.error('Failed to update Income Wallet:', error);
//   //   }
//   // };

//   const checkPreviousTaskCompletion = (index) => {
//     if (index === 0) {
//       return true;
//     }
//     const previousTaskId = tasks[index - 1]._id;
//     return taskStatus[previousTaskId];
//   };

//   const handleAlert = () => {
//     alert('Please Complete the Previous Task');
//   };

//   const handleDashBoard = () => {
//     window.location.href = '/dashboard';
//   };

//   return (
//     <div>
//       <ParticleComponent />
//       <button className='m-3 btn btn-primary' onClick={handleDashBoard}>
//         DashBoard
//       </button>

//       {authorizationChecked ? (
//         token && data && data.is_active ? (
//           <div>
//             <h6 className='text-center text-info fw-700 m-3'>Hello, {data.name}</h6>
//             <h5 className='text-secondary text-center fw-600 m-1'>Today's Task</h5>

//             {allTasksCompleted && <h6 style={{ marginLeft: '20px', color: 'green' }}>All tasks are completed successfully!</h6>}

//             {tasks.map((task, index) => (
//               <div key={task._id}>
//                 {index === 0 || checkPreviousTaskCompletion(index) ? (
//                   <Link
//                     to={{
//                       pathname: `/tasks/${task._id}`,
//                       state: { taskId: task._id },
//                     }}
//                     style={{ textDecoration: 'none' }}
//                   >
//                     <div className='task_container'>
//                       <h6 className={taskStatus[task._id] ? 'status_completed' : 'status_pending'}>
//                         {taskStatus[task._id] ? 'COMPLETED' : 'PENDING'}
//                       </h6>
//                       <div className='task_box'>
//                         <h6 className='text-light' style={{width:'200px'}}>{task.title}</h6>
//                         <img src='https://cdn-icons-png.flaticon.com/512/762/762686.png' height='100px' width='70px' alt='df' />
//                       </div>
//                     </div>
//                   </Link>
//                 ) : (
//                   <>
//                     <div className='task_container' onClick={handleAlert}>
//                       <h6 className={taskStatus[task._id] ? 'status_completed' : 'status_pending'}>PENDING</h6>
//                       <div className='task_box'>
//                         <h6 className='text-light' style={{width:'200px'}}>{task.title}</h6>
//                         <img src='https://cdn-icons-png.flaticon.com/512/762/762686.png' height='100px' width='70px' alt='df' />
//                       </div>
//                     </div>
//                   </>
//                 )}
//               </div>
//             ))}
//             <div className='bottom_section'>
//               <div className='row footer_row_content' style={{ backgroundImage: 'linear-gradient(to right,#CB218E 0%,  #6617CB 100%)', height: '70px' }}>
//                 <div className='col-12'>
//                   <Link className='text-warning tex-center' style={{ fontSize: '17px' }} to='/dashboard'>
//                     <b style={{ fontSize: '21px' }}>&copy;GSP</b> 2023 || All right reserved.
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <>
//             <h6 className='text-light' style={{ marginTop: '25px', marginBottom: '-20px', paddingLeft: '10px' }}>
//               You do not have access to this content.
//             </h6>
//             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '350px', width: '400px' }}>
//               <img src={error} alt='Access Denied!' height='250px' width='350px' />
//             </div>
//             <h4 className='text-center text-danger' style={{ marginTop: '-30px' }}>
//               Access Denied!
//             </h4>
//           </>
//         )
//       ) : (
//         <div>

//             <h6 className='text-center' style={{ marginTop: '-70px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100%' }}><img src={spinner} alt="spinner" height="90px" width="90px" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} /></h6>;
//         </div>
       
         
//       )}
//     </div>
//   );
// };

// export default TaskList;







import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from './Services';
import axios from 'axios';
import error from '../../assets/error.png';
import ParticleComponent from './ParticleComponent';
import './TaskList.css';
import spinner from '../../assets/spinner2.gif'
const TaskList = () => {
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState('');
  const [id, setId] = useState('');
  const [tasks, setTasks] = useState([]);
  const [taskStatus, setTaskStatus] = useState({});
  const [allTasksCompleted, setAllTasksCompleted] = useState(false);
  const [incomeWalletUpdated, setIncomeWalletUpdated] = useState(false);
  const token = localStorage.getItem('token');
  const [lastAlertTime, setLastAlertTime] = useState(localStorage.getItem('lastAlertTime'));
  const [authorizationChecked, setAuthorizationChecked] = useState(false);

  useEffect(() => {
    const fetchUserAndCheckAuthorization = async () => {
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
        if (userId) {
          setUserId(userId);
        } else {
          throw new Error('User ID is missing from response data');
        }
        const id = data?.userId;
        if (id) {
          setId(id);
        } else {
          throw new Error('User ID is missing from response data');
        }
        setAuthorizationChecked(true);
      } catch (error) {
        console.error(error);
        setAuthorizationChecked(true);
      }
    };
    fetchUserAndCheckAuthorization();
  }, [token]);

  useEffect(() => {
    if (authorizationChecked && token && data && data.is_active) {
      const fetchTasks = async () => {
        try {
          const response = await api.get('/tasks');
          setTasks(response.data);
        } catch (error) {
          console.error('Failed to fetch tasks', error);
        }
      };
      fetchTasks();
    }
  }, [authorizationChecked, token, data]);

  useEffect(() => {
    const fetchTaskStatus = async () => {
      try {
        const taskStatusData = {};
        for (const task of tasks) {
          const taskId = task._id;
          const response = await axios.get(`https://mlm-production.up.railway.app/userTasks/${taskId}/${id}`);
          taskStatusData[taskId] = response.data.completed;
        }
        setTaskStatus(taskStatusData);
        const allTasksCompleted = tasks.every((task) => taskStatusData[task._id]);
        setAllTasksCompleted(allTasksCompleted);
      } catch (error) {
        console.error('Failed to fetch task completion status', error);
      }
    };

    if (tasks.length > 0) {
      fetchTaskStatus();
    }
  }, [tasks, id]);

  // const updateIncomeWallet = async () => {
  //   try {
  //     const response = await axios.post(`https://mlm-production.up.railway.app/api/updateWallet/${userId}`);
  //     console.log('Income Wallet updated successfully:', response.data);
  //   } catch (error) {
  //     console.error('Failed to update Income Wallet:', error);
  //   }
  // };

  // useEffect(() => {
  //   const alertShown = localStorage.getItem('alertShown');

  //   if (allTasksCompleted && !incomeWalletUpdated) {
  //     updateIncomeWallet();
  //     setIncomeWalletUpdated(true);
  //     // alert('All tasks are completed successfully!');
  //     localStorage.setItem('alertShown', 'true');
  //     const currentTime = new Date().getTime();
  //     localStorage.setItem('lastAlertTime', currentTime);
  //     setLastAlertTime(currentTime);
  //   }
  // }, [allTasksCompleted]);

  // useEffect(() => {
  //   const currentTime = new Date().getTime();
  //   const timeDiff = currentTime - lastAlertTime;
  //   const twelveHoursInMs = 6 * 60 * 60 * 1000;

  //   if (timeDiff >= twelveHoursInMs) {
  //     localStorage.removeItem('alertShown');
  //     setLastAlertTime(null);
  //   }
  // }, [lastAlertTime]);

  const checkPreviousTaskCompletion = (index) => {
    if (index === 0) {
      return true;
    }
    const previousTaskId = tasks[index - 1]._id;
    return taskStatus[previousTaskId];
  };

  const handleAlert = () => {
    alert('Please Complete the Previous Task');
  };

  const handleDashBoard = () => {
    window.location.href = '/dashboard';
  };

  return (
    <div>
      <ParticleComponent />
      <button className='m-3 btn btn-primary' onClick={handleDashBoard}>
        DashBoard
      </button>

      {authorizationChecked ? (
        token && data && data.is_active ? (
          <div>
            <h6 className='text-center text-info fw-700 m-3'>Hello, {data.name}</h6>
            <h5 className='text-secondary text-center fw-600 m-1'>Today's Task</h5>

            {allTasksCompleted && <h6 style={{ marginLeft: '20px', color: 'green' }}>All tasks are completed successfully!</h6>}

            {tasks.map((task, index) => (
              <div key={task._id}>
                {index === 0 || checkPreviousTaskCompletion(index) ? (
                  <Link
                    to={{
                      pathname: `/tasks/${task._id}`,
                      state: { taskId: task._id },
                    }}
                    style={{ textDecoration: 'none' }}
                  >
                    <div className='task_container'>
                      <h6 className={taskStatus[task._id] ? 'status_completed' : 'status_pending'}>
                        {taskStatus[task._id] ? 'COMPLETED' : 'PENDING'}
                      </h6>
                      <div className='task_box'>
                        <h6 className='text-light' style={{width:'200px'}}>{task.title}</h6>
                        <img src='https://cdn-icons-png.flaticon.com/512/762/762686.png' height='100px' width='70px' alt='df' />
                      </div>
                    </div>
                  </Link>
                ) : (
                  <>
                    <div className='task_container' onClick={handleAlert}>
                      <h6 className={taskStatus[task._id] ? 'status_completed' : 'status_pending'}>PENDING</h6>
                      <div className='task_box'>
                        <h6 className='text-light' style={{width:'200px'}}>{task.title}</h6>
                        <img src='https://cdn-icons-png.flaticon.com/512/762/762686.png' height='100px' width='70px' alt='df' />
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
            <div className='bottom_section'>
              <div className='row footer_row_content' style={{ backgroundImage: 'linear-gradient(to right,#CB218E 0%,  #6617CB 100%)', height: '70px' }}>
                <div className='col-12'>
                  <Link className='text-warning tex-center' style={{ fontSize: '17px' }} to='/dashboard'>
                    <b style={{ fontSize: '21px' }}>&copy;PI</b> 2023 || All right reserved.
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <h6 className='text-light' style={{ marginTop: '25px', marginBottom: '-20px', paddingLeft: '10px' }}>
              You do not have access to this content.
            </h6>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '350px', width: '400px' }}>
              <img src={error} alt='Access Denied!' height='250px' width='350px' />
            </div>
            <h4 className='text-center text-danger' style={{ marginTop: '-30px' }}>
              Access Denied!
            </h4>
          </>
        )
      ) : (
        <div>

            <h6 className='text-center' style={{ marginTop: '-70px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100%' }}><img src={spinner} alt="spinner" height="90px" width="90px" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} /></h6>;
        </div>
       
         
      )}
    </div>
  );
};

export default TaskList;









