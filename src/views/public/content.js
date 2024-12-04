import React from 'react'
import BarOverview from './bar-overview'

export default function GuestPageContent() {
  return (
    <section className="blog-details-page mt-50">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="blog-details-content">
              <div className="details-content mt-50">
                <h3 className="title">Budget Accountability Report (BAR 1)</h3>
                <hr />
              </div>
            </div>
          </div>

          {/* Chart Cards */}
          <BarOverview />

        </div>
      </div>
    </section>
  )
}
