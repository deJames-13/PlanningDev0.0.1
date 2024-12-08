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

import { useEffect } from 'react'
import Table from 'src/components/table'
import googleSheetStyle from 'src/components/table/googleSheetsStyle'
import useResource from '../hooks/useResource'

export default function ResourceTable({
    resource,
    tableData,
    title,
    subtitle,
}) {
    const {
        names: { capitalizeName },
        states: { data, table, setTable, tableState, nextTableState, loading },
        actions: { fetchDatas },
        navigate,
        events,
    } = useResource(resource)

    useEffect(() => {
        fetchDatas()
    }, [])
    useEffect(() => {
        if (data.length && tableData) {
            setTable(tableData(data));
        }
    }, [data])


    return (
        <CCard>
            <CCardHeader>
                <div className="d-flex justify-content-between items-align-center">
                    <div>
                        <h4 className='text-capitalize'>
                            {`${capitalizeName} Table` || title}
                        </h4>
                        {subtitle}
                    </div>
                    <div className="p-3 d-flex items-align-center gap-2">
                        {
                            !loading &&
                            <>

                                <CButton onClick={() => navigate.toForm()} color='success' variant='outline'>
                                    <CIcon icon={cilPlus} />
                                    <span style={{
                                        paddingLeft: '3px'
                                    }}>
                                        Add
                                    </span>
                                </CButton>
                                <CButton onClick={() => events.onToggleTable(nextTableState)} color='info' variant='outline' className="text-capitalize">
                                    <CIcon icon={cilHistory} />
                                    <span style={{
                                        paddingLeft: '3px'
                                    }}>
                                        {nextTableState === 'index' ? 'Active' : nextTableState}
                                    </span>
                                </CButton>
                                <CButton color='danger' variant='outline'>
                                    <CIcon icon={cilTrash} />
                                    <span style={{
                                        paddingLeft: '3px'
                                    }}>
                                        Delete All
                                    </span>
                                </CButton>
                            </>
                        }

                        {loading && <CSpinner />}

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
