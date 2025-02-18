import { ErrorMessage, Field } from 'formik';
import React from 'react';
import FormikDatePicker from './date-picker';
import InputGroup from './input-group';
import FormikSelect from './select';
import SmartSelect from './smart-select';

const PasswordField = ({ field }) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="input-group">
            <Field
                type={showPassword ? "text" : "password"}
                name={field.name}
                id={field.name}
                className="form-control"
            />
            <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={togglePasswordVisibility}
            >
                {showPassword ? "Hide" : "Show"}
            </button>
        </div>
    );
};

const FieldWrapper = ({ field = {} }) => {
    if (!field) return null;
    let FieldComponent;
    let {
        options = [],
        as = 'divider',
        initialValue = " ",
        customNoneLabel = null,
        ...props } = field;
    switch (field.as) {
        case 'password':
            FieldComponent = <PasswordField field={field} />;
            break;
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
            FieldComponent = <SmartSelect isField options={options} initialValue={initialValue} customNoneLabel={customNoneLabel}  {...props} />;
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
            let { value = '', ...rest } = props;
            FieldComponent = (
                <Field
                    as="textarea"
                    name={field.name}
                    id={field.name}
                    className="form-control"
                    {...rest}
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
            <label htmlFor={field?.name} className="form-label fw-6 text-uppercase fw-bold text-muted" style={{
                fontSize: '0.8rem',
            }}>{field?.label}</label>
            {FieldComponent}
            <ErrorMessage name={field?.name} component="div" className="text-danger fst-italic" style={{
                fontSize: '0.9rem',
            }} />
        </div>

    </>;
};

export default FieldWrapper;