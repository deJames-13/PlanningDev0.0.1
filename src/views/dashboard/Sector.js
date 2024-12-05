import React from 'react';
import { useParams } from 'react-router-dom';
import BudgetChart from './budget/budget';
import { sectors } from './sectors/data.old';
import SectorObjectives from './sectors/sector-objectives';

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
      <SectorObjectives name={sector?.id} />

    </>
  )
}
