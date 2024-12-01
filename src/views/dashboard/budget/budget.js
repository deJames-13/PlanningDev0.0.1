import CIcon from '@coreui/icons-react'
import classNames from 'classnames'
import React from 'react'
import { useBudgetCharting } from '../hooks/useBudgetCharter'

import { cilCloudDownload, } from '@coreui/icons'
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import LineChart from './LineChart'

const progressExample = [
    // { title: 'Budget', value: '29.703', percent: 40, color: 'success' },
    // { title: 'FUND01', value: '24.093', percent: 20, color: 'info' },
    // { title: 'FUND02', value: '78.706', percent: 60, color: 'warning' },
]

const selectTabs = ['Budget', 'FUND 01', 'FUND 02']



export default function BudgetChart() {
  const {data, getBudgetData, progressRates } = useBudgetCharting()
  const [rates, setRates] = React.useState([])
  const [tabs, setTabs] = React.useState()
  const [activeTab, setActiveTab] = React.useState(selectTabs[0])
  const [fund, setFund] = React.useState(null)
  const [updating, setUpdating] = React.useState(false)


  React.useEffect(() => {
    setUpdating(true)
    getBudgetData().then(() => setUpdating(false))
  }, [activeTab])
  React.useEffect(() => {
    const idx = data.labels.indexOf(activeTab) || 0
    setTabs(data.labels.slice(idx, idx + 2))
    if (data?.annual){
      const fund = data?.annual?.datasets?.find(item => item.name === activeTab)
      setFund(fund)
      setRates(data?.progressRates[activeTab])
    }
    console.log(data);
    console.table(data.progressRates)
    
  }, [data])

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



  return (
    <>
        <CCard className="mb-4">
          <CCardBody>
            {updating && (
                <div className="spinner-border text-primary float-end" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
              ) 
            }
            <CRow>
                <CCol sm={5}>
                  <h4 id="traffic" className="card-title mb-0 mr-2">
                    {data?.title ? data.title : 'Budget Overview'}
                  </h4>

                  <div className="small text-body-secondary">
                    {rates && rates.length > 0 && `${rates[0].title} - ${rates[rates.length-1].title}`}
                  </div>
                </CCol>
                <CCol sm={7} className="d-none d-md-block">
                  {/* <CButton color="primary" className="float-end">
                    <CIcon icon={cilCloudDownload} />
                  </CButton> */}
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
              fund && <LineChart chartData={fund} max={parseInt(fund.maxAllotment + (fund.maxAllotment * 0.25))} average={fund.meanValue}/>
            }
            {/* LineChartTable */}


        </CCardBody>
        <CCardFooter>
          {
            rates.length > 0 && (
              <h6 className="card-title mb-0 mr-2">
                Utilization Rate
              </h6>
            )
          }
          <CRow
              xs={{ cols: 1, gutter: 4 }}
              sm={{ cols: 2 }}
              lg={{ cols: 4 }}
              xl={{ cols: 5 }}
              className="mb-2 text-center"
            >
              {rates && rates.map((item, index, items) => (
                <CCol
                  className={classNames({
                    'd-none d-xl-block': index + 1 === items.length,
                  })}
                  key={`progress_${index}`}
                >
                  <div className="text-body-secondary">{item.title}</div>
                  <div className="fw-semibold text-truncate">
                    {item.value} ({item.percent}%)
                  </div>
                  <CProgress thin className="mt-2" color={item.color} value={item.percent} />
                </CCol>
              ))}
              { fund && (
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                    { fund.labels.map((label, idx) => (
                      <CTableHeaderCell key={`label_${idx}`} scope="col">{label}</CTableHeaderCell>
                    ))}
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {
                    fund.datasets.slice(0, fund.datasets.length-1).map((dataset, idx) => {
                      return (
                        <CTableRow key={`dataset_${idx}`}>
                          <CTableHeaderCell scope="row" key={`dataset_label_${idx}`}>{dataset.label}</CTableHeaderCell>
                          {dataset.data.map((data, idx) => (
                            <CTableDataCell key={`data_${idx}`}>{data}</CTableDataCell>
                          ))}
                        </CTableRow>
                      )
                      
                    })
                  }
                </CTableBody>
              </CTable>)}

            </CRow>
        </CCardFooter>
      </CCard>
    </>
  )
}

