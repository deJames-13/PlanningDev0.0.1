import { cilHistory, cilPlus, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CSpinner } from '@coreui/react'
import React from 'react'
import ExportResource from '../ExportResource'

export default function TableActions({
    tableState = 'index',
    loading = false,
    selectedIds = [],
    navigate,
    onToggleTable,
    handleDestroy,
    handleRestore,
    nextTableState,
    resource,

}) {
    return (
        <>
            <div className="d-flex flex-column items-align-center justify-content-center gap-2" >
                {
                    !loading &&
                    <div className='d-flex items-align-center gap-2'
                        style={{
                            height: 'fit-content'
                        }}
                    >
                        <CButton onClick={() => navigate?.toForm()} color='success' variant='outline'>
                            <CIcon icon={cilPlus} />
                            <span className='d-none d-lg-inline-block' style={{
                                paddingLeft: '3px'
                            }}>
                                Add
                            </span>
                        </CButton>
                        <CButton onClick={() => onToggleTable(nextTableState)} color='info' variant='outline' className="text-capitalize">
                            <CIcon icon={cilHistory} />
                            <span className='d-none d-lg-inline-block' style={{
                                paddingLeft: '3px'
                            }}>
                                {nextTableState === 'index' ? 'Active' : nextTableState === 'thrashed' ? 'Archived' : 'Index'}
                            </span>
                        </CButton>

                        {/* EXPORT */}
                        <ExportResource
                            id={selectedIds.length > 0 ? selectedIds : 'all'}
                            resource={resource}
                        />

                        {/* BATCH ACTIONS */}
                        {
                            selectedIds.length > 0 &&
                            <div className="d-flex items-align-center gap-2"
                                style={{
                                    height: 'fit-content'
                                }}
                            >
                                {
                                    tableState === 'index' &&
                                    <CButton onClick={() => handleDestroy({ id: selectedIds })} color='danger' variant='outline'>
                                        <CIcon icon={cilTrash} />
                                        <span className='d-none d-lg-inline-block' style={{
                                            paddingLeft: '3px'
                                        }}>
                                            Delete All
                                        </span>
                                    </CButton>
                                }
                                {
                                    tableState === 'thrashed' &&
                                    <CButton onClick={() => handleRestore({ id: selectedIds })} color='success' variant='outline'>
                                        <CIcon icon={cilHistory} />
                                        <span className='d-none d-lg-inline-block' style={{
                                            paddingLeft: '3px'
                                        }}>
                                            Restore All
                                        </span>
                                    </CButton>
                                }
                            </div>
                        }
                    </div>
                }

                {loading && <CSpinner />}

            </div>

        </>
    )
}
