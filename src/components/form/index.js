import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import FieldWrapper from './field';

const FormikForm = ({
    initialValues = {},
    fields = [],
    noSubmit,
    validationSchema,
    onSubmit = () => { },
    onChanges = () => { },
    children,
}) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema || Yup.object({})}
            onSubmit={onSubmit}
            enableReinitialize
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
                            <FieldWrapper key={field?.name} field={field} />
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