
import ResourceTable from '../ResourceTable'
import tableData from './table-data'

export default function BudgetsTable() {
    return (
        <ResourceTable
            resource='budgets'
            tableData={tableData}
            title='Budgets Data'
            subtitle='Manage the Budgets table for each offices.'
        />
    )
}
