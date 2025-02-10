
import ResourceTable from '../ResourceTable'
import tableData from './table-data'

export default function ParticularTable() {
    return (
        <ResourceTable
            resource='particular'
            tableData={tableData}
            title='Particulars Data'
            subtitle='Table list of particulars for Budget Accountability Report'
        />
    )
}
