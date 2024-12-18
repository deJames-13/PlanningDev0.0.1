import { cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ParticularForm from './form'

export default function ParticularModal({
    onSubmit = () => { },
    onCancel = () => { },
    open = false,
    ...props
}) {
    const [visible, setVisible] = useState(open)
    const [particular, setParticular] = useState(props?.particular)
    const [errors, setErrors] = useState({})


    useEffect(() => {
        if (props?.particular) {
            setParticular(props?.particular);
            setVisible(true);
        }
    }, [props?.particular]);


    useEffect(() => {
        if (!visible) {
            onCancel()
        }
    }, [visible])

    return (
        <>
            <CButton color="primary" onClick={() => {
                setVisible(true)
            }} className='d-flex align-items-center'>
                <CIcon icon={cilPlus} />
                <span className='d-none d-md-block'>
                    Add Particulars
                </span>
            </CButton>
            <CModal
                fullscreen="xl"
                size='lg'
                backdrop="static"
                visible={visible}
                onClose={() => { setVisible(false) }}
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
                    className='px-0 mx-0 container-fluid'
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <ParticularForm
                        isModal={true}
                        onErrors={setErrors}
                        onChanges={setParticular}
                        {...props}
                    />
                </CModalBody>
                <CModalFooter className='container-fluid'>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Close
                    </CButton>
                    <CButton color="primary" onClick={() => {
                        if (errors == undefined)
                            return toast.error('Please fill up the form')
                        if (Object.keys(errors || {}).length === 0) {
                            onSubmit({
                                ...particular,
                                id: props?.particular?.id || null
                            })
                            setVisible(false)
                        } else {
                            console.log(errors)
                        }

                    }}>Save changes</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}
