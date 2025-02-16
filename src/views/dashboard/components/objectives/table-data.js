
import { CFormCheck } from '@coreui/react';
import { Link } from 'react-router-dom';
export default (data, actions, onSelect = () => { }) => {
    const Actions = actions;
    let resource = 'objectives';
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
                name: <strong>Sector</strong>,
                selector: row => <span>
                    <Link to={`/dashboard/sectors/` + row?.sector?.slug}>
                        {row?.sector?.full_name || row?.sector?.name}
                    </Link>
                    {!row?.sector?.name && "N/A"}
                </span>,
                sortable: true,
                sortFunction: (a, b) => {
                    if (a.sector?.name < b.sector?.name) {
                        return -1;
                    }
                    if (a.sector?.name > b.sector?.name) {
                        return 1;
                    }
                    return 0;
                }
            },
            {
                name: <strong>Title</strong>,
                selector: row => <Link to={`/dashboard/${resource}/edit/` + row.id} className='text-break'>{row.title}</Link>,
                sortable: true,
                width: "15%",
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
                selector: row => <span className="text-break">{row?.description || 'No description'}</span>,
                sortable: true,
            },
            {
                name: <strong>Target</strong>,
                selector: row => <span className="text-break">{row.target}</span>,
                sortable: true,
                sortFunction: (a, b) => {
                    if (a.target < b.target) {
                        return -1;
                    }
                    if (a.target > b.target) {
                        return 1;
                    }
                    return 0;
                }
            },
            {
                name: <strong>Accomplishment</strong>,
                selector: row => <span className="text-break">{row.accomplishment}</span>,
                sortable: true,
                sortFunction: (a, b) => {
                    if (a.accomplishment < b.accomplishment) {
                        return -1;
                    }
                    if (a.accomplishment > b.accomplishment) {
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