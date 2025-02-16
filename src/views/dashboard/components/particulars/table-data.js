
import { CFormCheck } from '@coreui/react';
import { Link } from 'react-router-dom';
export default (data, actions, onSelect = () => { }) => {
    const Actions = actions;
    let resource = 'particular';
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
            //     width: '56px',
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
                width: '56px',
                sortable: true,
            },
            {
                name: <strong>Title</strong>,
                selector: row => <Link to={`/dashboard/${resource}/edit/` + row.id}>{row.title}</Link>,
                sortable: true,
            },
            {
                name: <strong>Description</strong>,
                selector: row => <span className="text-break">{row?.description || 'No description'}</span>,
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
        }))
    }
}