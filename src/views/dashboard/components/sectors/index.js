import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BudgetChart from '../budgets';
import SectorObjectives from './sector-objectives';
import useResource from '../../hooks/useResource';

export default function Sector() {
    const { sector } = useParams();
    const {
        actions: { fetchData },
        states: { current }
    } = useResource('sectors')

    useEffect(() => {
        fetchData(sector, 'is_slug=true')
    }, [sector])
    return (
        <>
            <h3>
                {current?.data?.full_name || current?.data?.name}
            </h3>
            <hr />
            <BudgetChart sector={sector} />
            <hr />
            <SectorObjectives name={sector} />
        </>
    )
}
