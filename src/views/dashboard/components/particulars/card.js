import { cilPen, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton } from '@coreui/react'
import React from 'react'

export function ValueCard({ value, onRemove = () => { }, onEdit = () => { }, noActions = false }) {
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
                        {isFinite(parseFloat(value.accomplishment) / parseFloat(value.target))
                            ? (parseFloat(value.accomplishment) / parseFloat(value.target) * 100).toFixed(2) + '%'
                            : 'N/A'
                        }
                    </span>
                </span>
                {
                    !noActions &&
                    <span className='d-flex justify-content-between col-sm-2'>
                        <span className='d-flex gap-2'>
                            <CButton
                                color='info'
                                onClick={onEdit}
                            >
                                <CIcon icon={cilPen} />
                            </CButton>
                            <CButton
                                color='danger'
                                onClick={onRemove}
                            >
                                <CIcon icon={cilTrash} />
                            </CButton>
                        </span>
                    </span>
                }
            </div>
            <hr className='d-sm-none' />
        </>
    )
}

export function ValuesCard({
    values,
    setValues,
    noActions = false,
    editValue = () => { },
    removeValue = () => { }
}) {
    const sortedValues = [...values].sort((a, b) => a.year - b.year)
    return sortedValues.length > 0 && (
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

            {sortedValues.map((value, index) => <ValueCard
                key={index}
                value={value}
                noActions={noActions}
                onEdit={() => editValue(value)}
                onRemove={() => removeValue(value)}
            />
            )}
        </>
    )
}


export default function ParticularCard({
    particular,
    onEdit = () => { },
    onRemove = () => { },
}) {
    const sortedValues = [...(particular?.values || [])].sort((a, b) => a.year - b.year)
    return particular && (
        <>
            <div>
                <div className="d-md-flex items-align-center justify-content-between">
                    <div>
                        <h5>
                            {particular.title}
                        </h5>
                        <p className='text-small'>
                            {particular.description}
                        </p>
                    </div>
                    <div>
                        <span className='d-flex justify-content-between col-sm-2'>
                            <span className='d-flex gap-2'>
                                <CButton
                                    color='info'
                                    onClick={() => onEdit(particular)}
                                >
                                    <CIcon icon={cilPen} />
                                </CButton>
                                <CButton
                                    color='danger'
                                    onClick={() => onRemove(particular)}
                                >
                                    <CIcon icon={cilTrash} />
                                </CButton>
                            </span>
                        </span>
                    </div>
                </div>
                <hr />
                {
                    <ValuesCard
                        values={
                            sortedValues.filter((value, index, self) =>
                                index === self.findIndex((t) => (
                                    t.year === value.year
                                ))
                            ) || []}
                        noActions={true}
                    />
                }
                <hr />
            </div>
        </>
    )
}