import React from 'react';
import { useParams } from 'react-router-dom';
import BudgetChart from './budget/budget';
import ObjectivesOverview from './objectives/index';
import { sectors } from './sectors';

export default function Sector() {
  let sector = useParams().sector
  sector = sectors.filter((s) => s.id == sector)[0]

  return (
    <>
    <h3>
      {sector?.name}
    </h3>
    <hr />
      <BudgetChart sector={sector?.id} />
      <hr />
      <ObjectivesOverview />

    </>
  )
}
