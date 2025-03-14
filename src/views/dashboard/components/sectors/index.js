import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetSectsMutation } from 'src/states/api/charts.js'
import { useSectorReportMutation } from "src/states/api/reports";

import BudgetChart from '../budgets';
import SectorObjectives from './sector-objectives';
import SplashScreen from 'src/components/loader/splash-screen';
import logo from 'src/assets/images/logo.png';
import PDFDownload from 'src/components/pdf';
import ExportResource from '../ExportResource';


export default function Sector() {
    const nav = useNavigate();
    const { sector } = useParams();
    const [current, setCurrent] = useState({});
    const [getSects, { isLoading }] = useGetSectsMutation()

    useEffect(() => {
        getSects().unwrap().then((res) => {
            if (!res) return nav('/404');
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
            <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </SplashScreen>
        : (
            <>
                <div
                    className="d-flex gap-2 justify-content-end"
                >
                    {/* TODO */}
                    <PDFDownload
                        action={useSectorReportMutation}
                        params={current?.id}
                        title="Download Report"
                    />

                    {/* EXPORT */}
                    <ExportResource
                        id={current?.id}
                        resource="sectors"
                    />

                </div>


                <h3>
                    {current?.full_name || current?.name}
                </h3>


                <hr />
                <BudgetChart sector={sector} isId={false} />
                <hr />
                <SectorObjectives name={sector} isId={false} />
            </>
        )
}
