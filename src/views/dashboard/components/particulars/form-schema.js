import * as Yup from 'yup';

export const fields = [
    {
        name: 'title',
        label: 'Title*',
    },
    {
        name: 'description',
        label: 'Description',
        placeholder: 'Enter a description or interpretation of the data',
        as: 'textarea',
    },
    {
        name: 'type',
        label: <>Type <span className='fw-light fst-italic text-lowercase'>(output|outcome|any)*</span></>,
    },
    {
        name: 'bar_data_id',
        label: 'From Report: *',
        placeholder: 'Select which report to include',
        as: 'smart-select',
        options: [],
    },
]

export const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    // description: Yup.string(),
    type: Yup.string().required('Required'),
});

export const initialValues = fields.reduce((acc, field) => {
    acc[field.name] = field?.initialValue || '';
    return acc;
}, {});