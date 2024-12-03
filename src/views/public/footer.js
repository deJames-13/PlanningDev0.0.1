import React from 'react';

export default function GuestPageFooter() {
  return (
    <section className="footer-area bg_cover"
      style={{
        backgroundImage: "url(src/assets/images/footer-image.png)"
      }}

    >
      <div className="footer-widget">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-6">
              <div className="footer-link mt-45">
                <h4 className="footer-title">Online Services</h4>
                <ul className="link-list">
                  <li><a href="https://www.lbp-eservices.com/egps/portal/index.jsp">Landbank
                    E-Payment</a></li>
                  <li><a href="index.html#">TUP VMGO</a></li>
                  <li><a href="https://ers.tup.edu.ph/aims/students/">ERS For Students</a></li>
                  <li><a href="https://ers.tup.edu.ph/aims/faculty/">ERS For Faculty</a></li>
                </ul>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="footer-link mt-45">
                <h4 className="footer-title">About GOVPH</h4>
                <ul className="link-list">
                  <li>
                    <p>Learn more about the Philippine government, its<br />structure, how government
                      works and the people<br />behind it.<br /><br /><br /></p>
                  </li>
                  <li><a href="https://data.gov.ph/">Open Data Portal</a></li>
                  <li><a href="https://www.officialgazette.gov.ph/">Official Gazette</a></li>
                </ul>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="footer-link mt-45">
                <h4 className="footer-title">Government Links</h4>
                <ul className="link-list">
                  <li><a href="https://pco.gov.ph/">Office of the President</a></li>
                  <li><a href="https://www.ovp.gov.ph/">Office of the Vice President</a></li>
                  <li><a href="https://legacy.senate.gov.ph/">Senate of the Philippines</a></li>
                  <li><a href="https://www.congress.gov.ph/">House of Representatives</a></li>
                  <li><a href="https://sc.judiciary.gov.ph/">Supreme Court</a></li>
                  <li><a href="https://ca.judiciary.gov.ph/">Court of Appeals</a></li>
                  <li><a href="https://sb.judiciary.gov.ph/">Sandiganbayan</a></li>
                </ul>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="footer-link mt-45">
                <h4 className="footer-title">Contact Info</h4>
                <ul className="link-list">
                  <li>
                    <p>KM14 East Service Road, Western Bicutan, Taguig City</p>
                  </li>
                  <li>
                    <p><a href="tel_%2b6328232456.html">(+632) 823-2456(7)</a></p>
                  </li>
                  <li>
                    <p><a href="mailto_/taguig%40tup.edu.html">taguig@tup.edu.ph</a></p>
                    <p><a href="index.html#">www..tupt.edu.ph</a></p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="copyright text-start">
                <p>&copy; 2024 <span> Technological University of the Philippines - Taguig </span> | All
                  Rights Reserved</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="copyright text-end">
                <p>Developed and Maintained by <a href="index.html#">UITC</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}