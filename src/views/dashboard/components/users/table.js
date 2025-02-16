
import ResourceTable from '../ResourceTable'
import tableData from './table-data'

const RESOURCE = 'users'
const TITLE = 'Users Data'
const SUBTITLE = 'Manage users information in this page.'


export default function UserTable() {
    return (
        <ResourceTable
            resource={RESOURCE}
            title={TITLE}
            subtitle={SUBTITLE}
            tableData={(data, actions) => {
                data = data
                return tableData(data, actions)
            }}
        />
    )
}
