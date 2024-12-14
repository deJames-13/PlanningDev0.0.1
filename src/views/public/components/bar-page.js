import React from 'react'
import GuestPageContent from './content'
import GuestPageFooter from 'src/components/GuestFooter'
import GuestHeader from 'src/components/GuestHeader'

export default function BARPage() {
    return (
        <>
            <GuestHeader />
            <div className="min-vh-100">
                <GuestPageContent />
            </div>
            <GuestPageFooter />
        </>
    )
}
