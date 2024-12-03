import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import React from 'react'

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


export default function ParticularsCard(
  {
    title = 'Higher Education',
    chart,
    interpretations = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum itaque quam corrupti accusamus saepe eum quia rem ullam, aliquam perspiciatis velit beatae labore iure modi suscipit, recusandae, ad enim? Labore!',
    reversed = false
  }
) {
  return (
    <div className={`row col-lg-12 ${reversed ? 'flex-row-reverse' : ''}`}>
      <div className='col-lg-8'>
        <div className="blog-details-content">
          {/* Title */}
          <h3 className="title">
            {title}
          </h3>

          {/* Chart  */}
          {chart || chartSkeleton}
        </div>
      </div>
      <div className='col-lg-4 pb-10'>
        <div className="blog-details-content">
          {/* Dropdown */}
          <div className={`d-flex ${reversed ? 'justify-content-start' : 'justify-content-end'}`}>
            <CDropdown>
              <CDropdownToggle color="primary">
                Indicators
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>
                  Outcome Indicator 1
                </CDropdownItem>
                <CDropdownItem>
                  Outcome Indicator 2
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </div>

          <hr />

          {/* Title */}

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
