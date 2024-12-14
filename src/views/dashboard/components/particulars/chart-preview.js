import BarChart from 'src/components/charts/bar'
import NoResult from 'src/components/skeletons/no-result'

import { useEffect, useState } from 'react'

export default function ChartPreview({ values }) {
    const [chartData, setChartData] = useState(null)

    useEffect(() => {
        if (values) {
            setChartData({
                labels: values.map(value => value.year),
                datasets: [
                    {
                        label: 'Target',
                        backgroundColor: '#f87979',
                        data: values.map(value => value.target)
                    },
                    {
                        label: 'Accomplishment',
                        backgroundColor: '#79f8b4',
                        data: values.map(value => value.accomplishment)
                    }
                ]
            })
        }
    }, [values])

    return (
        <>

            {
                chartData ?
                    <BarChart data={chartData} labels="years" />
                    : <NoResult />
            }
        </>
    )
}
