import React from 'react'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import BudgetChart from './budget/budget'
import ObjectivesOverview from './objectives/index'
// import MainChart from './MainChart'

const Dashboard = () => {
  




  return (
    <>
      {/* CARD WIDGETS  */}
      <WidgetsDropdown className="mb-4" />

      {/* TRAFFIC/LINE CHART */}
      <BudgetChart />
    

      <ObjectivesOverview />
      
    </>
  )
}

export default Dashboard
