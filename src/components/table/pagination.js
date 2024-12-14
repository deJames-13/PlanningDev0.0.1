import { CPagination, CPaginationItem } from '@coreui/react';
import React from 'react';

export default function CustomPagination({ meta, onPageChange }) {
    const { current_page, last_page, links } = meta;
    if (!last_page || last_page === 1 || !current_page || !links) {
        return null;
    }

    const handlePageChange = (url) => {
        if (url) {
            const page = new URL(url).searchParams.get('page');
            onPageChange(page);
        }
    };

    return (
        <CPagination align="center" aria-label="pagination">
            {links.map((link, index) => (
                <CPaginationItem
                    key={index}
                    active={link.active}
                    disabled={!link.url}
                    onClick={() => handlePageChange(link.url)}
                >
                    {link.label.replace('&laquo;', '').replace('&raquo;', '')}
                </CPaginationItem>
            ))}
        </CPagination>
    );
}