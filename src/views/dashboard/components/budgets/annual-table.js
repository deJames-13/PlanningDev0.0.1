import { cilMenu, cilPen, cilSortAlphaDown, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react';
import React from 'react';
import DataTable from "react-data-table-component";


function AnnualTableAlt({
    values = [],
    onRemove = () => { },
    onEdit = () => { }
}) {
    return !(values?.length > 0) ? '' : (

        <div className='d-sm-none'>
            {
                values.map((item, index) => (
                    <div key={index} className='mb-3'>
                        <div className='row fs-6'>
                            <div className='d-flex flex-wrap justify-content-between col-12'>
                                <span><strong>Year:</strong></span>
                                <br />
                                <span>{item.year}</span>
                            </div>
                            <div className='d-flex flex-wrap justify-content-between col-12'>
                                <span><strong>Allotment:</strong></span>
                                <br />
                                <span>{item.allotment}</span>
                            </div>
                            <div className='d-flex flex-wrap justify-content-between col-12'>
                                <span><strong>Obligated:</strong></span>
                                <br />
                                <span>{item.obligated}</span>
                            </div>
                            <div className='d-flex flex-wrap justify-content-between col-12'>
                                <span><strong>Rate (%):</strong></span>
                                <br />
                                <span>{item.utilization_rate || parseFloat(
                                    (item.obligated / item.allotment) * 100
                                )}</span>
                            </div>
                            <span className='d-flex justify-content-between col-12'>
                                <CButton
                                    color='info'
                                    size='sm'
                                    onClick={() => onEdit(item)}
                                >
                                    <CIcon icon={cilPen} />
                                </CButton>
                                <CButton
                                    color='danger'
                                    size='sm'
                                    onClick={() => onRemove(item)}
                                >
                                    <CIcon icon={cilTrash} />
                                </CButton>
                            </span>
                        </div>
                        <hr />
                    </div>
                ))
            }
        </div>
    )
}

export default function AnnualTable({
    values = [],
    onRemove = () => { },
    onEdit = () => { }
}) {
    if (!typeof values === 'array') {
        values = []
    }

    return (
        <>
            <div className='d-none d-sm-block'>
                <DataTable
                    sortIcon={<CIcon icon={cilSortAlphaDown} />}
                    columns={[
                        {
                            name: <span className='text-uppercase fw-bold'>year</span>,
                            selector: row => row.year,
                            width: '15%',
                            sortable: true,
                        },
                        {
                            name: <span className='text-uppercase fw-bold'>allotment</span>,
                            selector: row => row.allotment,
                            width: '25%',
                            sortable: true,
                        },
                        {
                            name: <span className='text-uppercase fw-bold'>obligated</span>,
                            selector: row => row.obligated,
                            width: '25%',
                            sortable: true,
                        },
                        {
                            name: <span className='text-uppercase fw-bold'>Rate</span>,
                            selector: row => row.utilization_rate,
                            sortable: true,
                        },
                        {
                            cell: (row) => (
                                <>
                                    <CButton
                                        color='info'
                                        size='sm'
                                        onClick={() => onEdit(row)}
                                    >
                                        <CIcon icon={cilPen} />
                                    </CButton>
                                    <CButton
                                        color='danger'
                                        size='sm'
                                        onClick={() => onRemove(row)}
                                    >
                                        <CIcon icon={cilTrash} />
                                    </CButton>
                                </>
                            ),
                        }
                    ]}
                    data={[
                        ...values
                    ]}
                    noHeader
                    defaultSortField="anuuualDataTable"
                    defaultSortAsc={true}
                    pagination
                    highlightOnHover
                    pointerOnHover
                />
            </div>

            <AnnualTableAlt
                values={values}
                onRemove={onRemove}
                onEdit={onEdit}
            />
        </>
    )
}
