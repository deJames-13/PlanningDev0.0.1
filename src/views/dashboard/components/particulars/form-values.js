import { cilPlus } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import { useCallback, useEffect, useState } from 'react';
import FormikForm from 'src/components/form';
import * as Yup from 'yup';
const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

const totalAccomplishment = (quarters) => quarters.reduce((acc, quarter) => acc + (parseFloat(quarter.accomplishment) || 0), 0);
const totalTarget = (quarters) => quarters.reduce((acc, quarter) => acc + (parseFloat(quarter.target) || 0), 0);
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
            initialValue: value?.year || new Date().getFullYear(),
        },
        {
            name: 'total',
            label: <span className='text-uppercase'><strong>Total</strong></span>,
            as: 'group',
            fields: [
                {
                    name: 'accomplishment',
                    label: 'Accomplishment',
                    initialValue: parseFloat(data?.accomplishment) || 0,
                    disabled: true,
                    colSpan: 4,
                },
                {
                    name: 'target',
                    label: 'Target',
                    initialValue: data?.target || 0,
                    disabled: true,
                    colSpan: 4,
                },
                {
                    name: 'percentage',
                    label: 'Percentage',
                    initialValue: data?.percentage || 0,
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
                        name: `accomplishment_${i + 1}`,
                        initialValue: data?.quarters?.find(q => q.quarter == i + 1)?.accomplishment || 0,
                        colSpan: 4,
                    },
                    {
                        name: `target_${i + 1}`,
                        initialValue: data?.quarters?.find(q => q.quarter == i + 1)?.target || 0,
                        colSpan: 4,
                    },
                    {
                        name: `percentage_${i + 1}`,
                        initialValue: data?.quarters?.find(q => q.quarter == i + 1)?.percentage || 0,
                        colSpan: 4,
                        disabled: true,
                    }
                ]
            })),
    ]), [data]);

    const handleChanges = (formValues, errors) => {
        let newValue = {
            ...data,
            year: formValues.year,
            quarters: (data?.quarters?.length > 0 ? data?.quarters : quarters).map((q, i) => {
                if (typeof q != 'object') q = {}
                let target = parseFloat(formValues[`target_${i + 1}`] || 0) || 0;
                let accomplishment = parseFloat(formValues[`accomplishment_${i + 1}`]) || 0;
                let percentage = parseFloat(((accomplishment / target) * 100) || 0).toFixed(2) || 0;
                if (percentage === 'Infinity') percentage = 0;


                return {
                    ...q,
                    accomplishment,
                    target,
                    percentage,
                    quarter: q?.quarter || i + 1,
                }
            }),
        }
        newValue.accomplishment = totalAccomplishment(newValue.quarters);
        newValue.target = totalTarget(newValue.quarters);
        newValue.percentage = parseFloat(((newValue.accomplishment / newValue.target) * 100) || 0).toFixed(2) || 0;
        if (newValue.percentage === 'Infinity') newValue.percentage = 0;
        setData(newValue);
        setFields(makeFields(newValue));
        onChanges(newValue, errors);
    }

    useEffect(() => {
        setFields(makeFields(value));
        setData(value);
    }, [value]);


    return fields?.length > 0 && (
        <FormikForm
            fields={fields}
            initialValues={fields.reduce((acc, field) => {
                if (field.fields) {
                    field.fields.forEach(f => {
                        acc[f.name] = f.initialValue || 0;
                    });
                } else {
                    acc[field.name] = field.initialValue || 0;
                }
                return acc;
            }, {})}
            validationSchema={Yup.object(fields.reduce((acc, field) => {
                if (field.fields) {
                    field.fields.forEach(f => {
                        acc[f.name] = Yup.number('Must be a number');
                    });
                } else {
                    acc[field.name] = Yup.number('Must be a number').required('Required');
                }
                return acc;
            }, {}))}
            onChanges={handleChanges}
            noSubmit
        />
    );
}

export default function FormValuesModal({
    label = 'Add',
    value = {},
    open = false,
    onSubmit = () => { },
    onCancel = () => { },

}) {
    const [visible, setVisible] = useState(open);
    const [current, setCurrent] = useState(value);
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
            <CButton color="primary" onClick={() => setVisible(true)} className='d-flex align-items-center'>
                <CIcon icon={cilPlus} />
                <span className='d-none d-lg-block'>{label}</span>
            </CButton>
            <CModal
                size='lg'
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