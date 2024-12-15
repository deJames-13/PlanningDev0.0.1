import React from 'react'

import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import BarChart from 'src/components/charts/bar'
import ChartSkeleton from 'src/components/skeletons/chart'

import { BAR_DATA } from './data'



const _indicators = [
  {
    title: "Outcome Indicator 1: Percentage of first-time licensure exam takers that pass the licensure exam.",
  }
]

export default function ParticularsCard(
  {
    title = 'Higher Education',
    interpretations = '',
    reversed = false,
    data = BAR_DATA[0],
  }
) {

  const [currentIndicator, setCurrentIndicator] = React.useState(_indicators[0])
  const [indicators, setIndicators] = React.useState(_indicators)
  const [chartData, setChartData] = React.useState(null);


  const handleIndicatorChange = (indicator) => {
    setCurrentIndicator(indicator)
  }

  React.useEffect(() => {
    if (data?.indicators?.length > 0) {
      setIndicators(data.indicators)
      setCurrentIndicator(data.indicators[0])
    }
  }, [data])

  React.useEffect(() => {
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
            {title}
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
          <div className={`d-flex ${reversed ? 'justify-content-start' : 'justify-content-end'}`}>
            <CDropdown>
              <CDropdownToggle color="primary">
                {currentIndicator?.title && currentIndicator?.title.split(':')[0].trim()}
              </CDropdownToggle>
              <CDropdownMenu>
                {indicators.map((indicator, index) => (
                  <CDropdownItem key={index}
                    onClick={() => handleIndicatorChange(indicator)}
                  >
                    {indicator?.title.split(':')[0].trim()}
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
