
import { CFormCheck } from '@coreui/react';
export default (data, actions) => {
    const Actions = actions;
    let resource = 'budgets';
    return {
        columns: [
            {
                cell: (row) => <CFormCheck
                    color='primary'
                    id={`barData_${row.id}`}
                    style={{
                        borderColor: 'primary',
                    }}

                />,
                width: '56px',
                style: {
                    borderBottom: '1px solid #FFFFFF',
                    marginBottom: '-1px',
                },
                sortable: false,
                selector: null,
            },
            {
                name: <strong>ID</strong>,
                selector: row => row.id,
                width: '56px',
                sortable: true,
            },
            {
                name: <strong>Title</strong>,
                selector: row => <a href={`/dashboard/${resource}/edit/` + row.id}>{row.title}</a>,
                sortable: true,
            },
            {
                name: <strong>Description</strong>,
                selector: row => row.description,
                sortable: true,
            },

        ],
        data: data.map(d => ({
            id: d.id,
            title: d.title,
            description: d.description,
        }))
    }
}