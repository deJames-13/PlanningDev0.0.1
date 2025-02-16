
import { CFormCheck } from '@coreui/react';
import { Link } from 'react-router-dom';
export default (data, actions, onSelect = () => { }) => {
    const Actions = actions;
    let resource = 'departments';
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
                name: <strong>Name</strong>,
                selector: row => <Link to={`/dashboard/${resource}/edit/` + row.id}>{row.name}</Link>,
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
            name: d?.full_name || d?.short_name || d?.name,
            description: d.description,
            sectors: 0,
        }))
    }
}