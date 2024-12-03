import React from 'react'

export default function GuestHeader() {
    const [date, setDate] = React.useState(new Date())
    React.useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])
    return (
        <>
            <header className="header-area">
                <div className="header-top">
                    <div className="container">
                        <div className="header-top-wrapper d-flex flex-wrap justify-content-sm-between">
                            <div className="header-top-left">
                                <ul className="header-meta">
                                    <li id="datetime">
                                        <span>{date.toLocaleString()}</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="header-top-right">
                                <div className="header-link">
                                    <a className="login" href="https://ers.tup.edu.ph/aims/students/">ERS Student</a>
                                    <a className="register" href="https://ers.tup.edu.ph/aims/faculty/">ERS Faculty</a>
                                    <a className="register" href="#">WebAdmin</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="navigation" className="navigation navigation-landscape">
                    <img src="src/assets/images/tupt_portal_banner_no_logo.png" alt="Background"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            zIndex: -1
                        }}
                    />
                    <div className="container position-relative">
                        <div className="row">
                            <div className="col-lg-2">
                                <div className="logo-img header-logo">
                                    <a href="index.html"><img src="src/assets/images/logo.png" alt="Logo" /></a>
                                </div>
                            </div>
                            <div className="col-lg-10 position-static banner-text">
                                <img src="src/assets/images/tupt-text.png" alt=""
                                    style={{
                                        width: '80%'
                                    }}
                                />
                            </div>
                            <div className="col-lg-12 position-static main-nav">
                                <div className="nav-toggle"></div>
                                <nav className="nav-menus-wrapper">
                                    <ul className="nav-menu">


                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
