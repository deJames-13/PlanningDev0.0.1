import * as Yup from 'yup';

export const fields = [
    {
        name: 'name',
        label: 'Name',
        initialValue: '',
        placeholder: 'Name',
        type: 'text',
    },
    {
        name: 'short_name',
        label: 'Short Name',
        initialValue: '',
        placeholder: 'Short Name',
        type: 'text',
    },
    {
        name: 'full_name',
        label: 'Full Name',
        initialValue: '',
        placeholder: 'Full Name',
        type: 'text',
    },
    {
        name: 'description',
        label: 'Description',
        as: 'textarea',
        initialValue: '',
        placeholder: 'Description',
        type: 'text',
    },
    {
        name: 'department_id',
        label: 'Department',
        placeHolder: 'Select Department',
        as: 'select',
        options: [],
        initialValue: '',
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