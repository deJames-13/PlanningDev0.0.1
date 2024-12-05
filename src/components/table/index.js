// change icon
import { cilSortAlphaDown } from '@coreui/icons';
import CIcon from '@coreui/icons-react';


import React from 'react';
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

export default function Table({
    columns = [],
    data = [],
    tableData = {},
    ...props
}) {
    return (
        <DataTableExtensions {...tableData}>
            <DataTable
                sortIcon={<CIcon icon={cilSortAlphaDown} />}
                columns={columns}
                data={data}
                noHeader
                defaultSortField="id"
                defaultSortAsc={true}
                pagination
                highlightOnHover
                pointerOnHover
                {...props}

            />
        </DataTableExtensions>
    )
}
