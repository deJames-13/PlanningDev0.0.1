import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import {
  CChartBar,
} from '@coreui/react-chartjs';
import { useRef } from 'react';

const _chartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Dataset 1',
      backgroundColor: '#f87979',
      data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
    },
  ],
}


export default function BarChart({
  data = _chartData,
  labels = "months",
  header = null,
}) {
  if (!data || !data.labels || !data.datasets) {
    console.error('Invalid chart data:', data);
    return null;
  }
  const chartRef = useRef(null);

  return (
    <>
      <CCard className="mb-4">
        {header &&
          <CCardHeader>
            {header}
          </CCardHeader>
        }
        <CCardBody>
          <CChartBar
            ref={chartRef}
            data={data}
            labels={labels}
          />
        </CCardBody>
      </CCard>
    </>
  )
}
