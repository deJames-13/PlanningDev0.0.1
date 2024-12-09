import React from 'react'
import { Legend, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip } from 'recharts'



export default function RadialBarComponent({ data, dataKey = '', labelFormatter }) {
    return (
        <>
            <ResponsiveContainer width="100%" height={500}>
                <RadialBarChart
                    innerRadius="10%"
                    outerRadius="80%"
                    data={data}
                    startAngle={180}
                    endAngle={0}
                >
                    <RadialBar
                        minAngle={15}
                        label={{ fill: '#666', position: 'insideStart' }}
                        background clockWise={true}
                        dataKey={dataKey}
                    />
                    <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align="right" />
                    <Tooltip
                        labelFormatter={labelFormatter}
                    />
                </RadialBarChart>
            </ResponsiveContainer>
            <p>
                <i className='d-sm-none d-block text-secondary fw-light' style={{
                    fontSize: '0.8rem',
                    textAlign: 'center',
                }}>
                    Can't view chart properly on small screen. Please view on larger screen.
                </i>
            </p>
        </>
    )
}
