
import { CFormCheck } from '@coreui/react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
export default (data, actions, onSelect = () => { }) => {
    const Actions = actions;
    let resource = 'departments';
    return {
        columns: [
            {
                name: <strong>ID</strong>,
                selector: row => row.id,
                width: '56px',
                sortable: true,
                field: 'id'
            },
            {
                name: <strong>Name</strong>,
                selector: row => <Link to={`/dashboard/${resource}/edit/` + row.id}>{row.name}</Link>,
                sortable: true,
                field: 'name'
            },
            {
                name: <strong>Modified</strong>,
                selector: row => format(new Date(row.updated_at), 'MM/dd/yyyy hh:mm:ss'),
                sortable: true,
                field: 'updated_at'
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
            name: d?.full_name || d?.short_name || d?.name,
            description: d.description,
            sectors: 0,
            created_at: d.created_at,
            updated_at: d.updated_at
        }))
    }
}