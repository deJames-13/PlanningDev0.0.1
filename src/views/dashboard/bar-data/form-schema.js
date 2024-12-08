import * as Yup from 'yup';

export const fields = [
    {
        name: 'title',
        label: 'Title',
        placeholder: 'Provide a title for the bar data',
    },
    {
        name: 'description',
        label: 'Description',
        as: 'textarea',
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