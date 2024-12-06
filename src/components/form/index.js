import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import FieldWrapper from './field';



const FormikForm = ({ initialValues, validationSchema, onSubmit, fields }) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    {fields.map((field) => {

                        return (
                            <div key={field.name} className="mb-3">
                                <label htmlFor={field.name} className="form-label">{field.label}</label>
                                {<FieldWrapper field={field} />}
                                <ErrorMessage name={field.name} component="div" className="text-danger" />
                            </div>
                        );
                    })}
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default FormikForm;