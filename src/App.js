import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
// import UserDisplay from './components/UserDisplay';
import './App.css'
import LoginPage from './components/LoginPage';
import Dashboard from './components/UserDisplay';
import ForgotPassword from './components/ForgotPassword';
import PasswordReset from './components/PasswordReset';
import Error from './pages/Error';
import Login from './components/Admin/Login';
// import PrivateRoute from './components/Admin/PrivateRoute';
import AdminDashboard from './components/Admin/AdminDashboard';
// import Task from './components/Task';
import Profile from './pages/Profile';
import ProfileUpdate from './pages/ProfileUpdate';
// import UserTask from './pages/UserTask';
import Home from './components/Home';
import Withdrawal from './pages/Withdrawal';
import TopUp from './pages/TopUp';
import TaskList from './components/Task/TaskList';
import Task from './components/Task/Task';
import TaskReport from './pages/TaskReport';
import { Helmet } from 'react-helmet';
import FundHistory from './pages/FundHistory';
import Setting from './pages/Setting';
import ColorPredictionGame from './components/ColorPredictionGame';
import Game from './pages/Game';
import Wallet from './pages/Wallet';
import ProfileImage from './extra/App';
import DashboardAdmin from './components/Admin/DashboardAdmin';
import AdminTask from './components/Admin/AdminTask';
import GameDeposit from './components/Admin/GameDeposit';
import SpinGame from './pages/SpinGame';
import UserWallet from './components/Admin/UserWallet';
import DepositForm from './pages/DepositForm';
import DepsoitHistory from './pages/DepositHistory';
import ChangePassword from './pages/ChangePassword';
import TopUpHistory from './pages/TopUpHistory';
import LiveGame from './pages/LiveGame';
import AdminLive from './pages/AdminLive';
import TeamTaskReport from './components/TteamTaskReport';
import GameDepositForm from './pages/GameDepositForm';
import axios from 'axios';
import ColorPredictGame from './pages/ColorPredictGame';
import ColorPridictionGame1 from './pages/ColorPridictionGame1';
import PredictGame from './pages/PredictGame';
import GameBalanceUpdate from './components/Admin/GameBalanceUpdate';
import GameWithdrawalForm from './pages/GameWithdrawalForm';
// import PrivateRoute from './components/Admin/PrivateRoute';

function App() {

  
  const [token, setToken] = useState("");
  const [contactInfoList, setContactInfoList] = useState([]);

  useEffect(() => {
    // Fetch contact info details on component mount
    axios.get('https://mlm-psi.vercel.app/api/contactInfo').then((response) => setContactInfoList(response.data));
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);


  return (
   
    <BrowserRouter>
      <div className="App">
      <Helmet>
        {/* Replace 'UA-XXXXXXXXX-X' with your actual tracking ID */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-0QKNM9VLST"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0QKNM9VLST');
          `}
        </script>
      </Helmet>
        <Routes>
          <Route  path="/" element={<Home contactInfoList={contactInfoList}/>} />
          <Route  path="/image" element={<ProfileImage/>} />
          <Route  path="/register" element={<RegisterForm/>} />

        {/* <PrivateRoute path="/admin/dashboard" isLoggedIn={isLoggedIn}>
          <AdminDashboard onLogout={handleLogout} />
        </PrivateRoute>
        <Route path="/admin-login">
          <Login onLogin={handleLogin} />
        </Route> */}
        {/* <Route path="/admin" element={<PrivateRoute  />}>
          <Route path='dashboard' element={<AdminDashboard/>} />
        </Route> */}
        <Route path="/admin-login" element={<Login />} />
          <Route  path="/login" element={<LoginPage/>} LoginPage={setToken}/>
          {/* <Route  path="/admin-login" element={<Login/>} /> */}
          <Route  path="/dashboard" element={<Dashboard contactInfoList={contactInfoList}/>}/>
          <Route  path="/task" element={<Task/>}/>
          {/* <Route  path="/admin/dashboard" element={<AdminDashboard/>} /> */}
          <Route  path="/admin/dashboard" element={<DashboardAdmin/>} />
          <Route  path="/admin/dashboard/game" element={<GameDeposit/>} />
          <Route  path="/admin/dashboard/userAccount" element={<UserWallet/>} />
          <Route  path="/admin/dashboard/gameAccount" element={<GameBalanceUpdate/>} />
          {/* <Route path="/admin/dashboard" component={AdminDashboard} /> */}
          <Route path="/task/deposit" element={<AdminTask/>} />
           {/* Profile Route */}
          <Route path='/profile' element={<Profile/>} token={token}/>
          <Route path='/setting' element={<Setting/>} token={token}/>
          <Route path='/wallet' element={<Wallet/>}/>
          <Route path='/game' element={<Game/>} />
          <Route path='/game/colorpridictions' element={<ColorPredictionGame/>} />
          <Route path='/game/colorpridiction' element={<PredictGame contactInfoList={contactInfoList}/>} />
          <Route path='/game/colorpridiction/3minutes' element={<ColorPredictGame />} />
          <Route path='/game/colorpridiction/1minutes' element={<ColorPridictionGame1 />} />
          <Route path='/game/colorpridiction/live' element={<LiveGame/>} />
          <Route path='/game/colorpridiction/admin/live' element={<AdminLive/>} />
          <Route path='/game/spinWheel' element={<SpinGame/>} />
          <Route path='/withdrawal' element={<Withdrawal/>} token={token}/>
          <Route path='/topUp' element={<TopUp/>}/>
          <Route path='/topUp-history' element={<TopUpHistory/>}/>
          <Route path='/profile-update' element={<ProfileUpdate/>} />

          <Route  path="/forgotpassword/:id/:token" element={<ForgotPassword/>} />
          <Route  path="/password-reset" element={<PasswordReset/>} />
          <Route  path="/change-password" element={<ChangePassword/>} />
          {/* <Route  path="/userTask" element={<UserTask/>} /> */}
          <Route path='/tasks' element={<TaskList/>}/>
          <Route path='/fundHistory' element={<FundHistory/>}/>
          <Route path='/task-report' element={<TaskReport/>}/>
          <Route path='/task-report-user' element={<TeamTaskReport />}/>
          <Route path='/tasks/:taskId' element={<Task/>}/>
          <Route path='/depositform' element={<DepositForm/>}/>
          <Route path='/depositform/game' element={<GameDepositForm/>}/>
          <Route path='/withdrawalform/game' element={<GameWithdrawalForm/>}/>
          <Route path='/deposithistory' element={<DepsoitHistory/>}/>
          <Route  path="*" element={<Error/>} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
