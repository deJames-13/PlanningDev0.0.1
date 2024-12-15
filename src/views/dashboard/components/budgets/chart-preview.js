import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import { useEffect, useState } from 'react'
import LineChart from 'src/components/charts/line'
import NoResult from 'src/components/skeletons/no-result'

const _chartBy = ['year', 'quarter']
export default function ChartPreview({ values }) {
    const [chartData, setChartData] = useState(null)
    const [chartBy, setChartBy] = useState(_chartBy[0])
    const [years, setYears] = useState([])
    const [currentYear, setCurrentYear] = useState(null)


    const makeChartData = (values, chartBy) => {
        if (chartBy === 'year') {
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
                ],
            })
        }
        if (chartBy === 'quarter') {
            const currentYearValues = values.find(({ year }) => year === currentYear)?.quarters
            if (!currentYearValues) {
                setChartData(null)
                return
            }

            setChartData({
                labels: currentYearValues?.map(({ quarter }) => `Q${quarter}`),
                datasets: [
                    {
                        label: 'Target',
                        data: currentYearValues?.map(({ allotment }) => allotment),
                    },
                    {
                        label: 'Accomplishment',
                        data: currentYearValues?.map(({ obligated }) => obligated),
                    },
                ],
            })
        }
    }

    useEffect(() => {
        if (values) {
            const reversedValues = [...values].reverse();
            setYears(reversedValues?.map(({ year }) => year))
            if (reversedValues[0])
                setCurrentYear(values[0]?.year)
            return
        }
        setChartData(null)
    }, [values])

    useEffect(() => {
        makeChartData(values, chartBy)
    }, [chartBy, currentYear])

    return (
        <>
            {
                (
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
                    </div>
                )
            }

            {
                chartData ?
                    <LineChart chartData={chartData} />
                    : <NoResult />
            }
        </>
    )
}
