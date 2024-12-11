import React from 'react'
import GuestPageContent from './content'
import GuestPageFooter from 'src/components/GuestFooter'
import GuestHeader from 'src/components/GuestHeader'

export default function GuestPage() {
    return (
        <>
            <GuestHeader />
            <GuestPageContent />
            <GuestPageFooter />
        </>
    )
}
