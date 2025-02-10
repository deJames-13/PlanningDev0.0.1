
import ResourceTable from '../ResourceTable'
import tableData from './table-data'

export default function BarDataTable() {
    return (
        <ResourceTable
            resource='bar-data'
            tableData={tableData}
            title='BAR Data'
            subtitle='Manage the Budget Accountability Report information in this page. The BAR Data requires a proper formatted values such as particulars information and quarterly values.'
            intitialQuery={{
                with: 'none'
            }}
        />
    )
}
