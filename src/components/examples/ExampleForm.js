import React from 'react';
import FormikForm from 'src/components/form';
import * as Yup from 'yup';

const CustomSelectComponent = ({ field, form, ...props }) => {
    return (
        <select {...field} {...props}>
            <option value="admin">Admin</option>
            <option value="user">User</option>
        </select>
    );
}

const ExampleForm = () => {
    const initialValues = {
        name: '',
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });

    const onSubmit = (values, { setSubmitting }) => {
        console.log('Form data', values);
        setSubmitting(false);
    };

    const fields = [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'email', label: 'Email', type: 'email' },
        {
            name: 'roles', label: 'Role',
            as: 'select',
            options: [
                { value: 'admin', label: 'Admin' },
                { value: 'user', label: 'User' },
            ],
        },
        { name: 'password', label: 'Password', type: 'password' },
    ];

    return (
        <div className="container">
            <h1>Reusable Formik Form</h1>
            <FormikForm
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                fields={fields}
            />
        </div>
    );
};

export default ExampleForm;