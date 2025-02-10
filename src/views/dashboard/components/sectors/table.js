
import ResourceTable from '../ResourceTable'
import tableData from './table-data'

export default function SectorsTable() {
    return (
        <ResourceTable
            resource='sectors'
            tableData={tableData}
            title='Sectors Data'
            subtitle='Manage sectors information in this page.'
        />
    )
}
