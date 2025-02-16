

import ResourceTable from '../ResourceTable'
import tableData from './table-data'

const ExpandedRow = ({ data = {} }) => {
    return (
        <div>
            <p>Expanded Row</p>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}

export default function BarDataTable() {
    return (
        <>
            <ResourceTable
                resource='bar-data'
                tableData={tableData}
                title='BAR Data'
                subtitle='Manage the Budget Accountability Report information in this page. The BAR Data requires a proper formatted values such as particulars information and quarterly values.'
                intitialQuery={{
                    with: 'none',
                }}
                tableProps={{
                    expandableRows: true,
                    expandableRowsComponent: ExpandedRow,
                }}
            />
        </>
    )
}

// {/* SCRATCH */ }
// import { CTab, CTabContent, CTabList, CTabPanel, CTabs } from '@coreui/react'
// import { useState, useEffect } from 'react'
// {/* const [activeTab, setActiveTab] = useState('default') */ }
// {/*  tab option for yearly or default */ }
// {/* <CTabs activeItemKey={activeTab} onChange={setActiveTab}>
//     <CTabList variant="tabs">
//         <CTab itemKey="default">Default</CTab>
//         <CTab itemKey="byYear">By Year</CTab>
//     </CTabList>
//     <CTabContent>
//         <CTabPanel className="p-3" itemKey="default">
        
//         </CTabPanel>
//         <CTabPanel className="p-3" itemKey="byYear">
//             By year
//         </CTabPanel>
//     </CTabContent>
// </CTabs> */}