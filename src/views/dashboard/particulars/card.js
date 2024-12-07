import { cilPen, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton } from '@coreui/react'
import React from 'react'

export function ValueCard({ value, onRemove = () => { }, onEdit = () => { } }) {
    return value && (
        <>

            <div className='row fs-6'>
                <span className='d-flex justify-content-between col-sm-2'>
                    <span className="d-sm-none">
                        <strong>
                            Year
                        </strong>
                    </span>
                    <span>
                        <strong>
                            {value.year}
                        </strong>
                    </span>
                </span>
                <span className='d-flex justify-content-between col-sm-3'>
                    <span className="d-sm-none">
                        <strong>
                            Accomplishment
                        </strong>
                    </span>
                    <span>
                        {value.accomplishment}
                    </span>
                </span>
                <span className='d-flex justify-content-between col-sm-3'>
                    <span className="d-sm-none">
                        <strong>
                            Target
                        </strong>
                    </span>
                    <span>
                        {value.target}
                    </span>
                </span>
                <span className='d-flex justify-content-between col-sm-2'>
                    <span className="d-sm-none">
                        <strong>
                            Percentage
                        </strong>
                    </span>
                    <span>
                        {value.percent ||
                            (parseFloat(value.accomplishment) / parseFloat(value.target) * 100).toFixed(2)
                        }%
                    </span>
                </span>
                <span className='d-flex justify-content-between col-sm-2'>
                    <CButton color="info" variant='outline' size='sm' onClick={onEdit}>
                        <CIcon icon={cilPen} />
                    </CButton>
                    <CButton color="danger" variant='outline' size='sm' onClick={onRemove}>
                        <CIcon icon={cilTrash} />
                    </CButton>
                </span>
            </div>
            <hr className='d-sm-none' />
        </>
    )
}

export function ValuesCard({
    values,
    setValues,
    editValue = () => { },
    removeValue = () => { }
}) {
    const handleRemove = (index) => {
        setValues((values || []).filter((_, i) => i !== index))
    }

    return values.length > 0 && (
        <>
            <div className='d-none d-sm-block'>
                <div className='row fs-6 fw-bold'>
                    <span className='d-flex justify-content-between col-sm-2'>
                        Year
                    </span>
                    <span className='d-flex justify-content-between col-sm-3'>
                        Accomplishment
                    </span>
                    <span className='d-flex justify-content-between col-sm-3'>
                        Target
                    </span>
                    <span className='d-flex justify-content-between col-sm-2'>
                        %
                    </span>
                    <span className='d-flex justify-content-between col-sm-2'>
                        &nbsp;
                    </span>
                </div>
            </div>

            {(values || []).map((value, index) => <ValueCard
                key={index}
                value={value}
                onEdit={() => editValue(value)}
                onRemove={() => removeValue(value)}
            />
            )}
        </>
    )
}


export default function ParticularCard({ particular }) {
    return particular && (
        <>
            <div>
                <h5>
                    {particular.title}
                </h5>
                <p className='text-small'>
                    {particular.description}
                </p>
                <hr />
                {
                    <ValuesCard values={particular?.values || []} />
                }
                <hr />
            </div>
        </>
    )
}
