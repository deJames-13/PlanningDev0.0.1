import CIcon from '@coreui/icons-react'

import { cilCheck, cilFlagAlt } from '@coreui/icons'
import { CCard, CCardBody, CCardHeader, CProgress } from '@coreui/react'

import React from 'react'
import QualityObjectives from './quality-objectives'

const objectivesExample = [
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
const progressGroupExample = [
  { title: 'Total Acommplished', icon: cilCheck, value: 53 },
  { title: 'Total Target', icon: cilFlagAlt, value: 70 },
]
function ProgrssSummary({ summary }) {
  return (
    <>
      {
        summary.map((item, index) => (
          <div className="progress-group mb-4" key={index}>
            <div className="progress-group-header">
              <CIcon className="me-2" icon={item.icon} size="lg" />
              <span>{item.title}</span>
              <span className="ms-auto fw-semibold">{item.value}</span>
            </div>
            <div className="progress-group-bars">
              {item.progress && (
                <CProgress thin color="warning" value={item.value} />
              )}
            </div>
          </div>
        ))
      }
    </>
  )
}

export default function ObjectivesOverview({
  data: {
    objectives = objectivesExample,
    progressGroup = progressGroupExample,
    last_updated = (new Date()).toLocaleString(),
  } = {},
  loading = false,
}) {

  return (
    <CCard className="mb-4">
      <CCardHeader className='d-flex justify-content-between items-align-center'>
        <div>
          <h4>Objectives Overview</h4>
          {
            last_updated && (
              <span className="small text-muted">Last Updated: {last_updated}</span>
            )
          }
        </div>
        {loading && (
          <div className="spinner-border text-primary float-end" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )
        }
      </CCardHeader>
      <CCardBody>

        <ProgrssSummary summary={progressGroup} />
        <QualityObjectives objectives={objectives} />

      </CCardBody>
    </CCard>
  )
}
