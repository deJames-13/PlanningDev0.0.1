import { CCol, CRow } from '@coreui/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import BudgetChart from '../budget';
import { sectors } from './data.old';
import SectorObjectives from './sector-objectives';

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
            <CRow>
                <CCol
                    style={{
                        height: "100vh",
                        overflow: "auto",
                    }}
                >
                    <SectorObjectives name={sector?.id} />
                </CCol>
                <CCol>
                    <h4>Actions</h4>
                    <br />
                </CCol>
            </CRow>

        </>
    )
}
