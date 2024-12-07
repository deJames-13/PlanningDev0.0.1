import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CSpinner,
} from '@coreui/react'
import FormikForm from 'src/components/form'

import React from 'react'
import useResource from '../hooks/useResource'
export default function ResourceForm({
    resource,
    title,
    subtitle,
    form,
    watchChanges,
    noSubmit,
    onSubmit,
    children
}) {
    const {
        names: { capitalizeName },
        states: { data, table, setTable, tableState, nextTableState },
        actions: { fetchDatas },
        navigate,
        events,
    } = useResource(resource)

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
                    initialValues={form.initialValues}
                    validationSchema={form.validationSchema}
                    fields={form.fields}
                    onSubmit={() => { }}
                    onChanges={watchChanges}
                    noSubmit={noSubmit}
                >
                    {children}
                </FormikForm>
            </CCardBody>

        </CCard>
    )
}
