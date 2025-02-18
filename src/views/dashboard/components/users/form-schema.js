import * as Yup from 'yup';

export const fields = [
    {
        name: 'username',
        label: 'Username*',
        initialValue: '',
        required: true,
    },
    {
        name: 'email',
        label: 'Email',
    },
    {
        name: 'role',
        label: 'Role*',
        as: 'smart-select',
        initialValue: 'user',
        noNoneOption: true,
        options: [
            { value: 'user', label: 'User' },
            { value: 'admin', label: 'Admin' },
            { value: 'super-admin', label: 'Super Admin' },
        ],
    },
    {
        name: 'password',
        label: 'Password',
        as: 'password',
    },
    {
        name: 'password_confirmation',
        label: 'Confirm Password',
        as: 'password',
    },
]

export const validationSchema = Yup.object({
    username: Yup.string().required('Username is required').min(6, 'Username must be at least 6 characters').max(255, 'Username must be at most 20 characters'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
    role: Yup.string().required('Role is required'),
});

export const initialValues = fields.reduce((acc, field) => {
    acc[field.name] = field?.initialValue || '';
    return acc;
}, {});