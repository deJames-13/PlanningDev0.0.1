
import ResourceTable from '../ResourceTable'
import tableData from './table-data'

const RESOURCE = 'departments'
const TITLE = 'Departments Data'
const SUBTITLE = 'Manage the each department information in this page.'

export default function DepartmentTable() {
    return (
        <ResourceTable
            resource={RESOURCE}
            title={TITLE}
            subtitle={SUBTITLE}
            tableData={tableData}
        />
    )
}
