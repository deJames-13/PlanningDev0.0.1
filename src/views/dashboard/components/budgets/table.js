
import { useCallback, useEffect, useState } from 'react';

import resourceEndpoints from 'src/states/api/resources.js';
import ResourceTable from '../ResourceTable'
import tableData from './table-data'
import BatchActions from '../actions/batch';

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
    const [delByYear] = resourceEndpoints.useBudgetsDelByYearMutation()
    const [api, setApi] = useState(false)
    const [isRestoring, setIsRestoring] = useState(false)


    const delFunction = useCallback(async ({ year }) => {
        return delByYear({ year: year }).then((response) => {
            if (api?.actions?.fetchDatas) {
                api.actions.fetchDatas()
            }
            return response
        })
    }, [api])
    useEffect(() => {
        if (api) {
            setIsRestoring(api?.states?.tableState === 'thrashed')
        }
    }, [api])

    return (
        <div style={{
            marginBottom: '50px',
        }}>
            <div>
                <ResourceTable
                    resource={RESOURCE}
                    title={TITLE}
                    tableData={tableData}
                    tableProps={{
                        expandableRows: true,
                        expandableRowsComponent: ExpandedRow,
                    }}
                    setApi={setApi}
                />
            </div>
            <BatchActions
                delFunction={delFunction}
                isRestoring={isRestoring}
            />

        </div>
    )
}
