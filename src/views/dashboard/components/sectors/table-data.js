
import { CFormCheck } from '@coreui/react';
import { Link } from 'react-router-dom';
export default (data, actions, onSelect = () => { }) => {
    const Actions = actions;
    let resource = 'sectors';
    return {
        columns: [
            {
                cell: (row) => <CFormCheck
                    color='primary'
                    id={`${resource}_${row?.id}`}
                    style={{
                        borderColor: 'primary',
                    }}
                    onChange={(e) => onSelect(e, row.id)}

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
                selector: row => row?.id,
                width: '56px',
                sortable: true,
            },
            {
                name: <strong>Name</strong>,
                selector: row => <Link to={`/dashboard/${resource}/edit/` + row?.id}>
                    {row?.name}
                </Link>,
                sortable: true,
            },
            {
                name: <strong>Department</strong>,
                selector: row => row?.department || 'N/A',
                sortable: true,
            },
            {
                name: <strong>Objectives</strong>,
                selector: row => row?.objectives,
                sortable: true,
            },
            {
                name: <strong>Budget</strong>,
                selector: row => row?.budgets || 'N/A',
                sortable: true,
            },
            {
                name: <strong></strong>,
                selector: row => <Link to={"/dashboard/sectors/" + row.slug}>View</Link>,
                sortable: false,
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
            department: d?.department?.full_name || d?.department?.short_name || d?.department?.name,
            objectives: d?.objectives?.length,
            budgets: d?.budgets?.length > 0 && d?.budgets[0].title,
            slug: d?.slug,
        }))
    }
}