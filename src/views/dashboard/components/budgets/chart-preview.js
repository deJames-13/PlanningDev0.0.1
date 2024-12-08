import { useEffect, useState } from 'react'
import LineChart from 'src/components/charts/line'
import ChartSkeleton from 'src/components/skeletons/chart'

export default function ChartPreview({ values }) {
    const [chartData, setChartData] = useState(null)

    useEffect(() => {
        setChartData({
            labels: values?.map(({ year }) => year),
            datasets: [
                {
                    label: 'Target',
                    data: values?.map(({ target }) => target),
                },
                {
                    label: 'Accomplishment',
                    data: values?.map(({ accomplishment }) => accomplishment),
                },
                {
                    label: 'Rate',
                    data: values?.map(({ variance }) => variance),
                }
            ],
        })
    }, [values])
    return (
        <>
            {
                chartData ?
                    <LineChart chartData={chartData} />
                    : <ChartSkeleton />
            }
        </>
    )
}
