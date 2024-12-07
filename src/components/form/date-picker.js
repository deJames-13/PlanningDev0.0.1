import { ErrorMessage, Field } from 'formik';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FormikDatePicker = ({ field, form, ...props }) => {
    const handleChange = (date) => {
        form.setFieldValue(field.name, date);
    };

    const getDateFormat = () => {
        switch (props.dateFormat) {
            case 'month':
                return 'MM/yyyy';
            case 'year':
                return 'yyyy';
            default:
                return 'MM/dd/yyyy';
        }
    };

    return (
        <div>
            <DatePicker
                {...field}
                {...props}
                selected={field.value}
                onChange={handleChange}
                dateFormat={getDateFormat()}
                showMonthYearPicker={props.dateFormat === 'month'}
                showYearPicker={props.dateFormat === 'year'}
                className="form-control"
            />
            <ErrorMessage name={field.name} component="div" className="error" />
        </div>
    );
};

export default FormikDatePicker;