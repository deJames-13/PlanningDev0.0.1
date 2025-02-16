
import ResourceTable from '../ResourceTable'
import tableData from './table-data'

const RESOURCE = 'objectives'
const TITLE = 'Quality Objectives'
const SUBTITLE = 'This page is dedicated to management of Quality Objectives. Each objectives require quarterly values with accomplishment and target values.'

export default function ObjectivesTable() {
    return (
        <ResourceTable
            resource={RESOURCE}
            title={TITLE}
            subtitle={SUBTITLE}
            tableData={tableData}
        />
    )
}
