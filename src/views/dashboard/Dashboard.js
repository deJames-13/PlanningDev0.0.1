import React from 'react'

import WidgetsDropdown from '../widgets/WidgetsDropdown'
import BudgetChart from './budget'

// import WidgetsBrand from '../widgets/WidgetsBrand'
// import ObjectivesOverview from './objectives/index'

const Dashboard = () => {
  return (
    <>
      {/* CARD WIDGETS  */}
      <WidgetsDropdown className="mb-4" />

      {/* TRAFFIC/LINE CHART */}
      <BudgetChart />


      {/* <ObjectivesOverview /> */}

    </>
  )
}

export default Dashboard
