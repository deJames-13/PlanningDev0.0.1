
import ResourceTable from '../ResourceTable'
import tableData from './table-data'

const RESOURCE = 'sectors'
const TITLE = 'Sectors Data'
const SUBTITLE = 'Manage sectors information in this page.'


export default function SectorsTable() {
    return (
        <ResourceTable
            resource={RESOURCE}
            title={TITLE}
            subtitle={SUBTITLE}
            tableData={tableData}
        />
    )
}
