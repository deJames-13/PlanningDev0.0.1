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
import { initialValues } from './budgets/form-schema'


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
    style,
    children
}) {
    const {
        names: { capitalizeName },
        states: { current, setCurrent },
        actions: { fetchData, doStore, doUpdate, doDestroy },
    } = useResource(resource)

    const handleSubmit = useCallback((values) => {

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
        if (!id) {
            onChanges(null)
            setCurrent(null)
        }
    }, [id])

    useEffect(() => {
        if (current?.data)
            onChanges(current.data)
    }, [current])


    return (
        <CCard style={{
            height: '100%',
            width: '100%',
            overflow: 'auto',
            top: 0,
            ...style

        }}>
            <CCardHeader>
                <h4>
                    {title || `${capitalizeName(resource)} Form`}
                </h4>
                <p className='text-secondary'>
                    {subtitle}
                </p>
            </CCardHeader>
            <CCardBody>
                <FormikForm
                    initialValues={current?.data ? form.fields.reduce((acc, field) => {
                        acc[field.name] = current.data[field.name]
                        return acc
                    }, {}) : form.initialValues}

                    fields={form.fields.map(field => {
                        if (field.name === 'sector_id') {
                            return {
                                ...field,
                                initialValue: current?.data?.sector_id,
                            }
                        }
                        return field
                    })}

                    validationSchema={form.validationSchema}

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
