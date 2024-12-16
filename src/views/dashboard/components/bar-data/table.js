
import ResourceTable from '../ResourceTable'
import tableData from './table-data'

export default function BarDataTable() {
    return (
        <ResourceTable
            resource='bar-data'
            tableData={tableData}
            title='BAR Data'
            subtitle='This is the bar data table'
            intitialQuery={{
                with: 'none'
            }}
        />
    )
}
