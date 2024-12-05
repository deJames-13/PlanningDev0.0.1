import React from 'react'

import WidgetsDropdown from '../widgets/WidgetsDropdown'
import BudgetChart from './budget'

// import WidgetsBrand from '../widgets/WidgetsBrand'

const Dashboard = () => {
  return (
    <>
      {/* CARD WIDGETS  */}
      <WidgetsDropdown className="mb-4" />

      {/* TRAFFIC/LINE CHART */}
      <BudgetChart />

    </>
  )
}

export default Dashboard
