import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BudgetChart from '../budgets';
import SectorObjectives from './sector-objectives';
import { useGetSectsMutation } from 'src/states/api/charts.js'
import SplashScreen from 'src/components/loader/splash-screen';
import logo from 'src/assets/images/logo.png';

export default function Sector() {
    const nav = useNavigate();
    const { sector } = useParams();
    const [current, setCurrent] = useState({});
    const [getSects, { isLoading }] = useGetSectsMutation()

    useEffect(() => {
        getSects().unwrap().then((res) => {
            let result = res.find((item) => item.slug === sector)
            if (!result) {
                nav('/404');
            }
            setCurrent(result)
        })
    }, [])


    return isLoading ?
        <SplashScreen>
            <img src={logo} alt="" width="10%" className="blinking-logo" />
            <div class="spinner-grow text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </SplashScreen>
        : (
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
