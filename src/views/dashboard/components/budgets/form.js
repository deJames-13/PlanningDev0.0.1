import { cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
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

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useResourceOptions from '../../hooks/useResourceOptions'
import ResourceForm from '../ResourceForm'
import AnnualModal from './annual-modal'
import AnnualTable from './annual-table'
import ChartPreview from './chart-preview'
import * as formSchema from './form-schema'
import { useSelector } from 'react-redux'


// CONSTANTS
// ###################################################################
const RESOURCE = 'budgets'
const TITLE = 'Budget Data Form'
const SUBTITLE = 'Fill out necessary input for the budgets data'
// ###################################################################
export default function BudgetForm() {
    const { roles } = useSelector(state => state.auth);
    const isAdmin = roles.includes('admin') || roles.includes('super-admin');


    const { id = null } = useParams()
    const { options, loading } = useResourceOptions({ resourceName: 'sectors' })

    const [data, setData] = useState({})
    const [annual, setAnnual] = useState([])
    const [current, setCurrent] = useState(null)

    const saveAnnual = (annual) => {
        const newAnnual = (data?.annual || []).filter(a => a.id !== annual.id || a.year !== annual.year)
        newAnnual.push({
            ...annual,
            id: annual?.id ? annual?.id : newAnnual.length + 1
        });
        newAnnual.reverse();
        const newData = {
            ...data,
            annual: newAnnual
        }
        setData(newData)
    }

    const removeAnnual = (annual) => {
        const newAnnual = (data?.annual || []).filter(a => a.id !== annual.id)
        newAnnual.reverse();
        const newData = {
            ...data,
            annual: newAnnual
        }
        setData(newData)
    }

    const handleChanges = (values) => {
        if (values == null) {
            setData(null)
            setCurrent(null)
            return
        }
        setData(prev => ({
            ...prev,
            ...values,
        }))
    }

    useEffect(() => {
        setAnnual(data?.annual || [])
    }, [data])

    return (
        <CRow
            className='gap-4 gap-md-0'
            style={{
                height: '100vh',
                overflow: 'auto',
                marginBottom: '1rem'
            }}>
            <CCol lg={5}>
                <ResourceForm
                    id={id}
                    formData={data}
                    resource={RESOURCE}
                    subtitle={SUBTITLE}
                    title={TITLE}
                    form={{
                        ...formSchema,
                        fields: formSchema.fields.map(field => {
                            if (field.name === 'status') {
                                return isAdmin ? field : null;
                            }
                            if (field.name === 'sector_id') {
                                return {
                                    ...field,
                                    options: options?.length > 0 ? options : [],
                                    loading: loading,
                                    customNoneLabel: 'Campus Wide',
                                }
                            }
                            return field
                        }),
                    }}

                    onChanges={handleChanges}
                >
                </ResourceForm>
            </CCol>

            <CCol lg={7} className='gap-4 d-flex flex-column' style={{
                overflowY: 'auto',
                overflowX: 'hidden'
            }}>
                <CCard>
                    <CCardHeader>
                        <h4>Chart Preview</h4>
                    </CCardHeader>
                    <CCardBody className='p-0 px-lg-4'>
                        <ChartPreview values={data?.annual} />
                    </CCardBody>
                </CCard>

                <CCard>
                    <CCardHeader>
                        <div className="d-flex items-align-center justify-content-between">
                            <h4>Annual Data</h4>
                            <AnnualModal
                                value={current}
                                open={current !== null}
                                onSubmit={saveAnnual}
                                onCancel={() => setCurrent(null)}
                            />
                        </div>
                    </CCardHeader>
                    <CCardBody className='px-4' style={{
                        overflowY: 'visible',
                    }}>
                        {
                            loading ?
                                <CSpinner />
                                : <AnnualTable
                                    values={annual}
                                    onEdit={setCurrent}
                                    onRemove={removeAnnual}
                                />
                        }
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>

    )
}
