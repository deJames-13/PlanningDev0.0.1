import * as yup from 'yup'

export const fields = [
    {
        name: 'name',
        label: 'Name',
        type: 'text',
        placeholder: 'Enter department name',
        required: true,
    },
    {
        name: 'full_name',
        label: 'Full Name',
        type: 'text',
        placeholder: 'Enter full department name',
    },
    {
        name: 'type',
        label: 'Type',
        type: 'select',
        options: [
            { label: 'Division', value: 'division' },
            { label: 'Department', value: 'department' },
        ],
        placeholder: 'Select department type',
        defaultValue: 'division',
    },
    {
        name: 'index',
        label: 'Display Order',
        type: 'number',
        placeholder: 'Enter display order (lower numbers appear first)',
        defaultValue: 0,
    },
    {
        name: 'related_to',
        label: 'Parent Department',
        type: 'resource-select',
        resource: 'departments',
        labelField: 'name',
        valueField: 'id',
        placeholder: 'Select parent department (optional)',
        isClearable: true,
    }
]

export const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    full_name: yup.string(),
    type: yup.string().oneOf(['division', 'department']).required(),
    index: yup.number().default(0),
    related_to: yup.number().nullable(),
})

export const initialValues = fields.reduce((acc, field) => {
    acc[field.name] = field?.initialValue || '';
    return acc;
}, {});