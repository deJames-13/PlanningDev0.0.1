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
        states: { current, setCurrent, loading },
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

    }, [formData, id]);

    const handleChanges = useCallback((values, errors) => {
        onChanges({
            ...formData,
            ...values,
        }, errors)
    }, [formData])

    useEffect(() => {
        if (id)
            fetchData(id)
        else {
            handleChanges(null)
            setCurrent(null)
        }
    }, [id])

    useEffect(() => {
        if (current?.data)
            handleChanges(current.data)
    }, [current])


    return (
        <CCard style={{
            height: '100%',
            width: '100%',
            overflow: 'auto',
            top: 0,
            ...style

        }}>
            <CCardHeader className='d-flex justify-content-between items-align-center'>
                <div>
                    <h4>
                        {title || `${capitalizeName(resource)} Form`}
                    </h4>
                    <p className='text-secondary'>
                        {subtitle}
                    </p>
                    <span className="fst-italic fw-6 fw-italic text-muted" style={{
                        fontSize: '0.8rem'
                    }}>
                        * required fields
                    </span>
                </div>
                <div>
                    {loading && <CSpinner size="sm" />}
                </div>
            </CCardHeader>
            <CCardBody>
                <FormikForm
                    initialValues={current?.data ? form.fields.reduce((acc, field) => {
                        if (!field) return acc
                        acc[field.name] = current.data[field.name]
                        return acc
                    }, {}) : form.initialValues}

                    fields={form.fields.map(field => {
                        return field ? {
                            ...field,
                            initialValue: current?.data ? current.data[field.name] || " " : initialValues[field.name] || " ",
                        } : null
                    })}

                    validationSchema={form.validationSchema}

                    onSubmit={handleSubmit}
                    onChanges={handleChanges}
                    noSubmit={noSubmit}
                    submitLabel={id ? 'Update' : 'Save'}
                >
                    {children}
                </FormikForm>
            </CCardBody>

        </CCard>
    )
}
