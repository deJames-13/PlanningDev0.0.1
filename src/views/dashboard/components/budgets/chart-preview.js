import { useEffect, useState } from 'react'
import LineChart from 'src/components/charts/line'
import NoResult from 'src/components/skeletons/no-result'

export default function ChartPreview({ values }) {
    const [chartData, setChartData] = useState(null)

    useEffect(() => {
        if (values) {
            setChartData({
                labels: values?.map(({ year }) => year),
                datasets: [
                    {
                        label: 'Target',
                        data: values?.map(({ allotment }) => allotment),
                    },
                    {
                        label: 'Accomplishment',
                        data: values?.map(({ obligated }) => obligated),
                    },
                    {
                        label: 'Rate',
                        data: values?.map(({ utilization_rate }) => utilization_rate),
                    }
                ],
            })
            return
        }
        setChartData(null)
    }, [values])
    return (
        <>
            {
                chartData ?
                    <LineChart chartData={chartData} />
                    : <NoResult />
            }
        </>
    )
}
