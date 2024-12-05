import { cilArrowBottom, cilArrowTop } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import { useEffect, useState } from 'react';
import useObjectiveCharter from '../hooks/useObjectiveCharter';
import QualityObjectives, { ProgressSummary } from '../objectives/index';

export default function ObjectivesOverview({ name }) {
  const { data, setData, isLoading, fetchtData } = useObjectiveCharter({ name });
  const [reversed, setReversed] = useState(false);

  const handleReverse = () => {
    setReversed(!reversed);
  };


  useEffect(() => {
    fetchtData(name);
  }, [name]);
  return (
    <CCard className="mb-4">
      <CCardHeader className='d-flex justify-content-between items-align-center'>
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
          }}>
            <h4>Objectives Overview</h4>
            <button
              className="btn btn-sm btn-ghost-primary"
              onClick={handleReverse}>
              <CIcon icon={reversed ? cilArrowTop : cilArrowBottom} />
            </button>
          </div>
          {
            data?.lastUpdate && (
              <span className="small text-muted">Last Updated: {data.lastUpdate}</span>
            )
          }
        </div>
        {isLoading && (
          <div className="spinner-border text-primary float-end" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )
        }
      </CCardHeader>
      <CCardBody>
        <CRow>
          <CCol
            style={{
              height: '100vh',
              overflowY: 'auto',
            }}

            className={`d-flex flex-column ${reversed ? 'flex-column-reverse' : ''}`}
          >
            {data?.objectives?.length > 0 && <QualityObjectives objectives={data.objectives} />}
          </CCol>
          <CCol>
            {data?.progressGroup && <ProgressSummary summary={data.progressGroup} />}
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}
