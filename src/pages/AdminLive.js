import React, { useEffect, useState } from "react";
import NavbarComponent from "../components/Admin/NavbarComponent";
import { Table } from "react-bootstrap";
import AdminLiveGame from "./AdminLiveGame";
import LiveHistory from "./LiveHistory";
import ButtonToggle from "./ButtonToggle";
import axios from "axios";

const checkT = localStorage.getItem("check");

const AdminLive = () => {
  const [liveGameUsers2, setLiveGameUsers2] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [colorCounts, setColorCounts] = useState({});
  const [sizeCounts, setSizeCounts] = useState({});
  const [redCount, setRedCount] = useState(0);
  const [greenCount, setGreenCount] = useState(0);
  const [blueVioletCount, setBlueVioletCount] = useState(0);
  const [bigCount, setBigCount] = useState(0);
  const [smallCount, setSmallCount] = useState(0);
  useEffect(() => {
    const fetchButtonState = async () => {
      const response = await axios.get(
        "https://mlm-production.up.railway.app/api/notice/button"
      );
      setIsActive(response.data.active);
    };

    fetchButtonState();
  }, []);
  useEffect(() => {
    const fetchLiveGameUsers = async () => {
      try {
        const response = await fetch(
          "https://mlm-production.up.railway.app/api/liveGameUsers"
        );
        const data = await response.json();
        setLiveGameUsers2(data.liveGameUsers);
        setColorCounts(data.colorCounts);
        setSizeCounts(data.sizeCounts);
        setRedCount(data.redCount);
        setGreenCount(data.greenCount);
        setBlueVioletCount(data.blueVioletCount);
        setBigCount(data.bigCount);
        setSmallCount(data.smallCount);
      } catch (error) {
        console.error("Error fetching live game users:", error);
      }
    };

    // Fetch data initially
    fetchLiveGameUsers();

    // Fetch data every second
    const intervalId = setInterval(fetchLiveGameUsers, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run only once on mount

  return (
    <>
      {isActive ? (
        <>
          <div className="adminLive" style={{ minHeight: "800px" }}>
            {checkT ? (
              <>
                <NavbarComponent />
                <AdminLiveGame />
                 
                <h6 className="text-light p-2">User Current Bet History</h6>
                <div className="m-3">
          <h6 className="text-light">Total Number of Red : {redCount}</h6>
          <h6 className="text-light">Total Number of Green : {greenCount}</h6>
          <h6 className="text-light">Total Number of BlueViolet : {blueVioletCount}</h6>
          <h6 className="text-light">Total Number of Big : {bigCount}</h6>
          <h6 className="text-light">Total Number of Small : {smallCount}</h6>
          </div>
                <div className="table-responsive p-1">
                  <Table
                    striped
                    bordered
                    hover
                    style={{
                      border: "2px solid yellow",
                      backgroundImage:
                        "linear-gradient(60deg, #29323c 0%, #1d1f20 100%)",
                    }}
                  >
                    <thead>
                      <tr className="text-warning">
                        <th>#</th>
                        <th>User ID</th>
                        <th>Entry Fee</th>
                        <th> Number</th>
                        <th> Color</th>
                        <th>Big/Small</th>
                      </tr>
                    </thead>
                    <tbody>
                      {liveGameUsers2.map((user, index) => (
                        <tr key={user._id} className="text-light">
                          <td>{index + 1}</td>
                          <td>{user.userId}</td>
                          <td>{user.entryFee}</td>
                          <td>{user.choosenNumber}</td>
                          <td>{user.choosenColor}</td>
                          <td>{user.choosenLetter}</td>
                          {/* <td>{user.userId}</td> */}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
                <LiveHistory />
              </>
            ) : (
              <>
                <h6>Login Again</h6>
              </>
            )}
          </div>
        </>
      ) : (
        <div className="d-flex justify-content-center align-items-center " style={{flexDirection:'column'}}>
          <h6 className="text-center text-dark p-4"> Game Not Started yet!</h6>
          <ButtonToggle />
        </div>
      )}
    </>
  );
};

export default AdminLive;
