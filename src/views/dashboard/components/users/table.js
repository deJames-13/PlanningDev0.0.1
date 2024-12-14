
import { useSelector } from 'react-redux'
import ResourceTable from '../ResourceTable'
import tableData from './table-data'

export default function UserTable() {
    const { userInfo } = useSelector(state => state.auth)

    return (
        <ResourceTable
            resource='users'
            tableData={(data, actions) => {
                data = data.filter(user => user.id !== userInfo.id)
                return tableData(data, actions)
            }}
            title='Users Data'
            subtitle='This is the users table'
        />
    )
}
