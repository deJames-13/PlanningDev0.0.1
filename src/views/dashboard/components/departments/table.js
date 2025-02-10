
import ResourceTable from '../ResourceTable'
import tableData from './table-data'

export default function DepartmentTable() {
    return (
        <ResourceTable
            resource='departments'
            tableData={tableData}
            title='Departments Data'
            subtitle='Manage the each department information in this page.'
        />
    )
}
