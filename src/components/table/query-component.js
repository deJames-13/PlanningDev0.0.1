import React, { useEffect } from 'react'
import { CForm, CFormInput, CFormSelect, CInputGroup, CButton, CRow, CCol } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilFilter } from '@coreui/icons'

const QueryComponent = ({ query, setQuery, tableColumns }) => {
    useEffect(() => {
        console.log('tableColumns', tableColumns.filter(col => col.sortable !== false).map(col => ({
            value: col.selector,
            label: typeof col.name === 'object' ? col.name : col.name
        })))
    }, [])
    return
    const sortOptions = tableColumns?.filter(col => col.sortable !== false).map(col => ({
        value: col.selector.name || col.name.props?.children?.toLowerCase() || 'id',
        label: typeof col.name === 'object' ? col.name.props?.children : col.name
    })) || [
            { value: 'id', label: 'ID' },
            { value: 'name', label: 'Name' },
            { value: 'updated_at', label: 'Modified' }
        ]

    const orderOptions = [
        { value: 'asc', label: 'Ascending' },
        { value: 'desc', label: 'Descending' }
    ]

    const handleSearch = (e) => {
        e.preventDefault()
        // Keep other query parameters the same, just update search
        setQuery({
            ...query,
            page: 1, // Reset to first page on new search
            search: e.target.search.value
        })
    }

    const handleSortChange = (e) => {
        setQuery({
            ...query,
            sort: e.target.value
        })
    }

    const handleOrderChange = (e) => {
        setQuery({
            ...query,
            order: e.target.value
        })
    }

    return (
        <div className="mb-4">
            <CRow className="g-3">
                <CCol md={6}>
                    <CForm onSubmit={handleSearch}>
                        <CInputGroup>
                            <CFormInput
                                type="text"
                                name="search"
                                placeholder="Search..."
                                defaultValue={query.search}
                            />
                            <CButton type="submit" color="primary">
                                <CIcon icon={cilSearch} />
                            </CButton>
                        </CInputGroup>
                    </CForm>
                </CCol>
                <CCol md={3}>
                    <CFormSelect
                        value={query.sort}
                        onChange={handleSortChange}
                        aria-label="Sort by"
                    >
                        <option disabled>Sort by</option>
                        {sortOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </CFormSelect>
                </CCol>
                <CCol md={3}>
                    <CFormSelect
                        value={query.order}
                        onChange={handleOrderChange}
                        aria-label="Sort order"
                    >
                        {orderOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </CFormSelect>
                </CCol>
            </CRow>
        </div>
    )
}

export default QueryComponent