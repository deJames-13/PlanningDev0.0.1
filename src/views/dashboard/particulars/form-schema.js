import * as Yup from 'yup';

export const fields = [
]

export const validationSchema = Yup.object({
    //
});

export const initialValues = fields.reduce((acc, field) => {
    acc[field.name] = field?.initialValue || '';
    return acc;
}, {});