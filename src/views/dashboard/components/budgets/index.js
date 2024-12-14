
import { useEffect, useState } from 'react'
import { useBudgetCharting } from '../../hooks/useBudgetCharter'

import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CProgress,
  CRow,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

import LineChart from 'src/components/charts/line'
import NoResult from 'src/components/skeletons/no-result'

const selectTabs = ['Budget']

export default function BudgetChart({
  sector = 'none',
}) {

  const { data, getBudgetData, progressRates } = useBudgetCharting()

  const [tabs, setTabs] = useState()
  const [rates, setRates] = useState([])
  const [fund, setFund] = useState(null)

  const [activeTab, setActiveTab] = useState(null)
  const [updating, setUpdating] = useState(false)

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const getPaginatedData = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const onTab = (tab, direction) => {
    const idx = data.labels.indexOf(tab)
    setActiveTab(tab)
    if (idx !== -1) {
      const nextTabs = data.labels.slice(idx, idx + 2)
      setTabs(nextTabs)
    }

    if (direction === 'prev') {
      const idx = data.labels.indexOf(tab)
      const nextTabs = data.labels.slice(idx - 1, idx + 1)
      setTabs(nextTabs)
    }

    if (direction === 'next') {
      const idx = data.labels.indexOf(tab)
      const nextTabs = data.labels.slice(idx, idx + 2)
      setTabs(nextTabs)
    }
  }

  useEffect(() => {
    setUpdating(true)
    getBudgetData(sector).then(() => setUpdating(false))
  }, [activeTab, sector])

  useEffect(() => {
    if (!data) return;
    const idx = data.labels.indexOf(activeTab) || 0
    setTabs(data.labels.slice(idx, idx + 2))
    if (data?.annual) {
      const fund = data?.annual?.datasets?.find(item => item.name === activeTab) || data?.annual?.datasets[0]
      const ratesData = data?.progressRates[activeTab] || Object.values(data?.progressRates)[0] || []

      setFund(fund)
      setRates(ratesData)
    }
  }, [data])

  useEffect(() => {
    setCurrentPage(1);
  }, [rates, fund]);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setItemsPerPage(3);
    } else {
      setItemsPerPage(5);
    }
  }, [window.innerWidth]);

  return data ? (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <div className="d-flex items-align-center gap-2">
                <h4 id="traffic" className="card-title mb-0 mr-2">
                  {data?.title ? data.title : 'Budget Overview'}
                </h4>
                {updating && <span>
                  <CSpinner size="sm" variant="grow" color='primary' />
                </span>}
              </div>

              <div className="small text-body-secondary">
                {rates && rates?.length > 0 && `${rates[0].title} - ${rates[rates.length - 1].title}`}
              </div>
              {
                data?.last_updated &&
                <p className='small text-body-secondary'>
                  Last Updated: {data?.last_updated?.split('T')?.join(' ')}
                </p>
              }
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButtonGroup className="float-end me-3">

                {/* prev */}
                <CButton
                  color="outline-secondary"
                  onClick={() => onTab(tabs[0], 'prev')}
                  disabled={tabs && tabs[0] === data.labels[0]}
                >
                  {'<'}
                </CButton>


                {tabs && tabs.map((value, idx) => (
                  <CButton
                    color="outline-secondary"
                    key={`${value}_${idx}`}
                    className="mx-0"
                    onClick={() => onTab(value)}
                    active={value === activeTab}
                  >
                    {value}
                  </CButton>
                ))}
                {/* next */}
                <CButton
                  color="outline-secondary"
                  onClick={() => onTab(tabs[1], 'next')}
                  disabled={tabs && tabs[1] === data.labels[data.labels.length - 1]}
                > {'>'} </CButton>

              </CButtonGroup>
            </CCol>
          </CRow>

          {
            fund ? <LineChart chartData={fund} max={parseInt(fund.maxAllotment + (fund.maxAllotment * 0.25))} average={fund.meanValue} />
              : <div style={{
                height: '300px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1rem',
              }}>
                <div className="clearfix" style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '1rem',
                }}>
                  <div>
                    <h4 className="pt-3">No data available.</h4>
                    <p className="text-body-secondary float-start">
                      Cannot find existing information about this chart.&nbsp;
                    </p>
                  </div>
                </div>
              </div>
          }


        </CCardBody>
        {
          fund &&
          <CCardFooter>
            {/* LineChartTable */}
            <CRow
              xs={{
                cols: 1,
                gutter: 4,
              }}
              sm={{ cols: 2 }}
              lg={{ cols: 4 }}
              xl={{ cols: 5 }}
              className="mb-2 text-center flex-column-reverse flex-lg-row"
            >

              {fund && (
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      {/* <CTableHeaderCell scope="col"></CTableHeaderCell> */}
                      {getPaginatedData(fund.labels).map((label, idx) => (
                        <CTableHeaderCell key={`label_${idx}`} scope="col">
                          {label}
                        </CTableHeaderCell>
                      ))}
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {
                      fund.datasets.map((dataset, idx) => {
                        return (
                          <CTableRow key={`dataset_${idx}`}>
                            {/* <CTableHeaderCell scope="row" key={`dataset_label_${idx}`} className='col-sm'>
                              {dataset.label}
                            </CTableHeaderCell> */}
                            {getPaginatedData(dataset.data).map((data, idx) => {

                              return dataset.label == 'utilization_rate' ? (
                                <CTableDataCell key={`data_${idx}`}>
                                  <div className="fw-semibold text-truncate">
                                    {parseFloat(data * 100).toFixed(2)}%
                                  </div>
                                  <CProgress thin className="mt-2" value={parseInt(parseFloat(data * 100).toFixed(2))} />
                                </CTableDataCell>
                              ) : (
                                <CTableDataCell key={`data_${idx}`}>
                                  {data}
                                </CTableDataCell>
                              )
                            })}
                          </CTableRow>
                        )

                      })
                    }
                  </CTableBody>
                </CTable>)}


            </CRow>
            {/* Pagination Controls */}
            {
              fund?.datasets?.length > itemsPerPage && (
                <div className="d-flex justify-content-between mt-3">
                  <button
                    className="btn btn-primary"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </button>
                  <span>Page {currentPage}</span>
                  <button
                    className="btn btn-primary"
                    disabled={fund?.datasets && currentPage * itemsPerPage >= fund?.datasets?.length && currentPage * itemsPerPage >= fund.datasets.length}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </button>
                </div>
              )
            }

          </CCardFooter>
        }
      </CCard>
    </>
  ) : <NoResult />
}

