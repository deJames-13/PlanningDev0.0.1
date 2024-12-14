import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BudgetChart from '../budgets';
import SectorObjectives from './sector-objectives';
import { useGetSectsMutation } from 'src/states/api/charts.js'

export default function Sector() {
    const { sector } = useParams();
    const [current, setCurrent] = useState({});
    const [getSects, { isLoading }] = useGetSectsMutation()

    useEffect(() => {
        getSects().unwrap().then((res) => {
            setCurrent(res.find((item) => item.slug === sector))
        })
    }, [])


    return (
        <>
            <h3>
                {current?.full_name || current?.name}
            </h3>
            <hr />
            <BudgetChart sector={sector} />
            <hr />
            <SectorObjectives name={sector} />
        </>
    )
}
