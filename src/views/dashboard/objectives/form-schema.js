import * as Yup from 'yup';

export const fields = [
    {
        name: 'title',
        label: 'Title',
        initialValue: '',
        required: true,
    },
    {
        name: 'description',
        label: 'Description',
        as: 'textarea',
        initialValue: '',
        required: false,
    },
    {
        name: 'sector_id',
        label: 'Sector',
        placeHolder: 'Select a sector',
        as: 'select',
        options: [],
        initialValue: '',
        required: false,
    },
]

export const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    description: Yup.string(),
    sector_id: Yup.number('Select a valid sector'),
});

export const initialValues = fields.reduce((acc, field) => {
    acc[field.name] = field?.initialValue || '';
    return acc;
}, {});