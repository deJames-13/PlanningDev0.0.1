import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CSpinner,
} from '@coreui/react'
import FormikForm from 'src/components/form'

import { useCallback, useEffect, useState } from 'react'
import useResource from '../hooks/useResource'


export default function ResourceForm({
    id,
    form,
    formData,
    resource,
    title,
    subtitle,
    noSubmit,
    onChanges = () => { },
    onSubmit = () => { },
    children
}) {
    const {
        names: { capitalizeName },
        states: { current },
        actions: { fetchData, doStore, doUpdate, doDestroy },
    } = useResource(resource)

    const handleSubmit = useCallback((values) => {
        alert(JSON.stringify(values, null, 2))
        const payload = {
            id,
            ...formData,
            ...values,
            action: id ? 'update' : 'store'
        };
        if (id)
            return doUpdate(id, payload)
        else
            return doStore(payload)

    }, [formData]);


    useEffect(() => {
        if (id) fetchData(id)
    }, [id])

    useEffect(() => {
        if (current?.data)
            onChanges(current.data)
    }, [current])


    return (
        <CCard style={{
            height: '100%',
            width: '100%'
        }}>
            <CCardHeader>
                <h4>
                    {title || `${capitalizeName(resource)} Form`}
                </h4>
                <p>
                    {subtitle}
                </p>
            </CCardHeader>
            <CCardBody>
                <FormikForm
                    initialValues={current?.data ? form.fields.reduce((acc, field) => {
                        acc[field.name] = current.data[field.name]
                        return acc
                    }, {}) : form.initialValues}

                    validationSchema={form.validationSchema}
                    fields={form.fields}
                    onSubmit={handleSubmit}
                    onChanges={onChanges}
                    noSubmit={noSubmit}
                >
                    {children}
                </FormikForm>
            </CCardBody>

        </CCard>
    )
}
