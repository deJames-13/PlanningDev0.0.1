
import { cilPen, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CFormCheck } from '@coreui/react';
export default (data) => {
    return {
        columns: [
            {
                cell: (row) => <CFormCheck
                    color='primary'
                    id={`barData_${row.id}`}
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
                selector: row => <a href={"/dashboard/bar-data/edit/" + row.id}>{row.title}</a>,
                sortable: true,


            },
            {
                name: <strong>Description</strong>,
                selector: row => row.description,
                sortable: true,

            },
            {
                name: <strong>Particulars</strong>,
                selector: row => row.particulars,
                sortable: true,
                cell: c => (<div>{
                    c?.particulars?.length > 0 && c.particulars.map((p, i) => <><span>
                        <a href={'/dashboard/particulars/edit/' + p.id} key={i}>{p.title.split(':')[0].slice(0, 10) + '...'}</a></span><br /></> || <span>No Particulars</span>)
                }
                </div>)
            },
            {
                name: <strong>Actions</strong>,
                sortable: false,
                selector: null,
                cell: (row) => <div>
                    <a href={'/dashboard/bar-data/edit/' + row.id} className="btn btn-sm btn-info btn-outline">
                        <CIcon icon={cilPen} />
                    </a>
                    <a href={'/dashboard/bar-data/delete/' + row.id} className="btn btn-sm btn-danger btn-outline">
                        <CIcon icon={cilTrash} />
                    </a>
                </div>
            },
        ],
        data: data.map(d => ({
            id: d.id,
            title: d.title,
            description: d.description,
            particulars: d.particulars,
        }))
    }
}