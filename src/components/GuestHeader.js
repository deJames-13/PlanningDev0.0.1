import { useEffect, useState } from 'react';
import logo from '../assets/images/logo.png';
import tuptTextPng from '../assets/images/tupt-text.png';
import noLogo from '../assets/images/tupt_portal_banner_no_logo.png';

export default function GuestHeader() {
  const [date, setDate] = useState(new Date());
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="header-area sticky-top">
        <div className={`header-top`}
          style={{
            transition: 'opacity 0.5s ease, visibility 0.5s ease',
            opacity: isScrolled ? 0 : 1,
            visibility: isScrolled ? 'hidden' : 'visible',
            width: '100%',
            height: isScrolled ? 0 : 'auto',
            position: 'relative',
            top: isScrolled ? '-100%' : 0,
            left: 0,
          }}
        >
          <div className="container">
            <div className="header-top-wrapper d-flex flex-wrap justify-content-sm-between">
              <div className="header-top-left">
                <ul className="header-meta m-0">
                  <li id="datetime">
                    <span>{date.toLocaleString()}</span>
                  </li>
                </ul>
              </div>
              <div className="header-top-right">
                <div className="header-link">
                  <a className="login" href="https://ers.tup.edu.ph/aims/students/">ERS Student</a>
                  <a className="register" href="https://ers.tup.edu.ph/aims/faculty/">ERS Faculty</a>
                  <a className="register" href="/dashboard">WebAdmin</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="navigation" className="navigation navigation-landscape">
          <img src={noLogo} alt="Background"
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
                  <a href="https://tupt.edu.ph"><img src={logo} alt="Logo" /></a>
                </div>
              </div>
              <div className="col-lg-10 position-static banner-text">
                <img src={tuptTextPng} alt=""
                  style={{
                    width: '80%'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}