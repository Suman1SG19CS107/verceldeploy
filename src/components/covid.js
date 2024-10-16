import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Region from './region';
import './Covid.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Covid = () => {
  const [data, setData] = useState({});
  const [filter, setFilter] = useState('total'); // New filter state

  const getData = async () => {
    try {
      const res = await fetch('https://api.rootnet.in/covid19-in/stats/latest');
      const adata = await res.json();
      console.log(adata['data']['summary']);
      setData(adata['data']['summary']);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Filter options
  const filterOptions = {
    total: ['Foreign Cases', 'Indian Cases', 'Discharged', 'Deaths', 'Total Cases'],
    foreign: ['Foreign Cases'],
    indian: ['Indian Cases'],
    discharged: ['Discharged'],
    deaths: ['Deaths'],
  };

  // Data for the chart based on the selected filter
  const chartData = {
    labels: filterOptions[filter],
    datasets: [
      {
        label: 'COVID-19 Stats',
        data: [
          filter === 'total' || filter === 'foreign' ? data.confirmedCasesForeign : null,
          filter === 'total' || filter === 'indian' ? data.confirmedCasesIndian : null,
          filter === 'total' || filter === 'discharged' ? data.discharged : null,
          filter === 'total' || filter === 'deaths' ? data.deaths : null,
          filter === 'total' ? data.total : null
        ].filter(value => value !== null), // Filter out any null values
        backgroundColor: [
          'rgba(255, 206, 86, 0.2)',   // Yellow (Foreign Cases)
          'rgba(75, 192, 192, 0.2)',   // Teal (Indian Cases)
          'rgba(153, 102, 255, 0.2)',  // Purple (Discharged)
          'rgba(255, 99, 132, 0.2)',   // Red (Deaths)
          'rgba(54, 162, 235, 0.2)',   // Blue (Total Cases)
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',   // Yellow
          'rgba(75, 192, 192, 1)',   // Teal
          'rgba(153, 102, 255, 1)',  // Purple
          'rgba(255, 99, 132, 1)',   // Red
          'rgba(54, 162, 235, 1)',   // Blue
        ],
        borderWidth: 1,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `COVID-19 Statistics in India (${filter.charAt(0).toUpperCase() + filter.slice(1)})`,
      },
    },
  };

  return (
    <>
      <div className="filter-container" class="p-20">
        {/* Dropdown filter */}
        <select
          className="filter-dropdown"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="total">All</option>
          <option value="foreign">Foreign Cases</option>
          <option value="indian">Indian Cases</option>
          <option value="discharged">Discharged</option>
          <option value="deaths">Deaths</option>
        </select>
      </div>

      <div className="w-[100%] lg:w-[40%]">
        <Bar data={chartData} options={chartOptions} />
      </div>
      
      <Region />
    </>
  );
};

export default Covid;
