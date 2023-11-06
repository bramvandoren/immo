import React from "react";
import List from "../../components/Global/List/List";
import ListItem from "../../components/Global/List/ListItem";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Global/Loading/Loading";
import Image from "../../components/Global/Image/Image";
import style from "./Contact.module.css";
import Zoekbalk from "../../components/Global/Zoekbalk/Zoekbalk";
import Container from "../../components/Global/Container/Container";
import { Link } from "react-router-dom";
import Input from "../../components/Global/Input/Input";
import Textarea from "../../components/Global/Textarea/Textarea";
import Checkbox from "../../components/Global/Checkbox/Checkbox";
import Button from "../../components/Global/Button/Button";

const Contact = () => {
  const { isLoading, error, invalidate, data: houses } = useFetch("/houses");
  console.log("Houses", houses);
  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={style.contact}>
      <div className={style.info}>
        <p className={style.light}>Heeft u vragen?</p>
        <h2>Contacteer ons</h2>
        <div className={style.info__office}>
          <p className={style.bold}>Kantoor Gent</p>
          <p>Kortrijksepoortstraat 333</p>
          <p>9000 Gent</p>
          <p>052 34 43 33</p>
          <p className={style.underline}>immogent@gmail.com</p>
          <p className={style.bold}>Openingsuren</p>
          <p>Maandag - Vrijdag</p>
          <p>8u30 - 12u00 en 12u30 - 16u00</p>
        </div>
      </div>
      <div className={style.contact__form}>
        <form>
          <label htmlFor="naam">Voornaam</label>
          <Input id="naam" name="naam" />
          <label htmlFor="familienaam">Familienaam</label>
          <Input id="familienaam" name="familienaam" />
          <label htmlFor="tel">Telefoon/GSM</label>
          <Input id="tel" name="tel" />
          <label htmlFor="email">E-mail</label>
          <Input id="email" name="email" />
          <label htmlFor="bericht">Description</label>
          <Textarea name="bericht" id="bericht" />
          <div className={style.voorwaarden}>
            <Checkbox></Checkbox>
            <p>Ik aanvaard de algemene voorwaarden</p>
          </div>
          <Button>Verzenden</Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
