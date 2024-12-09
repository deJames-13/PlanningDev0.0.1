import { cilPlus } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import { useEffect, useState } from 'react';

export default function AnnualModal({
    data,
    open,
    value = {},
    setOpen,
    onSubmit = () => { },
    onCancel = () => { },
}) {
    const [visible, setVisible] = useState(open);
    const [current, setCurrent] = useState(value);
    const [errors, setErrors] = useState({});

    return (
        <>

            <CButton color="primary" onClick={() => setVisible(!visible)} className='d-flex align-items-center'>
                <CIcon icon={cilPlus} />
                <span className='d-none d-lg-bloc'>{data?.label}</span>
            </CButton>
            <CModal
                backdrop="static"
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="budgetAnnualModal"
                alignment="center"
                scrollable
            >
                <CModalHeader className='container-fluid'>
                    <CModalTitle id="budgetAnnualModal">
                        <strong>Insert Annual Data</strong>
                    </CModalTitle>
                </CModalHeader>
                <CModalBody className='container-fluid mx-auto'>

                </CModalBody>
                <CModalFooter className='container-fluid'>
                    <CButton color="secondary" onClick={() => {
                        setVisible(false);
                        onCancel();
                    }}>
                        Close
                    </CButton>
                    <CButton color="primary" onClick={() => {
                        if (Object.keys(errors).length === 0) {
                            onSubmit(current);
                            setVisible(false);
                        }
                    }}>Save changes</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}
