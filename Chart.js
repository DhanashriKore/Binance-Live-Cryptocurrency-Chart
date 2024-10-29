import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, CandlestickController, TimeScale } from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, CandlestickController, TimeScale);

const CandlestickChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update();
    }
  }, [data]);

  const chartData = {
    datasets: [
      {
        label: 'Candlestick Chart',
        data: data.map(d => ({
          x: new Date(d.time),
          o: parseFloat(d.open),
          h: parseFloat(d.high),
          l: parseFloat(d.low),
          c: parseFloat(d.close),
        })),
        borderColor: '#4CAF50',
        borderWidth: 1,
        backgroundColor: '#E0F2F1',
      },
    ],
  };

  return (
    <Chart
      ref={chartRef}
      type="candlestick"
      data={chartData}
      options={{
        responsive: true,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'minute',
            },
            title: {
              display: true,
              text: 'Time',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Price (USDT)',
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
      }}
    />
  );
};

export default CandlestickChart;
