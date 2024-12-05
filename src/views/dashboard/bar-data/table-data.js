
import { CFormCheck } from '@coreui/react';
export default (data) => {
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
                selector: row => row.title,
                sortable: true,


            },
            {
                name: <strong>Description</strong>,
                selector: row => row.description,
                sortable: true,

            },
            {
                name: <strong>Particulars</strong>,
                selector: row => row.particulars,
                sortable: true,
                cell: c => <span>{c?.particulars?.length > 0 && c.particulars.map(p => p.title).join(', ')}</span>
            },
            {
                name: <strong>Actions</strong>,
                sortable: false,
                selector: null,
            },
        ],
        data: data.map(d => ({
            id: d.id,
            title: d.title,
            description: d.description,
            particulars: d.particulars,
        }))
    }
}