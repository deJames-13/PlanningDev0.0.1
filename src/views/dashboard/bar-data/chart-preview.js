import BarChart from 'src/components/charts/bar'
import ChartSkeleton from 'src/components/skeletons/chart'

import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import { useEffect, useState } from 'react'


export default function ChartPreview({ data }) {
    const [chartData, setChartData] = useState(null)
    const [particulars, setParticulars] = useState(data?.particulars ?? [])
    const [current, setCurrent] = useState(null)

    useEffect(() => {
        if (data?.particulars?.length > 0) {
            setParticulars(data.particulars)
            setCurrent(data.particulars[0])
        }

    }, [data])

    useEffect(() => {
        if (current?.values) {
            setChartData({
                labels: current.values.map(value => value.year),
                datasets: [
                    {
                        label: 'Target',
                        backgroundColor: '#f87979',
                        data: current.values.map(value => value.target)
                    },
                    {
                        label: 'Accomplishment',
                        backgroundColor: '#79f8b4',
                        data: current.values.map(value => value.accomplishment)
                    }
                ]
            })
        }
    }, [current])

    return (
        <>
            {/* Dropdown */}
            {
                particulars?.length > 0 && (
                    <div className={`d-flex 'justify-content-end`}>
                        <CDropdown>
                            <CDropdownToggle color="primary">
                                {current?.title && current?.title.split(':')[0].trim()}
                            </CDropdownToggle>
                            <CDropdownMenu>
                                {particulars.map((particular, index) => (
                                    <CDropdownItem key={index}
                                        onClick={() => setCurrent(particular)}
                                    >
                                        {particular?.title.split(':')[0].trim()}
                                    </CDropdownItem>
                                ))}
                            </CDropdownMenu>
                        </CDropdown>
                    </div>
                )
            }


            {
                chartData ?
                    <BarChart data={chartData} labels="years" />
                    : <ChartSkeleton />
            }
        </>
    )
}
