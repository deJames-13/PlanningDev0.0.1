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


// CONSTANTS
// ###################################################################
const RESOURCE = 'budgets'
const TITLE = 'Budget Data Form'
const SUBTITLE = 'Fill out necessary input for the report'
// ###################################################################
export default function BudgetForm() {
    const { id = null } = useParams()
    const { options, loading } = useResourceOptions({ resourceName: 'sectors' })

    const [data, setData] = useState({})
    const [annual, setAnnual] = useState([])
    const [current, setCurrent] = useState(null)

    const saveAnnual = (annual) => {
        const newAnnual = (data?.annual || []).filter(a => a.id !== annual.id || a.year !== annual.year)
        newAnnual.push({
            ...annual,
            id: annual?.id ? annual?.id : filterAnnual.length + 1
        });
        const newData = {
            ...data,
            annual: newAnnual
        }
        newAnnual.reverse();
        setData(newData)
    }
    const removeAnnual = (annual) => {
        console.log(annual)
    }

    const handleChanges = (values) => {
        setData(prev => ({
            ...prev,
            ...values,
        }))
    }


    useEffect(() => {
        if (data?.annual) setAnnual(data.annual)
    }, [data])


    return (
        <CRow
            className='gap-4 gap-md-0'
            style={{
                height: '80vh',
                overflow: 'auto',
                marginBottom: '1rem'
            }}>
            <CCol lg={5}>
                <ResourceForm
                    id={id}
                    resource={RESOURCE}
                    subtitle={SUBTITLE}
                    title={TITLE}
                    form={{
                        ...formSchema,
                        fields: formSchema.fields.map(field => {
                            if (field.name === 'sector_id') {
                                return {
                                    ...field,
                                    options: options ?? [],
                                    loading: loading,
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
                    <CCardBody className='px-4'>
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
