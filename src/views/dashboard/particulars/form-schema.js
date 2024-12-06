import * as Yup from 'yup';

export const fields = [
    {
        name: 'title',
        label: 'Title',
        initialValue: '',
    },
    {
        name: 'description',
        label: 'Description',
        initialValue: '',
        as: 'textarea',
    },
    {
        name: 'type',
        label: 'Type',
        initialValue: '',
    },
    {
        name: 'bar_data_id',
        label: 'From Report: ',
        placeHolder: 'Select which report to include',
        as: 'select',
        options: [],
    },
]

export const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    type: Yup.string().required('Required'),
});

export const initialValues = fields.reduce((acc, field) => {
    acc[field.name] = field?.initialValue || '';
    return acc;
}, {});