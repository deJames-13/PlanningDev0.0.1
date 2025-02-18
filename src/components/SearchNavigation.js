import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CFormInput, CListGroup, CListGroupItem } from '@coreui/react';

const SearchNavigation = ({ routes }) => {
    const nav = useNavigate();
    const [query, setQuery] = useState('');
    const [filteredRoutes, setFilteredRoutes] = useState([]);

    const handleSearch = (e) => {
        const input = e.target.value;
        setQuery(input);
        if (input.length > 1) {
            const results = routes.filter(route => {
                return route.name.toLowerCase().includes(input.toLowerCase()) ||
                    route.breadcrumb.toLowerCase().includes(input.toLowerCase())
            });
            setFilteredRoutes(results);
        } else {
            setFilteredRoutes([]);
        }
    };

    const handleRouteClick = (route) => {
        if (route?.includes('edit/:id')) {
            nav(route.replace('edit/:id', 'table'));
        }
        else if (route?.includes('sectors/:sector')) {
            nav(route.replace('sectors/:sector', 'sectors/table'));
        }
        else {
            return nav(route);
        }
    };

    return (
        <div className="position-relative">
            <CFormInput
                type="text"
                placeholder="Search routes..."
                value={query}
                onChange={handleSearch}
                className="form-control"
            />
            {filteredRoutes.length > 0 && (
                <CListGroup className="position-absolute w-100">
                    {filteredRoutes.map((route, index) => (
                        <CListGroupItem key={index} className="list-group-item-action">
                            <button
                                onClick={() => handleRouteClick(route.fullPath)}
                                className="btn btn-link text-start w-100"
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                {route.breadcrumb}
                            </button>
                        </CListGroupItem>
                    ))}
                </CListGroup>
            )}
        </div>
    );
};

export default SearchNavigation;