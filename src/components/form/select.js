import { Field } from 'formik';
import { useState } from 'react';

const FormikSelect = ({ options, ...field }) => {
    const [value, setValue] = useState(field.value);
    const [placeHolder, setPlaceHolder] = useState(field.placeHolder);

    return (
        <Field as="select" className="form-select" {...field}>
            <option value="">{placeHolder}</option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </Field>
    );
};

export default FormikSelect;