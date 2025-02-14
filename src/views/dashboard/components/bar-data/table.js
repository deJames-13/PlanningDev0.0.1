import { CTab, CTabContent, CTabList, CTabPanel, CTabs } from '@coreui/react'
import { useState, useEffect } from 'react'


import ResourceTable from '../ResourceTable'
import tableData from './table-data'

export default function BarDataTable() {
    const [activeTab, setActiveTab] = useState('default')
    return (
        <>
            {/*  tab option for yearly or default */}
            <CTabs activeItemKey={activeTab} onChange={setActiveTab}>
                <CTabList variant="tabs">
                    <CTab itemKey="default">Default</CTab>
                    <CTab itemKey="byYear">By Year</CTab>
                </CTabList>
                <CTabContent>
                    <CTabPanel className="p-3" itemKey="default">
                        <ResourceTable
                            resource='bar-data'
                            tableData={tableData}
                            title='BAR Data'
                            subtitle='Manage the Budget Accountability Report information in this page. The BAR Data requires a proper formatted values such as particulars information and quarterly values.'
                            intitialQuery={{
                                with: 'none',
                            }}
                        />
                    </CTabPanel>
                    <CTabPanel className="p-3" itemKey="byYear">
                        By year
                    </CTabPanel>
                </CTabContent>
            </CTabs>


        </>
    )
}
