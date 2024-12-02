import React from 'react';
import SectorObjectives from './sector-objectives';


export default function MainPage({ sector }) {

    return (
        <>
            <div className="container">


                {/* Title */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold">Sectoral Overview: {sector}</h1>
                </div>
                <div className="divider"></div>
                <SectorObjectives sector={sector} />


            </div>
        </>
    )
}


