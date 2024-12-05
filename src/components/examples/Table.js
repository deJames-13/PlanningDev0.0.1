import {
    cilSortAlphaDown,
} from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import React from 'react';
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";


import { columns, data } from "./tableData";

function Table({
    columns = [],
    data = [],
    tableData = {},
    ...props
}) {
    return (
        <DataTableExtensions {...tableData}>
            <DataTable
                columns={columns}
                data={data}
                noHeader
                defaultSortField="id"
                defaultSortAsc={true}
                pagination
                highlightOnHover
                dense
                {...props}

            />
        </DataTableExtensions>
    )
}

export function ExampleTable() {
    return (
        <Table
            sortIcon={<CIcon icon={cilSortAlphaDown} />}
            tableData={{
                columns,
                data,
            }}
            columns={columns}
            data={data}
        />
    )
}

export default Table
