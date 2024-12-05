
import ResourceTable from '../components/ResourceTable'
import tableData from './table-data'

export default function ParticularTable() {
    return (
        <ResourceTable
            resource='particular'
            tableData={tableData}
            title='Particulars Data'
            subtitle='Table list of particulars for Budgent Accountability Report'
        />
    )
}
