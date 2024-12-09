import { ErrorMessage } from 'formik'
import React from 'react'
import FieldWrapper from './field'



export default function InputGroup({ label, field }) {
    const { colSpan, ...rest } = field
    return (
        <div className='row'>
            {
                field?.fields && field?.fields.map((field, index) => {
                    return (
                        <div key={index}
                            className={`col-${field.colSpan || 12} `}


                        >
                            <span className='fs-6'>{field.label}</span>
                            <FieldWrapper field={field} />
                            <ErrorMessage name={field.name} component="div" className="text-danger fst-italic fw-light fs-6" style={{
                                fontSize: '0.6rem',
                            }} />

                        </div>)
                })
            }
        </div>
    )
}
