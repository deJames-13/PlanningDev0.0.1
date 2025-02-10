
import { useSelector } from 'react-redux'
import ResourceTable from '../ResourceTable'
import tableData from './table-data'

export default function UserTable() {
    const { userInfo } = useSelector(state => state.auth)

    return (
        <ResourceTable
            resource='users'
            tableData={(data, actions) => {
                data = data
                return tableData(data, actions)
            }}
            title='Users Data'
            subtitle='Manage users information in this page.'
        />
    )
}
