import CIcon from '@coreui/icons-react'
import { cilHistory, cilPen, cilPlus, cilSpreadsheet, cilTrash } from '@coreui/icons'
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CSpinner,
} from '@coreui/react'

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Table from 'src/components/table'
import googleSheetStyle from 'src/components/table/googleSheetsStyle'
import Pagination from 'src/components/table/pagination.js';
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'

import useResource from '../hooks/useResource'

const queryToStr = (query) => {
    return Object.keys(query).map(key => key + '=' + query[key]).join('&');
}
export default function ResourceTable({
    resource,
    tableData,
    title,
    subtitle,
    intitialQuery,
}) {
    const { userInfo, roles } = useSelector(state => state.auth)
    const [selectedIds, setSelectedIds] = useState([])

    const [query, setQuery] = useState({
        page: 1,
        limit: 10,
        search: '',
        orderBy: 'id',
        sortedBy: 'asc',
        ...intitialQuery
    })

    const {
        names: { capitalizeName, kebabCaseName },
        states: {
            data,
            meta,
            thrashedData,
            table,
            setTable,
            tableState,
            nextTableState,
            loading
        },
        actions: { fetchDatas, doExport },
        navigate,
        events: { onDestroy, onRestore, onToggleTable },
    } = useResource(resource)


    const handleDestroy = (row) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this data!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it',
        }).then(async (result) => {
            if (result.isConfirmed) {
                return await onDestroy(row.id).catch(e => {
                    const errorMessage = e?.data?.message
                    Swal.fire(
                        'Error',
                        errorMessage,
                        'error'
                    )

                })
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Your data is safe :)',
                    'error'
                )
            }
        });
    }

    const handleRestore = (row) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to restore this data!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, restore it!',
            cancelButtonText: 'No, keep it',
        }).then(async (result) => {
            if (result.isConfirmed) {
                return await onRestore(row.id).catch(e => {
                    const errorMessage = e?.data?.message
                    Swal.fire(
                        'Error',
                        errorMessage,
                        'error'
                    )
                })
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'error'
                )
            }
        })

    }

    const handlePageChange = (page) => {
        setQuery({
            ...query,
            page
        })
    }


    useEffect(() => {
        fetchDatas(queryToStr({ ...query, ...intitialQuery }))
    }, [query, intitialQuery])

    useEffect(() => {
        let values = data;
        if (tableState === 'thrashed') {
            values = thrashedData;
        }
        if (roles.includes('user')) {
            values = values.filter(value => !value?.status || !value?.status?.includes('pending'))
        }
        if (Array.isArray(values) && tableData) {
            setTable(tableData(values, ({ row }) => {
                return (
                    <div>
                        {
                            tableState == 'index' &&
                            <>
                                <Link to={`/dashboard/${kebabCaseName}/edit/` + row.id} className="btn btn-sm btn-info btn-outline">
                                    <CIcon icon={cilPen} />
                                </Link>
                                {
                                    (resource == 'users' && userInfo.id == row.id && roles.includes('super-admin')) ? <></> : <button type='button' onClick={() => handleDestroy(row)} className="btn btn-sm btn-danger btn-outline">
                                        <CIcon icon={cilTrash} />
                                    </button>
                                }
                            </>
                        }
                        {
                            tableState == 'thrashed' &&
                            <button type='button' onClick={() => handleRestore(row)} className="btn btn-sm btn-success btn-outline">
                                <CIcon icon={cilHistory} />
                            </button>
                        }
                    </div>
                )
            }, (e, id) => {
                if (e.target.checked) {
                    setSelectedIds(prev => [...prev, id])
                } else {
                    setSelectedIds(prev => prev.filter(i => i !== id))
                }
            })
            );
        }
        setSelectedIds([])
    }, [data, thrashedData, tableState])



    return (
        <CCard>
            <CCardHeader>
                <div className="d-flex flex-column flex-lg-row justify-content-lg-between items-align-center">
                    <div style={{ width: '60%' }}>
                        <h4 className='text-capitalize'>
                            {`${capitalizeName} Table` || title}
                        </h4>
                        <span className="text-wrap max-w-24">
                            {subtitle}
                        </span>
                    </div>
                    <div className="d-flex flex-column items-align-center justify-content-center gap-2" >
                        {
                            !loading &&
                            <div className='d-flex items-align-center gap-2' style={{
                                height: 'fit-content'
                            }}>
                                <CButton onClick={() => navigate.toForm()} color='success' variant='outline'>
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
                                <CButton onClick={() => doExport()} color='success' variant='outline'>
                                    <CIcon icon={cilSpreadsheet} />
                                    <span className='d-none d-lg-inline-block' style={{
                                        paddingLeft: '3px'
                                    }}>
                                        xlsx
                                    </span>
                                </CButton>

                                {
                                    // delete all or restore all if thrashed or index
                                    selectedIds.length > 0 &&
                                    <div className="d-flex items-align-center gap-2">
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
                </div>
            </CCardHeader>
            <CCardBody>
                {/* Search Filter */}
                <div className="d-flex justify-content-end">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        value={query.search}
                        onChange={(e) => setQuery({
                            ...query,
                            search: e.target.value
                        })}
                    />
                </div>

                <Table
                    tableData={table}
                    columns={table.columns}
                    data={table.data}
                    customStyles={googleSheetStyle}
                />
                {
                    meta?.links &&
                    <Pagination meta={meta} onPageChange={handlePageChange} />

                }
            </CCardBody>
            <CCardFooter>

            </CCardFooter>
        </CCard>
    )
}
