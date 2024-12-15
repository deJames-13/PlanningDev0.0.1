import { useEffect, useState } from 'react'

import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import BarChart from 'src/components/charts/bar'
import ChartSkeleton from 'src/components/skeletons/chart'

import { BAR_DATA } from './data'



const _indicators = [
  {
    title: "Outcome Indicator 1: Percentage of first-time licensure exam takers that pass the licensure exam.",
  }
]
const _chartBy = ['year', 'quarter']

export default function ParticularsCard(
  {
    title = '',
    reversed = false,
    data = BAR_DATA[0],
  }
) {

  const [currentIndicator, setCurrentIndicator] = useState(_indicators[0])
  const [indicators, setIndicators] = useState(_indicators)
  const [chartData, setChartData] = useState(null);


  const [chartBy, setChartBy] = useState(_chartBy[0])
  const [years, setYears] = useState([])
  const [currentYear, setCurrentYear] = useState(null)

  const handleIndicatorChange = (indicator) => {
    setCurrentIndicator(indicator)
  }
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
    if (data?.indicators?.length > 0) {
      setIndicators(data.indicators)
      setCurrentIndicator(data.indicators[0])
    }
  }, [data])


  useEffect(() => {
    if (currentIndicator?.values) {
      const reversedValues = [...currentIndicator.values].reverse()
      setYears(reversedValues.map(({ year }) => year))
      if (currentIndicator.values[0])
        setCurrentYear(currentIndicator.values[0].year)
      return
    }
  }, [currentIndicator])

  useEffect(() => {
    if (currentIndicator?.values) {
      makeChart(currentIndicator.values, chartBy)
    }
  }, [currentYear, chartBy])


  useEffect(() => {
    if (currentIndicator?.values) {
      setChartData({
        labels: currentIndicator.values.map(value => value.year),
        datasets: [
          {
            label: 'Target',
            backgroundColor: '#f87979',
            data: currentIndicator.values.map(value => (parseFloat(value.target) || 0).toFixed(2)),
          },
          {
            label: 'Accomplishment',
            backgroundColor: '#4dbd74',
            data: currentIndicator.values.map(value => (parseFloat(value.accomplishment) || 0).toFixed(2)),
          },
        ],
      })
    }
  }, [currentIndicator])

  return (
    <div className={`row col-lg-12 ${reversed ? 'flex-row-reverse' : ''}`}>
      <div className='col-lg-8'>
        <div className="blog-details-content">
          {/* Title */}
          <h3 className={"title"}
            style={{
              textAlign: reversed ? 'right' : 'left',
              width: '100%',
            }}
          >
            {title || 'Title'}
          </h3>
          {chartData && <BarChart
            data={chartData}
            labels="years"
          /> || <ChartSkeleton />}

          <p className='fw-light fs-6 italic'>
            {data?.description}
          </p>

        </div>
      </div>
      <div className='col-lg-4 pb-10'>
        <div className="blog-details-content">
          {/* Dropdown */}
          <div className={`d-flex gap-2 ${reversed ? 'flex-row-reverse' : ''} justify-content-end `}>
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

            <CDropdown>
              <CDropdownToggle color="primary">
                {currentIndicator?.title && currentIndicator?.title.split(':')[0].trim()}
              </CDropdownToggle>
              <CDropdownMenu>
                {indicators.map((indicator, index) => (
                  <CDropdownItem key={index}
                    onClick={() => handleIndicatorChange(indicator)}
                  >
                    {indicator?.title && indicator?.title.split(':')[0].trim()}
                  </CDropdownItem>
                ))}
              </CDropdownMenu>
            </CDropdown>
          </div>

          <hr />

          {/* Title */}
          <h4>
            {currentIndicator?.title}
          </h4>


          {/* Interpretations */}
          {/* accomplishments shows a percentage of blank from target goal of blah blah */}
          {currentIndicator?.values && (() => {
            const totalTarget = currentIndicator.values.reduce((sum, value) => sum + (parseFloat(value.target) || 0), 0);
            const totalAccomplishment = currentIndicator.values.reduce((sum, value) => sum + (parseFloat(value.accomplishment) || 0), 0);
            const percentage = ((totalAccomplishment / totalTarget) * 100).toFixed(2);
            return (
              <>
                <hr />
                <p>
                  {currentIndicator?.description || <>
                    Accomplishments show a percentage of <strong>{percentage}%</strong> from the target goal of <strong>
                      {totalTarget.toFixed(2)}
                    </strong>.
                  </>}
                </p>
              </>
            );
          })()}

          <br />

        </div>
      </div>
      <hr />
    </div>

  )
}
