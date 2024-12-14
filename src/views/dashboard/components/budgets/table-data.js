
import { CFormCheck } from '@coreui/react';
import { Link } from 'react-router-dom';
export default (data, actions) => {
    const Actions = actions;
    let resource = 'budgets';
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
                name: <strong>Title</strong>,
                selector: row => <Link to={`/dashboard/${resource}/edit/` + row.id} className='text-break'>{row.title}</Link>,
                sortable: true,
                width: "15%",
            },
            {
                name: <strong>Description</strong>,
                selector: row => <span className="text-break">{row?.description || 'No description'}</span>,
                sortable: true,
            },
            {
                name: <strong>Sector</strong>,
                selector: row => <span>
                    <Link to={`/dashboard/sectors/` + row?.sector?.slug}>
                        {row?.sector?.full_name || row?.sector?.name}
                    </Link>
                    {!row?.sector?.name && "N/A"}
                </span>,
                sortable: true,
            },
            {
                name: <strong>Modified</strong>,
                selector: row => <span className="text-break">{
                    new Date(row.updated_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                        hour12: true,
                    })
                }</span>,
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
            sector: d?.sector,
            updated_at: d.updated_at,
        }))
    }
}