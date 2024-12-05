import { cilCheck } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CProgress, CProgressStacked } from '@coreui/react';
import React from 'react';

const defaultProps = [
  {
    id: 0, label: 'Absorb', quarterlies: [
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
    ],
    total: {
      target: 40,
      accomplishment: 25,
      progress: 62.5
    }
  },
];

export function ObjectiveCard({ item, index }) {
  return (
    <div className="progress-group mb-4"
      key={`${index}-${item.index}`}
    >
      <div className="progress-group-bars">
        <div className="d-flex items-align-center gap-2">
          <h6 className='text-body-secondary'>
            {index + 1}.
          </h6>
          <h6>
            {item.name}
          </h6>
        </div>

        {item.quarterlies.map((quarter, index) => {
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
                    <CIcon icon={cilCheck} />
                  )
                }
              </span>
            </CProgress>
          );

        })}
        <div className="d-flex justify-content-between">
          <div className="text-body-secondary small">
            Accomplishment - {item.total.accomplishment} / {item.total.target}
          </div>
        </div>
        <CProgressStacked>
          {item.quarterlies.map((quarter, index) => {
            let color = 'success';
            if (item.total.accomplishment < item.total.target) {
              color = 'warning';
            }
            if (item.total.accomplishment < item.total.target / 2) {
              color = 'danger';
            }
            let percent = (quarter.accomplishment / item.total.target) * 100;

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
                    {/* {quarter.accomplishment} | */}
                  </strong>
                  {
                    percent >= 100 && (
                      <CIcon icon={cilCheck} />
                    )
                  }
                </span>
              </CProgress>
            );
          })}
          &nbsp;{parseFloat((item.total.accomplishment / item.total.target) * 100).toFixed(2)}%
        </CProgressStacked>
      </div>
    </div>)
}


export default function QualityObjectives({
  objectives = defaultProps,
}) {
  return (
    <>
      {objectives.map((item, index) => (
        <ObjectiveCard item={item} index={index} />
      ))}
    </>
  )
}


