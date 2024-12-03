import CIcon from '@coreui/icons-react'

import { cilCheck, cilFlagAlt } from '@coreui/icons'
import { CCard, CCardBody, CCardHeader, CCol, CProgress, CRow } from '@coreui/react'

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
export default function ObjectivesOverview({
  data: {
    objectives = objectivesExample,
    progressGroup = progressGroupExample,
  } = {},
  loading = false,
}) {

  return (
    <>
     <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader className='d-flex justify-content-between items-align-center'>
              {/* with spinner */}
              <h4>Objectives Overview</h4>
              {loading && (
                  <div className="spinner-border text-primary float-end" role="status">
                      <span className="visually-hidden">Loading...</span>
                  </div>
                ) 
              }
            </CCardHeader>
            <CCardBody>
              <CRow
              className='flex-column-reverse flex-lg-row'
              >
                <CCol xs={12} md={6} xl={6}>
                  <QualityObjectives objectives={objectives} />
                </CCol>

                <CCol xs={12} md={6} xl={6}>

                  {progressGroup.map((item, index) => (
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
                  ))}

                  <div className="mb-5"></div>

                </CCol>

              </CRow>

              <br />

                
            </CCardBody>
          </CCard>
        </CCol>
      </CRow> 
    </>
  )
}
