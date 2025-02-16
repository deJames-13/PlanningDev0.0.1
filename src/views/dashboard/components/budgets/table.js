
import ResourceTable from '../ResourceTable'
import tableData from './table-data'

const RESOURCE = 'budgets'
const TITLE = 'Budgets Data'
const SUBTITLE = 'Manage the Budgets table for each offices.'

const ExpandedRow = ({ data = {} }) => {
    return (
        <div>
            <p>Expanded Row</p>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}
export default function BudgetsTable() {
    return (
        <ResourceTable
            resource={RESOURCE}
            title={TITLE}
            subtitle={SUBTITLE}
            tableData={tableData}
            tableProps={{
                expandableRows: true,
                expandableRowsComponent: ExpandedRow,
            }}
        />
    )
}
