

import ResourceTable from '../ResourceTable'
import tableData from './table-data'

const RESOURCE = 'bar-data'
const TITLE = 'BAR Data'
const SUBTITLE = 'Manage the Budget Accountability Report information in this page. The BAR Data requires a proper formatted values such as particulars information and quarterly values.'

const ExpandedRow = ({ data = {} }) => {
    return (
        <div>
            <span className='fw-bold'>Particulars</span>
            <hr style={{
                margin: '5px 0',
                border: 'none',
                borderBottom: '1px solid #ccc',
            }} />
            {
                data.particulars?.map((particular, index) => {
                    let sortedValues = [...particular.values].sort((a, b) => {
                        if (a.year < b.year) {
                            return -1;
                        }
                        if (a.year > b.year) {
                            return 1;
                        }
                        return 0;
                    })
                    return (
                        <div key={index} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                        }}>
                            <div style={{
                                width: '300px',
                                wordBreak: 'break-word',

                            }}>
                                <span>
                                    {particular.title.split(':')[0]}
                                </span>
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',

                            }}>
                                {sortedValues?.map((value, index) => (
                                    <span key={index} >
                                        {value?.year}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default function BarDataTable() {
    return (
        <>
            <ResourceTable
                resource={RESOURCE}
                title={TITLE}
                subtitle={SUBTITLE}

                tableData={tableData}
                tableProps={{
                    expandableRows: true,
                    expandableRowsComponent: ExpandedRow,
                }}
            />
        </>
    )
}

