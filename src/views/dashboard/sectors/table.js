
import ResourceTable from '../components/ResourceTable'
import tableData from './table-data'

export default function SectorsTable() {
    return (
        <ResourceTable
            resource='sectors'
            tableData={tableData}
            title='Sectors Data'
            subtitle='This is the sectors table'
        />
    )
}
