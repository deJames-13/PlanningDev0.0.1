import React from 'react'

import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import BarChart from 'src/components/charts/bar'
import { BAR_DATA } from './data'

const chartSkeleton = (
  <div className="d-flex justify-content-center align-items-center"
    style={{
      height: '300px',
      width: '100%',
      backgroundColor: 'lightgray'

    }}
  >
    <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
)

const _indicators = [
  {
    name: "Outcome Indicator 1: Percentage of first-time licensure exam takers that pass the licensure exam.",
  }
]

export default function ParticularsCard(
  {
    title = 'Higher Education',
    interpretations = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum itaque quam corrupti accusamus saepe eum quia rem ullam, aliquam perspiciatis velit beatae labore iure modi suscipit, recusandae, ad enim? Labore!',
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
    if (currentIndicator?.values){
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
            backgroundColor: '#f87979',
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
          <h3 className="title">
            {title}
          </h3>

          {chartData && <BarChart
            data={chartData}
            labels="years"
          /> || chartSkeleton}
        </div>
      </div>
      <div className='col-lg-4 pb-10'>
        <div className="blog-details-content">
          {/* Dropdown */}
          <div className={`d-flex ${reversed ? 'justify-content-start' : 'justify-content-end'}`}>
            <CDropdown>
              <CDropdownToggle color="primary">
                {currentIndicator?.name && currentIndicator?.name.split(':')[0].trim()}
              </CDropdownToggle>
              <CDropdownMenu>
                {indicators.map((indicator, index) => (
                  <CDropdownItem key={index} 
                  onClick={() => handleIndicatorChange(indicator)}
                  >
                    {indicator?.name.split(':')[0].trim()}
                  </CDropdownItem>
                ))}
              </CDropdownMenu>
            </CDropdown>
          </div>

          <hr />

          {/* Title */}
          <h4>
            {currentIndicator?.name}
          </h4>


          {/* Interpretations */}
          <p>
            {interpretations}
          </p>

        </div>
      </div>
      <hr />
    </div>

  )
}
