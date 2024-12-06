import * as Yup from 'yup';

export const fields = [
    {
        name: 'title',
        label: 'Title',
        initialValue: '',
        placeholder: 'Provide a title for the bar data',
        required: true,
    },
    {
        name: 'description',
        label: 'Description',
        as: 'textarea',
        initialValue: '',
        placeholder: 'Proivde a description for the bar data',
    },
]

export const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string(),
});

export const initialValues = fields.reduce((acc, field) => {
    acc[field.name] = field?.initialValue || '';
    return acc;
}, {});