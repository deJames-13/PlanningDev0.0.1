import { Field } from 'formik';
import React from 'react';
import FormikSelect from './select';

const FieldWrapper = ({ field }) => {
    let FieldComponent;
    switch (field.as) {
        case 'select':
            let { options, ...props } = field;
            FieldComponent = <FormikSelect field={props} options={options} />;
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