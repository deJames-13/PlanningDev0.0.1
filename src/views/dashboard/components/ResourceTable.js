import { cilHistory, cilPen, cilPlus, cilTrash } from '@coreui/icons'
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
import { Link } from 'react-router-dom'
import Table from 'src/components/table'
import googleSheetStyle from 'src/components/table/googleSheetsStyle'
import Swal from 'sweetalert2'
import useResource from '../hooks/useResource'

export default function ResourceTable({
    resource,
    tableData,
    title,
    subtitle,
}) {
    const {
        names: { capitalizeName, kebabCaseName },
        states: {
            data,
            thrashedData,
            table,
            setTable,
            tableState,
            nextTableState,
            loading
        },
        actions: { fetchDatas },
        navigate,
        events: { onDestroy, onRestore: doRestore, onToggleTable },
    } = useResource(resource)


    const handleDelete = async (row) => {
        return await onDestroy(row.id).then(() => {
            Swal.fire(
                'Deleted!',
                'Your data has been deleted.',
                'success'
            )
        }).catch(() => {
            Swal.fire(
                'Error!',
                'An error occurred while deleting your data.',
                'error'
            )
        })
    }

    const onDelete = (row) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this data!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it',
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(row)
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Your data is safe :)',
                    'error'
                )
            }
        });
    }

    const handleRestore = async (row) => {

    }
    const onRestore = (row) => {

    }


    useEffect(() => {
        fetchDatas()
    }, [])

    useEffect(() => {
        let values = data;
        if (tableState === 'thrashed') {
            values = thrashedData;
        }
        console.log(tableState, values)
        if (Array.isArray(values) && tableData) {
            setTable(tableData(values, ({ row }) => {
                return (
                    <>
                        <div>
                            {
                                tableState == 'index' &&
                                <>
                                    <Link to={`/dashboard/${kebabCaseName}/edit/` + row.id} className="btn btn-sm btn-info btn-outline">
                                        <CIcon icon={cilPen} />
                                    </Link>
                                    <button type='button' onClick={() => onDelete(row)} className="btn btn-sm btn-danger btn-outline">
                                        <CIcon icon={cilTrash} />
                                    </button>
                                </>
                            }
                            {
                                tableState == 'thrashed' &&
                                <button type='button' onClick={() => onRestore(row)} className="btn btn-sm btn-success btn-outline">
                                    <CIcon icon={cilHistory} />
                                </button>
                            }
                        </div>

                    </>
                )

            }));
        }
    }, [data, thrashedData, tableState])

    return (
        <CCard>
            <CCardHeader>
                <div className="d-flex flex-column flex-lg-row justify-content-lg-between items-align-center">
                    <div>
                        <h4 className='text-capitalize'>
                            {`${capitalizeName} Table` || title}
                        </h4>
                        {subtitle}
                    </div>
                    <div className="p-3 d-flex items-align-center justify-content-end gap-2">
                        {
                            !loading &&
                            <>

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
                                        {nextTableState === 'index' ? 'Active' : nextTableState}
                                    </span>
                                </CButton>
                                <CButton color='danger' variant='outline'>
                                    <CIcon icon={cilTrash} />
                                    <span className='d-none d-lg-inline-block' style={{
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
