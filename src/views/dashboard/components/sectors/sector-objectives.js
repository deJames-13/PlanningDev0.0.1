import { cilCaretBottom, cilCaretTop } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CSpinner } from '@coreui/react';
import { useEffect, useState } from 'react';
import useObjectiveCharter from '../../hooks/useObjectiveCharter';
import QualityObjectives, { ProgressSummary } from '../objectives/index';
import SectorActions from './sector-actions';

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

            <div className="d-flex items-align-center gap-2">
              <h4>Objectives Overview</h4>
              {isLoading && <span>
                <CSpinner size="sm" variant="grow" color='primary' />
              </span>}
            </div>
          </div>
          {
            data?.lastUpdate && (
              <span className="small text-muted">Last Updated: {data.lastUpdate}</span>
            )
          }
        </div>
        <button
          className="btn btn-sm btn-ghost-primary"
          onClick={handleReverse}>
          <CIcon icon={reversed ? cilCaretTop : cilCaretBottom} />
        </button>
      </CCardHeader>
      <CCardBody>
        <CRow className={`flex-column-reverse flex-md-row`}>
          <CCol
            xs={12}
            md={6}
            style={{
              height: '100vh',
              overflowY: 'auto',
            }}
            className={`d-flex flex-column ${reversed ? 'flex-column-reverse' : ''}`}
          >
            {data?.objectives?.length > 0 && <QualityObjectives objectives={data.objectives} />}
          </CCol>
          <CCol xs={12} md={6} className='flex-column-reverse flex-md-row'>
            {data?.progressGroup && <ProgressSummary summary={data.progressGroup} />}
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}
