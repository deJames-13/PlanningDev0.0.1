
import { CFormCheck } from '@coreui/react';
import { Link } from 'react-router-dom';
export default (data, actions) => {
    const Actions = actions;
    let resource = 'users';
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
                name: <strong>Username</strong>,
                selector: row => <Link to={`/dashboard/${resource}/edit/` + row.id}>{row.username}</Link>,
                sortable: true,
            },
            {
                name: <strong>Email</strong>,
                selector: row => row.email,
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
            username: d.username,
            email: d.email,
        }))
    }
}