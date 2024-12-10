import { useEffect, useState } from 'react'
import RadialBarChart from 'src/components/charts/radial-bar'
import ChartSkeleton from 'src/components/skeletons/chart'
const colors = {
    0: '#FF8042',
    1: '#FFBB28',
    2: '#0088FE',
    3: '#00C49F',
}
export default function ChartPreview({ values = [] }) {

    return values?.length > 0 ? <div style={{
        height: 300,
    }}>
        <RadialBarChart
            data={values.map((value, index) => ({
                name: `Q${index + 1}`,
                percentage: parseFloat((parseFloat(value?.accomplishment || 0) / parseFloat(value?.target || 1) * 100).toFixed(2) || 0),
                fill: colors[index],
            }))}
            dataKey='percentage'
            labelFormatter={(value) => `Quarter ${value + 1}`}
        />
    </div> : <ChartSkeleton />

}
