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
        states: { data, table, setTable, tableState, nextTableState, loading },
        actions: { fetchDatas },
        navigate,
        events: { onDestroy, onToggleTable },
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


    useEffect(() => {
        fetchDatas()
    }, [])

    useEffect(() => {
        if (data.length && tableData) {
            setTable(tableData(data, ({ row }) => {
                return (
                    <>
                        <div>
                            <Link to={`/dashboard/${kebabCaseName}/edit/` + row.id} className="btn btn-sm btn-info btn-outline">
                                <CIcon icon={cilPen} />
                            </Link>
                            <button type='button' onClick={() => onDelete(row)} className="btn btn-sm btn-danger btn-outline">
                                <CIcon icon={cilTrash} />
                            </button>
                        </div>

                    </>
                )

            }));
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
                                <CButton onClick={() => onToggleTable(nextTableState)} color='info' variant='outline' className="text-capitalize">
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
