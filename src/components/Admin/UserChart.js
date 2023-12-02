import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const UserChart = () => {
  const [activeUserCount, setActiveUserCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    // Fetch data for active users
    fetch("https://mlm-production.up.railway.app/api/admin/count-active-items")
      .then((response) => response.json())
      .then((data) => setActiveUserCount(data.numberOfActiveUser))
      .catch((error) => console.error(error));

    // Fetch data for total users
    fetch("https://mlm-production.up.railway.app/api/admin/users/count")
      .then((response) => response.json())
      .then((data) => setTotalCount(data.count))
      .catch((error) => console.error(error));
  }, []);

  const seriesData = [activeUserCount, totalCount - activeUserCount];

  return (
    <div className='d-flex align-items-center justify-content-center'>
      <Chart
        type="pie"
        width={400}
        height={400}
        series={seriesData}
        options={{
          labels: ['Active', 'Inactive'],
          title: { text: 'User Active - Inactive' },
        }}
      />
    </div>
  );
};

export default UserChart;
