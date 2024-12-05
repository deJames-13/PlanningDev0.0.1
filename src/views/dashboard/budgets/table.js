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
import React from 'react'
import Table from 'src/components/table'

export default function BudgetDataTable() {
    return (
        <CCard>
            <CCardHeader>
                <div className="d-flex justify-content-between items-align-center">
                    <div>
                        <h4>Budgets Table</h4>
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
                <Table />
            </CCardBody>
            <CCardFooter>

            </CCardFooter>
        </CCard>
    )
}
