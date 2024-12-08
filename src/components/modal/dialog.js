import React from 'react'

export default function Dialog({
    visible,
    setVisible,
    title,
    children,
    footer,
    actions,
}) {
    return (
        <>
            <CModal
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="dialogModal"
            >
                <CModalHeader>
                    <CModalTitle id="dialogModal">
                        {title}
                    </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {children}
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Close
                    </CButton>
                    <CButton color="primary">
                        Save changes
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    )

}
