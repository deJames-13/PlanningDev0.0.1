
import { CFormCheck } from '@coreui/react';
import { Link } from 'react-router-dom';
export default (data, actions) => {
    const Actions = actions;
    let resource = 'bar-data';
    return {
        columns: [
            {
                cell: (row) => <CFormCheck
                    color='primary'
                    id={`${resource}_${row.id}`}
                    style={{
                        borderColor: 'primary',
                    }}

                />,
                width: '2%',
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
                width: '5%',
                sortable: true,
            },
            {
                name: <strong>Title</strong>,
                selector: row => <Link to={`/dashboard/${resource}/edit/` + row.id}>{row.title}</Link>,
                sortable: true,
                width: '15%',
            },
            {
                name: <strong>Description</strong>,
                selector: row => <span className="text-break text-wrap">{row?.description?.split('.')[0] || 'No description'}</span>,
                sortable: true,
                width: '30%',
            },
            {
                name: <strong>Status</strong>,
                selector: row => <span style={{
                    backgroundColor: row.status != 'published' ? '#ffc107' : '#28a745',
                    padding: '5px',
                    fontWeight: 'bold',
                    borderRadius: '5px',
                }}>{row.status}</span>,
                sortable: true,
            },
            {
                name: <strong>Actions</strong>,
                sortable: false,
                selector: null,
                cell: (row) => <Actions row={row} />
            },
        ],
        data: data.map(d => ({
            id: d.id,
            title: d.title,
            description: d.description,
            status: d.status,
        }))
    }
}