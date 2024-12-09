import { cilMenu, cilPen, cilSortAlphaDown, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react';
import React from 'react';
import DataTable from "react-data-table-component";


function AnnualTableAlt({
    values,
    handleRemove = () => { },
    handleEdit = () => { }
}) {
    return (

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
                                <span><strong>Target:</strong></span>
                                <br />
                                <span>{item.target}</span>
                            </div>
                            <div className='d-flex flex-wrap justify-content-between col-12'>
                                <span><strong>Accomplishment:</strong></span>
                                <br />
                                <span>{item.accomplishment}</span>
                            </div>
                            <div className='d-flex flex-wrap justify-content-between col-12'>
                                <span><strong>Rate (%):</strong></span>
                                <br />
                                <span>{item.utilization_rate}</span>
                            </div>
                            <span className='d-flex justify-content-between col-12'>
                                <CButton
                                    color='info'
                                    size='sm'
                                    onClick={() => handleEdit(item)}
                                >
                                    <CIcon icon={cilPen} />
                                </CButton>
                                <CButton
                                    color='danger'
                                    size='sm'
                                    onClick={() => handleRemove(item)}
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
    values,
    handleRemove = () => { },
    handleEdit = () => { }
}) {

    return (
        <>
            <div className='d-none d-sm-block'>
                <DataTable
                    sortIcon={<CIcon icon={cilSortAlphaDown} />}
                    columns={[
                        {
                            name: <span className='text-uppercase fw-bold'>year</span>,
                            selector: row => row.year,
                            width: '20%',
                            sortable: true,
                        },
                        {
                            name: <span className='text-uppercase fw-bold'>target</span>,
                            selector: row => row.target,
                            sortable: true,
                        },
                        {
                            name: <span className='text-uppercase fw-bold'>accomplishment</span>,
                            selector: row => row.accomplishment,
                            sortable: true,
                        },
                        {
                            name: <span className='text-uppercase fw-bold'>Rate</span>,
                            width: '20%',
                            selector: row => row.utilization_rate,
                            sortable: true,
                        },
                        {
                            width: '10%',
                            cell: (row) => (
                                <CDropdown>
                                    <CDropdownToggle>
                                        <CIcon icon={cilMenu} />
                                    </CDropdownToggle>
                                    <CDropdownMenu>
                                        <CDropdownItem
                                            className='text-info d-flex gap-2'
                                            onClick={() => handleEdit(row)}
                                        >
                                            <CIcon icon={cilPen} />
                                            Edit
                                        </CDropdownItem>
                                        <CDropdownItem
                                            className='text-danger d-flex gap-2'
                                            onClick={() => handleRemove(row)}
                                        >
                                            <CIcon icon={cilTrash} />
                                            Remove
                                        </CDropdownItem>
                                    </CDropdownMenu>
                                </CDropdown>
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
                handleRemove={handleRemove}
                handleEdit={handleEdit}
            />
        </>
    )
}
