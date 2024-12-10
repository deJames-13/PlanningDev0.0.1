import * as Yup from 'yup';

export const fields = [
    {
        name: 'title',
        label: 'Title*',
        required: true,
    },
    {
        name: 'description',
        label: 'Description',
        initialValue: '',
        as: 'textarea',
        required: false,
    },
    {
        name: 'sector_id',
        label: 'Sector*',
        placeholder: 'Select a sector',
        as: 'smart-select',
        options: [],
        required: false,
    },
]

export const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    sector_id: Yup.number('Select a valid sector'),
});

export const initialValues = fields.reduce((acc, field) => {
    acc[field.name] = field?.initialValue || '';
    return acc;
}, {});