import { ErrorMessage, Field } from 'formik';
import React from 'react';
import FormikDatePicker from './date-picker';
import InputGroup from './input-group';
import FormikSelect from './select';
import SmartSelect from './smart-select';

const FieldWrapper = ({ field = {} }) => {
    let FieldComponent;
    let { options = [], as = 'divider', initialValue = {}, ...props } = field;
    switch (field.as) {
        case 'divider':
            return <hr />;
        case 'group':
            FieldComponent = <InputGroup field={field} />
            break;
        case 'title':
            FieldComponent = <span className='text-uppercase fw-bold fs-6' {...props}>{field.label}</span>;
            break;
        case 'select':
            FieldComponent = <FormikSelect options={options} {...props} />;
            break;
        case 'smart-select':
            FieldComponent = <SmartSelect options={options} initialValue={initialValue} {...props} />;
            break;
        case 'date':
            FieldComponent = <FormikDatePicker {...props} />;
            break;
        case 'month':
            FieldComponent = <FormikDatePicker {...props} dateFormat="month" />;
            break;
        case 'year':
            FieldComponent = <FormikDatePicker {...props} dateFormat="year" />;
            break;
        case 'textarea':
            FieldComponent = (
                <Field
                    as="textarea"
                    name={field.name}
                    id={field.name}
                    className="form-control"
                    {...props}
                />
            );
            break;
        default:
            FieldComponent = (
                <Field
                    type={field.type}
                    name={field.name}
                    id={field.name}
                    className="form-control"
                    {...props}
                />
            );
            break;
    }
    return <>
        <div key={field?.name} className="mb-3">
            <label htmlFor={field?.name} className="form-label">{field?.label}</label>
            {FieldComponent}
            <ErrorMessage name={field?.name} component="div" className="text-danger fst-italic" style={{
                fontSize: '0.9rem',
            }} />
        </div>

    </>;
};

export default FieldWrapper;