import "./Header.css";
import PropTypes from "prop-types";
import Container from "../Container/Container";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContainer";
import { useState } from "react";

const Header = ({ user, onLogout }) => {
  user = useAuthContext();
  console.log(user);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen((prevState) => !prevState);
  };

  return (
    <header className="header">
      <Container>
        <div className="header__brand">
          <Link to="/">
            <h1 className="header__title">IMMO</h1>
            {/* <image href="/public/images/logoImmo.png" alt="LOGO"></image> */}
          </Link>
        </div>
        <nav className={`header__nav ${isNavOpen ? "active" : ""}`}>
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <Link to="/">Home</Link>
            </li>
            <li className="header__nav-item">
              <Link to="/te-koop">Te koop</Link>
            </li>
            <li className="header__nav-item">
              <Link to="/te-huur">Te huur</Link>
            </li>
            <li className="header__nav-item">
              <Link to="/contact">Contact</Link>
            </li>
            {user ? (
              <li className="header__nav-item">
                <Link to="/profiel">Profiel</Link>
              </li>
            ) : (
              ""
            )}
            <li className="header__nav-item">
              <Button color={"third"} onClick={onLogout}>
                {user ? "Logout" : "Inloggen"}
              </Button>
            </li>
          </ul>
        </nav>
        <div
          className={`header__nav-toggle ${isNavOpen ? "active" : ""}`}
          onClick={toggleNav}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </Container>
    </header>
  );
};

Header.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default Header;
