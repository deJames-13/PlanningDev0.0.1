import { Field } from 'formik';
import React from 'react';
import FormikDatePicker from './date-picker';
import FormikSelect from './select';

const FieldWrapper = ({ field }) => {
    let FieldComponent;
    switch (field.as) {
        case 'select':
            let { options, as, ...props } = field;
            FieldComponent = <FormikSelect field={props} options={options} />;
            break;
        case 'date':
            FieldComponent = <FormikDatePicker field={field} />;
            break;
        case 'month':
            FieldComponent = <FormikDatePicker field={field} dateFormat="month" />;
            break;
        case 'year':
            FieldComponent = <FormikDatePicker field={field} dateFormat="year" />;
            break;

        case 'textarea':
            FieldComponent = (
                <Field
                    as="textarea"
                    name={field.name}
                    id={field.name}
                    className="form-control"
                    {...field.props}
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
                    {...field.props}
                />
            );
            break;
    }
    return (
        <>
            {FieldComponent}
        </>
    );
};

export default FieldWrapper;