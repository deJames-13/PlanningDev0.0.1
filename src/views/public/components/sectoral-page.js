import React, { useState } from 'react';
import GuestPageFooter from 'src/components/GuestFooter';
import GuestHeader from 'src/components/GuestHeader';
import SectorNavList from './sector-nav-list';
import { cilMenu } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import SectorOverview from 'src/views/dashboard/components/sectors/index.js'

export default function SectoralPage() {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <GuestHeader />
            <div className="min-vh-100">
                <div className="row">
                    <div className="col-lg-3 col-12 pb-5">
                        <div className="d-none d-lg-block">
                            <SectorNavList />
                        </div>
                        <div className="d-lg-none" style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '10px 20px',
                            marginTop: '20px',
                            justifyContent: 'space-between'
                        }}>

                            <button
                                className="btn btn-primary pointer"
                                onClick={() => setMobileMenuOpen(true)}
                            >
                                <CIcon icon={cilMenu} /> View All
                            </button>
                        </div>
                    </div>

                    <div className="col px-5s">
                        <div className="p-lg-5 mt-lg-5">
                            <SectorOverview />
                        </div>





                    </div>
                </div>
            </div>
            <GuestPageFooter />

            {isMobileMenuOpen && (
                <div className="mobile-menu-overlay">
                    <div className="overlay-content">
                        <button
                            className="close-button"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            &times;
                        </button>
                        <SectorNavList />
                    </div>
                </div>
            )}

        </>
    );
}
