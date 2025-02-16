import React, { useState } from 'react'
import { CButton } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilSpreadsheet } from '@coreui/icons';
import useResource from '../hooks/useResource'

export default function ExportResource({
    id = 'all',
    resource,
    exportType = 'xlsx'
}) {
    const [_exportType, setExportType] = useState(exportType)
    const {
        actions: { doExport },
    } = useResource(resource)


    return (
        <div className='d-flex gap-2 justify-content-end'
            style={{
                border: '1px solid rgb(88, 99, 112)',
                borderRadius: '5px',
            }}
        >
            {/* EXPORT */}
            <CButton
                onClick={() => doExport({
                    id: id,
                    type: _exportType
                })}
                color='success'
                variant='outline'
                style={{
                    border: '0'
                }}
            >
                <CIcon icon={cilSpreadsheet} />
                <span className='d-none d-lg-inline-block' style={{
                    paddingLeft: '3px'
                }}>

                </span>
            </CButton>
            {/* Export Type Selection */}
            <select
                value={_exportType}
                onChange={(e) => setExportType(e.target.value)}
                className="form-select"
                style={{
                    width: 'fit-content',
                    border: '0',
                }}
            >
                <option value="xlsx">Excel</option>
                <option value="csv">CSV</option>
            </select>
        </div>
    )
}
