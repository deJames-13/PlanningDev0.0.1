import { Field } from 'formik';
import { useState } from 'react';


const FormikSelect = ({ options, field }) => {
    const { placeHolder = '', ...props } = field;
    const [value, setValue] = useState(field?.value || '');

    return (
        <Field as="select" className="form-select" value={props?.value || ''} {...props}>
            {
                !value &&
                <option value="" disabled>{placeHolder || 'Select an option'}</option>
            }
            {options.map((option) => (
                <option
                    onClick={() => setValue(option.value)}
                    key={option.value}
                    defaultValue={option.value}
                    selected={field.value == option.value}
                >
                    {option.label}
                </option>
            ))}
        </Field>
    );
};

export default FormikSelect;