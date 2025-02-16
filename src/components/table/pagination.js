import { CPagination, CPaginationItem } from '@coreui/react';
import React from 'react';

export default function CustomPagination({
    meta,
    onPageChange,
    maxPage = 3,
}) {
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

    const Prev = () => {
        let link = links[0]
        return <CPaginationItem
            key="prev"
            active={link.active}
            disabled={!link.url}
            onClick={() => handlePageChange(link.url)}
        >
            {link.label.replace('&laquo;', '').replace('&raquo;', '')}
        </CPaginationItem>
    }
    const Next = () => {
        let link = links[links.length - 1]
        return <CPaginationItem
            key="next"
            active={link.active}
            disabled={!link.url}
            onClick={() => handlePageChange(link.url)}
        >
            {link.label.replace('&laquo;', '').replace('&raquo;', '')}
        </CPaginationItem>
    }


    return (
        <CPagination align="center" aria-label="pagination">
            <Prev />
            {links.slice(
                current_page > last_page - maxPage
                    ? last_page + 1 - maxPage
                    : current_page - 1 !== 0
                        ? current_page - 1
                        : 1,
                maxPage + current_page < last_page + 1
                    ? maxPage + (current_page - 1 !== 0
                        ? current_page - 1
                        : 1
                    )
                    : last_page + 1
            ).map((link, index) => (
                <CPaginationItem
                    key={index}
                    active={link.active}
                    disabled={!link.url}
                    onClick={() => handlePageChange(link.url)}
                >
                    {link.label.replace('&laquo;', '').replace('&raquo;', '')}
                </CPaginationItem>
            ))}
            <Next />
        </CPagination>
    );
}