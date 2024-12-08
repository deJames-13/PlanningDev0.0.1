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
                                    onClick={() => handleRemove(item)}
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
    )
}
