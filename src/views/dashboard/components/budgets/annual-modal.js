import { cilPlus } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import { useCallback, useEffect, useState } from 'react';
import FormikForm from 'src/components/form';
import * as Yup from 'yup';

const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

const totalAllotment = (quarters) => quarters.reduce((acc, quarter) => acc + (parseFloat(quarter.allotment) || 0), 0);
const totalObligated = (quarters) => quarters.reduce((acc, quarter) => acc + (parseFloat(quarter.obligated) || 0), 0);

export function FormValues({
    onChanges = () => { },
    value = {},
}) {
    const [data, setData] = useState(value);
    const [fields, setFields] = useState([]);
    const makeFields = useCallback((data) => ([
        {
            name: 'year',
            label: 'Year',
            initialValue: data?.year || '',
        },
        {
            name: 'total',
            label: <span className='text-uppercase'><strong>Total</strong></span>,
            as: 'group',
            fields: [
                {
                    name: 'allotment',
                    label: 'Allotment',
                    initialValue: data?.allotment || '',
                    disabled: true,
                    colSpan: 4,
                },
                {
                    name: 'obligated',
                    label: 'Obligated',
                    initialValue: data?.obligated || '',
                    disabled: true,
                    colSpan: 4,
                },
                {
                    name: 'rate',
                    label: 'Utilization Rate',
                    initialValue: data?.utilization_rate || '',
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
                        name: `allotment_${i + 1}`,
                        // label: 'Allotment',
                        initialValue: data?.quarters.find(q => q.quarter == i + 1)?.allotment || '',
                        colSpan: 4,
                    },
                    {
                        name: `obligated_${i + 1}`,
                        // label: 'Obligated',
                        initialValue: data?.quarters.find(q => q.quarter == i + 1)?.obligated || '',
                        colSpan: 4,
                    },
                    {
                        name: `utilization_rate_${i + 1}`,
                        // label: 'Utilization Rate (%)',
                        initialValue: data?.quarters.find(q => q.quarter == i + 1)?.utilization_rate || '',
                        colSpan: 4,
                        disabled: true,
                    }
                ]
            })),
    ]), [data])


    const handleChanges = (formValues, errors) => {
        let newValue = {
            ...data,
            year: formValues.year,
            quarters: data?.quarters.map((q, i) => {
                let allotment = parseFloat(formValues[`allotment_${i + 1}`]) || 0;
                let obligated = parseFloat(formValues[`obligated_${i + 1}`]) || 0;
                let utilization_rate = parseFloat((obligated / allotment) * 100).toFixed(2) || 0;
                return { ...q, allotment, obligated, utilization_rate }
            }),
        }
        newValue.allotment = totalAllotment(newValue.quarters);
        newValue.obligated = totalObligated(newValue.quarters);
        newValue.utilization_rate = parseFloat((newValue.obligated / newValue.allotment) * 100).toFixed(2) || 0;
        setData(newValue);
        setFields(makeFields(newValue));
        onChanges(newValue, errors);
    }

    useEffect(() => {
        if (!value?.quarters) return;
        setFields(makeFields(value));
        setData(value);
    }, [value]);

    return fields?.length > 0 && (
        <div className="pb-5">
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

                onChanges={handleChanges}
                noSubmit
            />
        </div>
    );
}

export default function AnnualModal({
    open,
    value = {},
    onSubmit = () => { },
    onCancel = () => { },
}) {
    const [visible, setVisible] = useState(open);
    const [current, setCurrent] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (value) {
            setCurrent(value);
            setVisible(true);
        }
    }, [value]);


    useEffect(() => {
        if (!visible) {
            onCancel()
        }
    }, [visible])

    return (
        <>
            <CButton color="primary" onClick={() => {
                setCurrent(null);
                setVisible(true);
            }} className='d-flex align-items-center'>
                <CIcon icon={cilPlus} />
            </CButton>
            <CModal
                size='lg'
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
