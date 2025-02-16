import React from 'react'

export default function QueryComponent({ query, setQuery }) {
    return (
        <>
            <div className="d-flex justify-content-end">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    value={query.search}
                    onChange={(e) => setQuery({
                        ...query,
                        search: e.target.value
                    })}
                />
            </div>
        </>
    )
}
