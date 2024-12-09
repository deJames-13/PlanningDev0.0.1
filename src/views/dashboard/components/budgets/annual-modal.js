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
    const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
    const fields = [
        {
            name: 'year',
            label: 'Year',
            initialValue: value?.year || '',
        },
        ...quarters.map((quarter, i) => (
            {
                name: `quarter_${i + 1}`,
                label: <strong>Quarter {i + 1}</strong>,
                as: 'group',
                fields: [
                    {
                        name: `accomplishment_${i + 1}`,
                        label: 'Accomplishment',
                        initialValue: value?.accomplishment || '',
                        colSpan: 6,
                    },
                    {
                        name: `target_${i + 1}`,
                        label: 'Target',
                        initialValue: value?.target || '',
                        colSpan: 6,
                    },
                ]
            })),
    ];
    return (
        <div className="pb-5">
            <FormikForm
                initialValues={fields.reduce((acc, field) => {
                    if (field.fields) {
                        field.fields.forEach(f => {
                            acc[f.name] = f.initialValue || '';
                        });
                    } else {
                        acc[field.name] = field.initialValue || '';
                    }
                    return acc;
                }, {})}
                validationSchema={Yup.object(fields.reduce((acc, field) => {
                    if (field.fields) {
                        field.fields.forEach(f => {
                            acc[f.name] = Yup.number('Must be a number').required('Required');
                        });
                    } else {
                        acc[field.name] = Yup.number('Must be a number').required('Required');
                    }
                    return acc;
                }, {}))}
                fields={fields}

                onSubmit={onSubmit}
                onChanges={(values) => console.log(values)}
                noSubmit
            />
        </div>
    );
}




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
                    <FormValues
                        value={current}
                        onSubmit={(values) => {
                            onSubmit(values);
                            setVisible(false);
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
    )
}
