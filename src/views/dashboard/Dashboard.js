import React, { useEffect } from 'react'

import WidgetsDropdown from '../widgets/WidgetsDropdown'
import BudgetChart from './components/budgets'
import SectorObjectives from './components/sectors/sector-objectives';
import SmartSelect from 'src/components/form/smart-select';
import useResourceOptions from './hooks/useResourceOptions';





const Dashboard = () => {
  const [isNoBudgetData, setNoIsBudgetData] = React.useState(true);
  const [isNoObjData, setNoObjData] = React.useState(true);
  const [sector, setSector] = React.useState('none');
  const { options, loading } = useResourceOptions({ resourceName: 'sectors' })
  useEffect(() => {

  }, [sector])

  return (
    <>
      <h1>Planning Dashboard</h1>
      <hr />

      {/* <WidgetsDropdown className="mb-4" /> */}

      {/* TRAFFIC/LINE CHART */}
      <div>
        {/* <SmartSelect options={options} onSelect={setSector} /> */}
      </div>

      <div style={{
        display: 'flex',
        flexDirection: isNoBudgetData && !isNoObjData ? 'column-reverse' : 'column',
      }}>
        <hr />
        <BudgetChart
          sector={sector}
          setNoData={setNoIsBudgetData}
        />
        <hr />
        <SectorObjectives
          name={sector}
          setNoData={setNoObjData}
        />
        <hr />
      </div>
    </>
  )
}

export default Dashboard