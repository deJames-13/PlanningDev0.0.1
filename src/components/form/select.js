import { Field } from 'formik';

const FormikSelect = ({ options, ...field }) => {
    return (
        <Field as="select" className="form-select" {...field}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </Field>
    );
};

export default FormikSelect;