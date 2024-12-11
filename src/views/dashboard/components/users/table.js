
import ResourceTable from '../ResourceTable'
import tableData from './table-data'

export default function UserTable() {
    return (
        <ResourceTable
            resource='users'
            tableData={tableData}
            title='Users Data'
            subtitle='This is the users table'
        />
    )
}
