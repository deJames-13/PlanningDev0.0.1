import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BudgetChart from '../budgets';
import SectorObjectives from './sector-objectives';

export default function Sector() {
    const { sector } = useParams();

    return (
        <>
            <h3>
                Overview
            </h3>
            <hr />
            <BudgetChart sector={sector} />
            <hr />
            <SectorObjectives name={sector} />
        </>
    )
}
