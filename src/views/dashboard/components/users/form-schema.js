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
        name: 'password',
        label: 'Password',
        type: 'password',
    },
    {
        name: 'confirm_password',
        label: 'Confirm Password',
        type: 'password',
    },
    {
        name: 'role',
        label: 'Role*',
        as: 'smart-select',
        initialValue: 'division',
        options: [
            { value: 'user', label: 'User' },
            { value: 'admin', label: 'Admin' },
            { value: 'super-admin', label: 'Super Admin' },
        ],
    },
]

export const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirm_password: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
    role: Yup.string().required('Role is required'),
});

export const initialValues = fields.reduce((acc, field) => {
    acc[field.name] = field?.initialValue || '';
    return acc;
}, {});