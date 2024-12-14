import * as Yup from 'yup';

export const fields = [
    {
        name: 'name',
        label: 'Name*',
        placeholder: 'Name',
        type: 'text',
    },
    {
        name: 'full_name',
        label: 'Full Name',
        placeholder: 'Full Name',
        type: 'text',
    },
    {
        name: 'description',
        label: 'Description',
        as: 'textarea',
        placeholder: 'Description',
        initialValue: '',
    },
    {
        name: 'department_id',
        label: 'Department*',
        placeholder: 'Select Department',
        as: 'smart-select',
        options: [],
        required: false,
    },
]

export const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    short_name: Yup.string().nullable(),
    full_name: Yup.string().nullable(),
    description: Yup.string().nullable(),
    department_id: Yup.number().nullable(),
});

export const initialValues = fields.reduce((acc, field) => {
    acc[field.name] = field?.initialValue || '';
    return acc;
}, {});