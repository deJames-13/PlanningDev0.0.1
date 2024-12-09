import { cilPen, cilPlus } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';

import { useCallback, useEffect, useState } from 'react';
import FormikForm from 'src/components/form';
import * as Yup from 'yup';
const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

export function FormValues({
    onSubmit = () => { },
    onChanges = () => { },
    value = {},
}) {
    const [data, setData] = useState(value);
    const [fields, setFields] = useState([]);
    const makeFields = useCallback((data) => {
        let quarters = data?.quarters || [];
        return [
            {
                as: 'group',
                name: 'total',
                label: <span className='text-uppercase'><strong>Total</strong></span>,
                fields: [
                    {
                        name: 'target',
                        label: 'Target',
                        initialValue: data?.total?.target || 0,
                        disabled: true,
                        colSpan: 4,
                    },
                    {
                        name: 'accomplishment',
                        label: 'Accomplishment',
                        initialValue: data?.total?.accomplishment || 0,
                        disabled: true,
                        colSpan: 4,
                    },
                    {
                        name: 'percentage',
                        label: '(%)',
                        initialValue: data?.total?.percentage || 0,
                        disabled: true,
                        colSpan: 4,
                    },
                ]
            },
            ...quarters.map((q, i) => (
                {
                    name: `quarter_${i + 1}`,
                    label: <strong>Quarter {i + 1}</strong>,
                    as: 'group',
                    fields: [
                        {
                            name: `target_${i + 1}`,
                            initialValue: quarters.find(q => q.quarter === i + 1)?.target || 0,
                            colSpan: 4,
                        },
                        {
                            name: `accomplishment_${i + 1}`,
                            initialValue: quarters.find(q => q.quarter === i + 1)?.accomplishment || 0,
                            colSpan: 4,
                        },
                        {
                            name: `percentage_${i + 1}`,
                            colSpan: 4,
                            initialValue: parseFloat(quarters.find(q => q.quarter === i + 1)?.accomplishment / quarters.find(q => q.quarter === i + 1)?.target * 100).toFixed(2) || 0,
                            disabled: true,
                        }
                    ]
                })),
        ]
    }, [data]);

    const handleChanges = (formValues, errors) => {
        let total = {};
        let newValues = {
            ...data,
            quarters: data.quarters.map((q, i) => {
                let target = parseFloat(formValues[`target_${i + 1}`]) || 0;
                let accomplishment = parseFloat(formValues[`accomplishment_${i + 1}`]) || 0;
                let percentage = parseFloat(accomplishment / target * 100).toFixed(2) || 0;
                total = {
                    target: (total.target || 0) + target,
                    accomplishment: (total.accomplishment || 0) + accomplishment,
                }
                return { ...q, target, accomplishment, percentage }
            })
        };
        total.percentage = parseFloat(total.accomplishment / total.target * 100).toFixed(2) || 0;
        newValues.total = total;
        setData(newValues)
        setFields(makeFields(newValues));
        onChanges(newValues, errors)
    }


    useEffect(() => {
        if (!value?.quarters) return;
        setFields(makeFields(value));
        setData(value);
    }, [value]);


    return fields?.length > 0 && (
        <FormikForm
            fields={fields}

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
                        acc[f.name] = Yup.number('Must be a number').positive('Must be a positive number');
                    });
                } else {
                    acc[field.name] = Yup.number('Must be a number').positive('Must be a positive number').required('Required');
                }
                return acc;
            }, {}))}

            onSubmit={onSubmit}
            onChanges={handleChanges}
            noSubmit
        />
    );
}


export default function QuarterliesModal({
    open,
    value = {},
    onSubmit = () => { },
    onCancel = () => { },
}) {
    const [visible, setVisible] = useState(open);
    const [current, setCurrent] = useState(value);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (value) {
            setCurrent(value);
        }
    }, [value]);

    return (
        <>
            <CButton color="primary" onClick={() => {
                setVisible(true);
            }} className='d-flex align-items-center'>
                <CIcon icon={cilPen} />
            </CButton>
            <CModal
                size='lg'
                backdrop="static"
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="objectiveQuarterlyModal"
                alignment="center"
                scrollable
            >
                <CModalHeader className='container-fluid'>
                    <CModalTitle id="objectiveQuarterlyModal">
                        <strong>Quarterlies Data</strong>
                    </CModalTitle>
                </CModalHeader>
                <CModalBody className='container-fluid mx-auto'>
                    <FormValues
                        value={current}
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
                    }}>
                        Save changes
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}
