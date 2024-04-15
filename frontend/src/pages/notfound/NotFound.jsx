import React, { useEffect } from "react";

import { Button } from "react-bootstrap";

import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import "./styles.css";

const NotFound = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <header className="top-header"></header>

      {/* Dust particels */}
      <div>
        <div className="starsec"></div>
        <div className="starthird"></div>
        <div className="starfourth"></div>
        <div className="starfifth"></div>
      </div>
      {/* Dust particle end */}

      <div className="lamp__wrap">
        <div className="lamp">
          <div className="cable"></div>
          <div className="cover"></div>
          <div className="in-cover">
            <div className="bulb"></div>
          </div>
          <div className="light"></div>
        </div>
      </div>
      {/* END Lamp */}

      <section className="error">
        {/* Content  */}
        <div className="error__content">
          <div className="error__message message">
            <h1 className="message__title">Page Not Found</h1>
            <p className="message__text">
              We're sorry, the page you were looking for isn't found here. The
              link you followed may either be broken or no longer exists. Please
              click the button below or do whatever you want to.
            </p>
          </div>

          <Button as={Link} to="/" size="lg" variant="outline-dark mt-4">
            Return to Homepage
          </Button>
        </div>

      </section>
    </>
  );
};

export default NotFound;