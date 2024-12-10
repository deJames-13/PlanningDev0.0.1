import React, { useState } from 'react';

const SearchNavigation = ({ routes }) => {
    const [query, setQuery] = useState('');
    const [filteredRoutes, setFilteredRoutes] = useState([]);

    const handleSearch = (e) => {
        const input = e.target.value;
        setQuery(input);
        if (input.length > 1) {
            const results = routes.filter(route =>
                route.name.toLowerCase().includes(input.toLowerCase()) ||
                route.breadcrumb.toLowerCase().includes(input.toLowerCase())
            );
            setFilteredRoutes(results);
        } else {
            setFilteredRoutes([]);
        }
    };

    return (
        <div style={{ position: 'relative' }}>
            <input
                type="text"
                placeholder="Search routes..."
                value={query}
                onChange={handleSearch}
                style={{ width: '100%', padding: '8px' }}
            />
            {filteredRoutes.length > 0 && (
                <ul
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        background: 'white',
                        border: '1px solid #ccc',
                        maxHeight: '200px',
                        overflowY: 'auto',
                        zIndex: 1000,
                    }}
                >
                    {filteredRoutes.map((route, index) => (
                        <li key={index} style={{ padding: '8px' }}>
                            <a href={route.fullPath} style={{ textDecoration: 'none', color: 'black' }}>
                                {route.breadcrumb}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchNavigation;
