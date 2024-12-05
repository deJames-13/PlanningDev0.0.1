import { cilHistory, cilPlus, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CSpinner,
} from '@coreui/react'
import { useEffect, useState } from 'react'
import Table from 'src/components/table'
import googleSheetStyle from 'src/components/table/googleSheetsStyle'
import useBarData from '../hooks/useBarData'
import tableData from './table-data'

export default function BarDataTable() {
    const { data, table, setTable, fetchDatas } = useBarData()

    useEffect(() => {
        fetchDatas()
    }, [])
    useEffect(() => {
        if (data.length) {
            setTable(tableData(data));
        }
    }, [data])


    return (
        <CCard>
            <CCardHeader>
                <div className="d-flex justify-content-between items-align-center">
                    <div>
                        <h4>BAR1 Table</h4>
                        <p>Last Update: {new Date().toLocaleString()}</p>
                    </div>
                    <div className="p-3 d-flex items-align-center gap-2">
                        <CButton color='success' variant='outline'>
                            <CIcon icon={cilPlus} />
                            <span style={{
                                paddingLeft: '3px'
                            }}>Add</span>
                        </CButton>
                        <CButton color='info' variant='outline'>
                            <CIcon icon={cilHistory} />
                            <span style={{
                                paddingLeft: '3px'
                            }}>Archived</span>
                        </CButton>
                        <CButton color='danger' variant='outline'>
                            <CIcon icon={cilTrash} />
                            <span style={{
                                paddingLeft: '3px'
                            }}>Delete All</span>
                        </CButton>
                    </div>
                </div>
            </CCardHeader>
            <CCardBody>
                <Table
                    tableData={table}
                    columns={table.columns}
                    data={table.data}
                    customStyles={googleSheetStyle}
                />
            </CCardBody>
            <CCardFooter>

            </CCardFooter>
        </CCard>
    )
}
