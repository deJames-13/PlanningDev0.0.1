
import ResourceTable from '../components/ResourceTable'
import tableData from './table-data'

export default function ObjectivesTable() {
    return (
        <ResourceTable
            resource='objectives'
            tableData={tableData}
            title='Quality Objectives'
            subtitle='This is the objectives table'
        />
    )
}
