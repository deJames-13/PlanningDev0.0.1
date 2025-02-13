import BarChart from 'src/components/charts/bar'
import NoResult from 'src/components/skeletons/no-result'

import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import { useEffect, useState } from 'react'


const _chartBy = ['year', 'quarter']
export default function ChartPreview({ data }) {
    const [chartData, setChartData] = useState(null)
    const [particulars, setParticulars] = useState(data?.particulars ?? [])
    const [current, setCurrent] = useState(null)

    const [chartBy, setChartBy] = useState(_chartBy[0])
    const [years, setYears] = useState([])
    const [currentYear, setCurrentYear] = useState(null)

    const makeChart = (values, chartBy) => {

        if (chartBy === 'year') {
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

        else if (chartBy === 'quarter') {
            const currentYearValues = values.find(({ year }) => year === currentYear)?.quarters
            if (!currentYearValues) {
                setChartData(null)
                return
            }

            setChartData({
                labels: currentYearValues.map(({ quarter }) => `Q${quarter}`),
                datasets: [
                    {
                        label: 'Target',
                        backgroundColor: '#f87979',
                        data: currentYearValues.map(({ target }) => target)
                    },
                    {
                        label: 'Accomplishment',
                        backgroundColor: '#79f8b4',
                        data: currentYearValues.map(({ accomplishment }) => accomplishment)
                    }
                ]
            })
        }

    }

    useEffect(() => {
        if (data?.particulars?.length > 0) {
            setParticulars(data.particulars)
            setCurrent(data.particulars[0])
        }
    }, [data])

    useEffect(() => {
        if (current?.values) {
            const reversedValues = [...current.values].reverse()
            const years = reversedValues.map(({ year }) => year)
            setYears([...new Set(years)])

            if (current.values[0])
                setCurrentYear(current.values[0].year)
            return
        }
    }, [current])

    useEffect(() => {
        if (current?.values) {
            makeChart(current.values, chartBy)
        }
    }, [currentYear, chartBy])


    return (
        <>
            {/* Dropdown */}
            <div className={`d-flex justify-content-end py-3 gap-3`}>

                {
                    chartBy === 'quarter' &&
                    <CDropdown>
                        <CDropdownToggle color="primary" className='text-capitalize'>
                            {currentYear || 'Select Year'}
                        </CDropdownToggle>
                        <CDropdownMenu>
                            {
                                years.map((year, index) => (
                                    <CDropdownItem key={index} onClick={() => setCurrentYear(year)} className='text-capitalize'>
                                        {year}
                                    </CDropdownItem>
                                ))
                            }
                        </CDropdownMenu>

                    </CDropdown>
                }
                <CDropdown>
                    <CDropdownToggle color="primary" className='text-capitalize'>
                        By {chartBy}
                    </CDropdownToggle>
                    <CDropdownMenu>
                        {
                            _chartBy.map((item, index) => (
                                <CDropdownItem key={index} onClick={() => setChartBy(item)} className='text-capitalize'>
                                    {item}
                                </CDropdownItem>
                            ))
                        }
                    </CDropdownMenu>
                </CDropdown>
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
                                            {particular?.title && particular?.title?.split(':')[0].trim()}
                                        </CDropdownItem>
                                    ))}
                                </CDropdownMenu>
                            </CDropdown>
                        </div>
                    )
                }
            </div>


            {
                chartData ?
                    <BarChart data={chartData} labels="years" />
                    : <NoResult />
            }
        </>
    )
}
