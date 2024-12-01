import { CChartLine } from '@coreui/react-chartjs';
import { getStyle } from '@coreui/utils';
import React, { useEffect, useRef } from 'react';

import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(ChartDataLabels);

export default function LineChart({ chartData, max = null,  average = null}) {
  const chartRef = useRef(null);
  

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (chartRef.current) {
        setTimeout(() => {
          chartRef.current.options.scales.x.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          );
          chartRef.current.options.scales.x.grid.color = getStyle('--cui-border-color-translucent');
          chartRef.current.options.scales.x.ticks.color = getStyle('--cui-body-color');
          chartRef.current.options.scales.y.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          );
          chartRef.current.options.scales.y.grid.color = getStyle('--cui-border-color-translucent');
          chartRef.current.options.scales.y.ticks.color = getStyle('--cui-body-color');
          chartRef.current.update();
        });
      }
    });
  }, [chartRef]);

  if (!chartData || !chartData.labels || !chartData.datasets) {
    console.error('Invalid chart data:', chartData);
    return null;
  }

  

  const formattedDatasets = chartData.datasets.map(dataset => {
    return {
      ...dataset,
      data: dataset.data || []
    }
  });

  return (
    <CChartLine
      ref={chartRef}
      style={{ height: '300px', marginTop: '40px' }}
      data={{
        labels: chartData.labels,
        datasets: formattedDatasets,
      }}
      options={{
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          datalabels: {
            display: true,
            align: 'top',
            color: getStyle('--cui-body-color'),
            formatter: (value) => value,
          },
        },
        scales: {
          x: {
            grid: {
              color: getStyle('--cui-border-color-translucent'),
              drawOnChartArea: false,
            },
            ticks: {
              color: getStyle('--cui-body-color'),
            },
          },
          y: {
            beginAtZero: true,
            border: {
              color: getStyle('--cui-border-color-translucent'),
            },
            grid: {
              color: getStyle('--cui-border-color-translucent'),
            },
            max: max,
            ticks: {
              color: getStyle('--cui-body-color'),
              maxTicksLimit: 5,
              stepSize: Math.ceil(max || 1000 / 5),
            },
          },
        },
        elements: {
          line: {
            tension: 0.4,
          },
          point: {
            radius: 3,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3,
          },
        },
      }}
    />
  );
}

