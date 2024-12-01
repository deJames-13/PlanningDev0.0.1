import { cilCheck, cilFlagAlt } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CCard, CCardBody, CCardHeader, CCol, CProgress, CRow } from '@coreui/react'
import React from 'react'
import QualityObjectives from './quality-objectives'

export default function ObjectivesOverview() {

  const progressGroupExample2 = [
    { title: 'Total Acommplished', icon: cilCheck, value: 53 },
    { title: 'Total Target', icon: cilFlagAlt, value: 70 },
  ]
  return (
    <>
     <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Quality  Objectives</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <QualityObjectives />
                </CCol>

                <CCol xs={12} md={6} xl={6}>

                  {progressGroupExample2.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">{item.value}%</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="warning" value={item.value} />
                      </div>
                    </div>
                  ))}

                  <div className="mb-5"></div>

                </CCol>
              </CRow>

              <br />

              {/* <TableExample /> */}
                
            </CCardBody>
          </CCard>
        </CCol>
      </CRow> 
    </>
  )
}
