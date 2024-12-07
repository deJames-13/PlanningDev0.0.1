import { cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import React, { useState } from 'react'
import ParticularForm from './form'

export default function ParticularModal({
    onSubmit = () => { },
    ...props
}) {
    const [visible, setVisible] = useState(false)

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
                        {...props}
                    />
                </CModalBody>
                <CModalFooter className='container-fluid'>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Close
                    </CButton>
                    <CButton color="primary" onClick={onSubmit}>Save changes</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}
