import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import { format } from 'date-fns';
import { Container } from 'react-bootstrap';

const NewUsersChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://mlm-psi.vercel.app/api/users/new/users-created');
        setChartData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Initialize an object to store user creation counts for each month
  const monthlyCounts = {};

  // Loop through the data and count users for each month
  chartData.forEach((data) => {
    const month = format(new Date(data.date), 'MMM');
    monthlyCounts[month] = (monthlyCounts[month] || 0) + data.count;
  });

  // Get an array of months in chronological order
  const uniqueMonths = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const options = {
    chart: {
      id: 'user-creation-chart',
      type: 'line',
      height: 350,
    },
    xaxis: {
      type: 'category',
      categories: uniqueMonths,
      labels: {
        rotate: -45,
        rotateAlways: true,
      },
    },
    yaxis: {
      title: {
        text: 'Number of Users Created',
      },
    },
  };

  return (
    <Container className="user-chart-container">
      <h6 className='text-center pt-3'>New User Creation Line Chart</h6>
      <Chart
        options={options}
        series={[{ name: 'Users Created', data: uniqueMonths.map(month => monthlyCounts[month] || 0) }]}
        type="line"
        height={350}
      />
    </Container>
  );
};

export default NewUsersChart;
