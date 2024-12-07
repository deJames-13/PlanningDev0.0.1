import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import FieldWrapper from './field';

const FormikForm = ({
    initialValues = {},
    validationSchema,
    fields = [],
    onSubmit = () => { },
    onChanges = () => { },
    noSubmit,
    children,
}) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema || Yup.object({})}
            onSubmit={onSubmit}
        >
            {({ isSubmitting, values, errors }) => {
                useEffect(() => {
                    onChanges(values, errors);
                }, [values, errors]);

                return (
                    <Form style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%'
                    }}>
                        {fields.map((field) => !field?.custom && (
                            <div key={field.name} className="mb-3">
                                <label htmlFor={field.name} className="form-label">{field.label}</label>
                                <FieldWrapper field={field} />
                                <ErrorMessage name={field.name} component="div" className="text-danger" />
                            </div>
                        ))}

                        {children}

                        {
                            !noSubmit && (
                                <div>
                                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                        Submit
                                    </button>
                                </div>
                            )
                        }
                    </Form>
                );
            }}
        </Formik>
    );
};

export default FormikForm;