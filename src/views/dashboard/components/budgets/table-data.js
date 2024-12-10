
import { CFormCheck } from '@coreui/react';
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
                selector: row => <a href={`/dashboard/${resource}/edit/` + row.id} className='text-break'>{row.title}</a>,
                sortable: true,
                width: "15%",
            },
            {
                name: <strong>Description</strong>,
                selector: row => <span className="text-break">{row.description}</span>,
                sortable: true,
                width: "40%",
            },
            {
                name: <strong>Sector</strong>,
                selector: row => <span>
                    <a href={`/dashboard/sectors/` + row?.sector?.name}>
                        {row?.sector?.full_name || row?.sector?.name}
                    </a>
                    {!row?.sector?.name && "N/A"}
                </span>,
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
        }))
    }
}