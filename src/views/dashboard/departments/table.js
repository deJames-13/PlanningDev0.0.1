
import ResourceTable from '../components/ResourceTable'
import tableData from './table-data'

export default function DepartmentTable() {
    return (
        <ResourceTable
            resource='departments'
            tableData={tableData}
            title='Departments Data'
            subtitle='This is the departments table'
        />
    )
}
