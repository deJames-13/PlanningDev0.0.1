import * as Yup from 'yup';

// 'title' => 'required|string',
// 'description' => 'nullable|string',
// 'current_year' => 'required|integer',
// 'current_quarter' => 'nullable|integer',
// 'sector_id' => 'nullable|integer|exists:sectors,id',

export const fields = [
    {
        name: 'title',
        label: 'Title',
    },
    {
        name: 'description',
        label: 'Description',
        as: 'textarea',
    },
    {
        name: 'current_year',
        label: 'Current Year',
    },
    {
        name: 'current_quarter',
        label: 'Current Quarter',
        type: 'number',
        maxLength: 4,
    },
    {
        name: 'sector_id',
        label: 'Sector',
        placeHolder: 'Select Sector',
        as: 'smart-select',
        options: []
    },
]

export const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    description: Yup.string(),
    current_year: Yup.number().required('Required'),
    current_quarter: Yup.number('Input a valid number. (1-4)').min(1, 'Input a valid number. (1-4)').max(4, 'Input a valid number. (1-4)'),
    sector_id: Yup.number('Select a valid sector'),
});

export const initialValues = fields.reduce((acc, field) => {
    acc[field.name] = field?.initialValue || '';
    return acc;
}, {});