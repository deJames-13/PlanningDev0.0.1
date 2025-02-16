import * as Yup from 'yup';

// 'title' => 'required|string',
// 'description' => 'nullable|string',
// 'current_year' => 'required|integer',
// 'current_quarter' => 'nullable|integer',
// 'sector_id' => 'nullable|integer|exists:sectors,id',

export const fields = [
    {
        name: 'title',
        label: 'Title*',
    },
    {
        name: 'description',
        label: 'Description',
        as: 'textarea',
        value: " ",
    },
    {
        name: 'current_year',
        label: 'Current Year*',
        type: 'number',
        initialValue: new Date().getFullYear(),
        max: new Date().getFullYear() + 1,
    },
    {
        name: 'current_quarter',
        label: 'Current Quarter*',
        type: 'number',
        initialValue: 1,
        min: 1,
        max: 4,
    },
    {
        name: 'sector_id',
        label: 'Sector',
        placeholder: 'Select Sector*',
        as: 'smart-select',
        options: []
    },
    {
        name: 'status',
        label: 'Status',
        placeholder: 'Select Status*',
        as: 'smart-select',
        options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Publish', value: 'published' },
        ]
    },
]

export const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    current_year: Yup.number().required('Required'),
    current_quarter: Yup.number('Input a valid number. (1-4)').min(1, 'Input a valid number. (1-4)').max(4, 'Input a valid number. (1-4)'),
});

export const initialValues = fields.reduce((acc, field) => {
    acc[field.name] = field?.initialValue || '';
    return acc;
}, {});