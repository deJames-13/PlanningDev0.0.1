import { cilPlus } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import { useEffect, useState } from 'react';
import FormikForm from 'src/components/form';
import * as Yup from 'yup';

export function FormValues({
    onSubmit = () => { },
    onChanges = () => { },
    value = {},
}) {
    const fields = [
        {
            name: 'year',
            label: 'Year',
            initialValue: value?.year || '',
        },
        {
            name: 'accomplishment',
            label: 'Accomplishment',
            initialValue: value?.accomplishment || '',
        },
        {
            name: 'target',
            label: 'Target',
            initialValue: value?.target || '',
        },
    ];

    return (
        <FormikForm
            initialValues={fields.reduce((acc, field) => {
                acc[field.name] = field.initialValue;
                return acc;
            }, {})}
            validationSchema={Yup.object({
                year: Yup.number().required('Required'),
                accomplishment: Yup.number().required('Required'),
                target: Yup.number().required('Required'),
            })}
            fields={fields}
            onSubmit={onSubmit}
            onChanges={onChanges}
            noSubmit
        />
    );
}

export default function FormValuesModal({
    label = 'Add',
    value = {},
    open = false,
    onSubmit = () => { },
    onCancel = () => { }
}) {
    const [visible, setVisible] = useState(open);
    const [current, setCurrent] = useState(value);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setVisible(open);
    }, [open]);

    return (
        <>
            <CButton color="primary" onClick={() => setVisible(!visible)} className='d-flex align-items-center'>
                <CIcon icon={cilPlus} />
                <span>{label}</span>
            </CButton>
            <CModal
                backdrop="static"
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="formValuesModal"
                alignment="center"
                scrollable
            >
                <CModalHeader className='container-fluid'>
                    <CModalTitle id="formValuesModal">
                        <strong>Insert Values</strong>
                    </CModalTitle>
                </CModalHeader>
                <CModalBody className='container-fluid mx-auto'>
                    <FormValues
                        value={value}
                        onChanges={(values, errors) => {
                            setCurrent(values);
                            setErrors(errors);
                        }}
                    />
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
    );
}