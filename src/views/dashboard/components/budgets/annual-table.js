import { cilPen, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton } from '@coreui/react'
import React from 'react'

export default function AnnualTable({
    values,
    handleRemove = () => { },
    handleEdit = () => { }
}) {
    return (
        <>
            <div className='d-none d-sm-block'>
                <table className='table table-sm table-hover'>
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Target</th>
                            <th>Accomplishment</th>
                            <th>Rate (%)</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            values.map((item, index) => (
                                <tr key={index}>
                                    <td><strong>{item.year}</strong></td>
                                    <td>{item.target}</td>
                                    <td>{item.accomplishment}</td>
                                    <td>{item.utilization_rate}</td>
                                    <td>
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
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
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
        </>
    )
}
