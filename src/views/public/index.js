import React from 'react'
import GuestPageBanner from './banner'
import GuestPageContent from './content'
import GuestPageFooter from './footer'
import GuestHeader from './header'

export default function GuestPage() {
    return (
        <>
            <GuestHeader />
            <GuestPageContent />
            <GuestPageFooter />
        </>
    )
}
