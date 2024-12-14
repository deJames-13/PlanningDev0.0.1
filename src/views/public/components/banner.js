import React from 'react'

export default function GuestPageBanner({ title }) {
    return (
        <section class="page-banner p-0">
            <div class="page-banner-bg bg_cover"
                style={{
                    backgroundImage: 'url(src/assets/images/page-banner.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <div class="container">
                    <div class="banner-content text-center">
                        <h2 class="title">
                            {title}
                        </h2>
                    </div>
                </div>
            </div>
        </section>
    )
}
