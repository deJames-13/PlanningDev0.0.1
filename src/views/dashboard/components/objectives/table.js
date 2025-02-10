
import ResourceTable from '../ResourceTable'
import tableData from './table-data'

export default function ObjectivesTable() {
    return (
        <ResourceTable
            resource='objectives'
            tableData={tableData}
            title='Quality Objectives'
            subtitle='This page is dedicated to management of Quality Objectives. Each objectives require quarterly values with accomplishment and target values.'
        />
    )
}
