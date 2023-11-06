import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <div className={"footer"}>
      <div>
        <p className={"bold"}>Kantoor Gent</p>
        <p>Kotrijksepoortstraat 333, 9000 Gent</p>
      </div>
      <div>
        <p className={"bold"}>Contacteer ons</p>
        <p>053 34 43 33</p>
      </div>
      <div>
        <p className={"bold"}>Volg ons</p>
        <span className={"facebook"}>f</span>
      </div>
    </div>
  );
};

export default Footer;
