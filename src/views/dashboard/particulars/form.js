import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
} from '@coreui/react'

import { useState } from 'react'
import ResourceForm from '../components/ResourceForm'
import { ValuesCard } from './card'
import ChartPreview from './chart-preview'
import * as formSchema from './form-schema'
import FormValues from './form-values'


// CONSTANTS
// #############################################################################################
const resource = 'particular'
const title = 'Particular Information Form'
const subtitle = 'Fill out necessary input for the report'
// #############################################################################################
export default function ParticularForm({
    isModal,
    onChanges = () => { },
    onErrors = () => { },
    particular = {},
}) {
    const fields = isModal ?
        formSchema.fields.map(field => field.name === 'bar_data_id' ? { custom: true } : field)
        : formSchema.fields

    const initialValues = fields.reduce((acc, field) => {
        acc[field.name] = particular && particular[`${field?.name}`] || field?.initialValue || '';
        return acc;
    }, {})


    const [data, setData] = useState(particular)
    const [currentValue, setCurrentValue] = useState(null)
    const [values, setValues] = useState(particular?.values || [])
    const saveValue = (value) => {
        const newValues = values.filter(v => v.year !== value.year)
        newValues.push(value)
        setValues(newValues)
        setData({ ...data, values: newValues })
        onChanges({ ...data, values: newValues })
        setCurrentValue(null)
    }

    const handleChanges = (data, errors) => {
        const newData = {
            ...data,
            values: values
        }
        setData(newData)
        onChanges(newData)
        onErrors(errors)
    }



    return (
        <CRow
            className={isModal ? 'container-fluid' : 'gap-4 gap-md-0'}
            style={isModal ? {} : {
                height: '80vh',
                marginBottom: '1rem',
                overflow: 'auto',
            }}
        >
            <CCol
                className='container-fluid'
                lg={isModal ? 12 : 6}
            >
                <ResourceForm
                    resource={resource}
                    title={title}
                    watchChanges={handleChanges}
                    subtitle={subtitle}
                    form={{ ...formSchema, fields: fields, initialValues: initialValues }}
                    noSubmit={isModal}
                >
                </ResourceForm>
            </CCol>

            <CCol className='gap-4 d-flex flex-column-reverse flex-md-column'
                lg={isModal ? 12 : 6}
            >
                {
                    !isModal &&
                    <CCard>
                        <CCardHeader>
                            <h4>
                                Chart
                            </h4>
                        </CCardHeader>
                        <CCardBody>
                            <ChartPreview values={values} />
                        </CCardBody>
                    </CCard>
                }

                {/* Values Lists */}

                <CCard>
                    <CCardHeader>
                        <div className="d-flex justify-content-between items-align-center">
                            <h4>
                                Current Values
                            </h4>
                            <FormValues
                                onSubmit={saveValue}
                                value={currentValue}
                                open={currentValue !== null}
                                onCancel={() => setCurrentValue(null)}
                            />
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        {
                            values.length > 0 ?
                                <ValuesCard
                                    noActions={isModal}
                                    values={values}
                                    editValue={(value) => setCurrentValue(value)}
                                    removeValue={(value) => setValues(values.filter(v => v.year !== value.year))}
                                />
                                : <h4>No values Added.</h4>
                        }
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}
