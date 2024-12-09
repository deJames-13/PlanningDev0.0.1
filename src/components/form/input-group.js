import { ErrorMessage } from 'formik'
import React from 'react'
import FieldWrapper from './field'



export default function InputGroup({ field }) {
    const { colSpan, ...rest } = field
    return (
        <div className='row'>

            {
                field?.fields && field?.fields.map((field, index) => {
                    return (
                        <div key={index}
                            className={`col-${field.colSpan || 12} `}
                        >
                            <FieldWrapper field={field} />
                        </div>)
                })
            }
        </div>
    )
}
