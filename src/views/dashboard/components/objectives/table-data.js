
import { CFormCheck } from '@coreui/react';
import { Link } from 'react-router-dom';
export default (data, actions) => {
    const Actions = actions;
    let resource = 'objectives';
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
                name: <strong>Target</strong>,
                selector: row => <span className="text-break">{row.target}</span>,
                sortable: true,
            },
            {
                name: <strong>Accomplishment</strong>,
                selector: row => <span className="text-break">{row.accomplishment}</span>,
                sortable: true,
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
            sector: d?.sector,
            target: d?.total?.target,
            accomplishment: d?.total?.accomplishment,
            status: d.status,
        }))
    }
}