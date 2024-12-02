import React from 'react';
import { DatedBarChart } from './bar-dated';
import { BarInterpretation } from './bar-interpretation';



export default function Particular({
    data, label, title, color, className
}) {
    return (
        <div className={"flex gap-4 " + className}>
            <DatedBarChart
                title={title}
                data={data}
            />
            <BarInterpretation />
        </div>
    )
}
