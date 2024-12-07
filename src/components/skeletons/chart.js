import React from 'react'

export default function ChartSkeleton() {
    return (
        <div className="d-flex justify-content-center align-items-center"
            style={{
                height: '300px',
                width: '100%',
                backgroundColor: 'lightgray',
                padding: '1rem'

            }}
        >
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}
