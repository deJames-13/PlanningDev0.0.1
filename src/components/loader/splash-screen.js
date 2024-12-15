import React from 'react'

export default function SplashScreen({ children }) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: '100vh',
            width: '100vw',
            position: 'fixed',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(34, 25, 25, 0.5)',
            backdropFilter: 'blur(5px)',
            zIndex: 2000
        }}>
            {children ||
                <div className="spinner-grow text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            }
        </div>
    )
}
