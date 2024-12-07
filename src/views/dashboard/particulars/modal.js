import { cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import ParticularForm from './form'

export default function ParticularModal({
    onSubmit = () => { },
    open = false,
    ...props
}) {
    const [visible, setVisible] = useState(open)
    const [particular, setParticular] = useState(props.value || {})
    const [errors, setErrors] = useState({})

    useEffect(() => {
        setVisible(open)
    }, [open])

    return (
        <>
            <CButton color="primary" onClick={() => setVisible(!visible)} className='d-flex align-items-center'>
                <CIcon icon={cilPlus} />
                <span>
                    Add Particulars
                </span>
            </CButton>
            <CModal
                size='lg'
                backdrop="static"
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="formParticularsModal"
                scrollable
            >
                <CModalHeader className='container-fluid'>
                    <CModalTitle id="formParticularsModal">
                        <strong>
                            Insert Particulars
                        </strong>
                    </CModalTitle>
                </CModalHeader>
                <CModalBody
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <ParticularForm
                        isModal
                        onChanges={setParticular}
                        onErrors={setErrors}
                        {...props}
                    />
                </CModalBody>
                <CModalFooter className='container-fluid'>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Close
                    </CButton>
                    <CButton color="primary" onClick={() => {
                        Object.keys(errors).length === 0 && onSubmit(particular)
                    }}>Save changes</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}