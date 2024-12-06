import * as Yup from 'yup';

export const fields = [
    {
        name: 'name',
        label: 'Name',
        initialValue: '',
        required: true,
    },
    {
        name: 'short_name',
        label: 'Short Name',
        initialValue: '',
    },
    {
        name: 'full_name',
        label: 'Full Name',
        initialValue: '',
    },
    {
        name: 'description',
        label: 'Description',
        as: 'textarea',
        initialValue: '',
    },
]

export const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    short_name: Yup.string(),
    full_name: Yup.string(),
    description: Yup.string(),
});

export const initialValues = fields.reduce((acc, field) => {
    acc[field.name] = field?.initialValue || '';
    return acc;
}, {});