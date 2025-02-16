
import { CFormCheck } from '@coreui/react';
import { Link } from 'react-router-dom';
export default (data, actions, onSelect) => {
    const Actions = actions;
    let resource = 'bar-data';
    return {
        columns: [
            // {
            //     cell: (row) => <CFormCheck
            //         color='primary'
            //         id={`${resource}_${row.id}`}
            //         style={{
            //             borderColor: 'primary',
            //         }}
            //         onChange={(e) => onSelect(e, row.id)}

            //     />,
            //     width: '2%',
            //     style: {
            //         borderBottom: '1px solid #FFFFFF',
            //         marginBottom: '-1px',
            //     },
            //     sortable: false,
            //     selector: null,
            // },
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
                sortFunction: (a, b) => {
                    if (a.title < b.title) {
                        return -1;
                    }
                    if (a.title > b.title) {
                        return 1;
                    }
                    return 0;
                }
            },
            {
                name: <strong>Description</strong>,
                selector: row => <span className="text-break text-wrap">{row?.description?.split('.')[0] || 'No description'}</span>,
                sortable: true,
                width: '30%',
                sortFunction: (a, b) => {
                    if (a.description < b.description) {
                        return -1;
                    }
                    if (a.description > b.description) {
                        return 1;
                    }
                    return 0;
                }
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
                sortFunction: (a, b) => {
                    if (a.status < b.status) {
                        return -1;
                    }
                    if (a.status > b.status) {
                        return 1;
                    }
                    return 0;
                }

            },
            {
                name: <strong>Modified</strong>,
                selector: row => new Date(row.date).toLocaleString(),
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
            date: d.updated_at,
        }))
    }
}