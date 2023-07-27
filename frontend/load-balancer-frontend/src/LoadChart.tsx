import { useState, useEffect } from 'react';
import {
  LineElement,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';
import io from 'socket.io-client';
import { Line } from 'react-chartjs-2';
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

// src/interfaces/chartData.ts

export interface ChartData {
  labels: string[];
  datasets: Dataset[];
}

export interface Dataset {
  label: string;
  data: number[];
  fill: boolean;
  backgroundColor: string;
  borderColor: string;
}

const LoadChart = () => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: ['Server1', 'Server2', 'Server3'],
    datasets: [
      {
        label: '# of requests',
        data: [0, 0, 0],
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  });

  useEffect(() => {
    const socket = io('http://localhost:3001');
    socket.on('loadData', (loadData: number[]) => {
      setChartData((prevState) => ({
        ...prevState,
        datasets: [
          {
            ...prevState.datasets[0],
            data: loadData,
          },
        ],
      }));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <Line data={chartData} />
    </div>
  );
};

export default LoadChart;
