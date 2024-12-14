import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CRow,
    CSpinner
} from '@coreui/react'

import { useParams } from 'react-router-dom'
import ResourceForm from '../ResourceForm'

import * as Yup from 'yup';

import * as formSchema from './form-schema'
import { useState } from 'react'
// CONSTANTS
// ###################################################################
const RESOURCE = 'users'
const TITLE = 'User Form'
const SUBTITLE = 'Fill out necessary input for the user information'
// ###################################################################
export default function UserForm() {
    const { id = null } = useParams()

    const [data, setData] = useState(null)

    const handleChanges = (values, errors) => {
        console.log('values', values)
        setData({
            ...data,
            ...values,
        })
    }



    return (
        <CRow
            className='gap-4 gap-md-0'
            style={{
                height: '100vh',
                overflow: 'auto',
                marginBottom: '1rem'
            }}>
            <CCol lg={12} style={{
                height: '100%',
                overflow: 'auto',
                position: 'sticky',
                top: 0,
            }}>
                <ResourceForm
                    id={id}
                    resource={RESOURCE}
                    subtitle={SUBTITLE}
                    title={TITLE}
                    form={{
                        ...formSchema,
                        fields: formSchema.fields.map(field => {
                            if (field.name === 'password') {
                                return {
                                    ...field,
                                    label: id ? 'New Password' : 'Password',
                                    type: 'password',
                                }
                            }
                            if (field.name === 'role') {
                                field.options = [
                                    { value: 'user', label: 'User' },
                                    { value: 'admin', label: 'Admin' },
                                    { value: 'super-admin', label: 'Super Admin' },
                                ]
                                field.initialValue = data?.role || 'user'
                            }
                            return field
                        }),
                        validationSchema: id ? Yup.object({
                            username: Yup.string().required('Username is required').min(6, 'Username must be at least 6 characters').max(255, 'Username must be at most 20 characters'),
                            email: Yup.string().email('Invalid email').required('Email is required'),
                            role: Yup.string().required('Role is required'),
                        }) : formSchema.validationSchema
                    }}
                    onChanges={handleChanges}
                >
                </ResourceForm>
            </CCol>
        </CRow>

    )
}
