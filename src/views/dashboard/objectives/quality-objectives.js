import { cilCheck } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CProgress, CProgressStacked } from '@coreui/react';
import React from 'react';

const defaultProps = [
  {
    id: 0, label: 'Absorb', quarters: [
      {
        target: 10,
        accomplishment: 8,
      },
      {
        target: 10,
        accomplishment: 12,
      },
      {
        target: 10,
        accomplishment: 3,
      },
      {
        target: 10,
        accomplishment: 2,
      },
    ], goal: {
      target: 40,
      accomplishment: 25,
      progress: 62.5
    }
  },
];

export default function QualityObjectives ({
  data = defaultProps,
}){
return (
  <>
    {data.map((item, index) => (
      <div className="progress-group mb-4" key={`${index}-${item.index}`}>
          <div className="progress-group-bars">
            <h6>
              {item.label}
            </h6>

            {item.quarters.map((quarter, index) => {
              let color = 'success';
              let percent = (quarter.accomplishment / quarter.target) * 100;
              if (percent < 50) {
                color = 'danger';
              } else if (percent < 100) {
                color = 'warning';
              }
              return (
                <CProgress
                  key={`${index}-${quarter.index}`}
                  value={percent}
                  color={color}
                  className="mb-1"
                >
                  <span 
                    className="text-body-secondary small" 
                    style={{
                      justifyContent: 'end',
                      itemAlign: 'center',
                      display: 'flex',
                      gap: '0.5rem',
                    }}
                  >
                    <strong>
                      {quarter.accomplishment} / {quarter.target}
                    </strong>
                    {
                      percent >= 100 && (
                        <CIcon icon={cilCheck}/>
                      )
                    }
                  </span>
                </CProgress>
              );

            })}
            <div className="d-flex justify-content-between">
              <div className="text-body-secondary small">
              Accomplishment - {item.goal.accomplishment} / {item.goal.target}
              </div>
            </div>
            <CProgressStacked>
              <CProgress
                value={item.goal.accomplishment}
                color="success"
              />
              <CProgress
                value={item.goal.target - item.goal.accomplishment}
                color="danger"
              />
            </CProgressStacked>
          </div>
      </div>
  ))} 
  </>
)
}


