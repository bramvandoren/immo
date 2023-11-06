import { useEffect, useState } from "react";
import "./HouseForm.css";
import Button from "../../../components/Global/Button/Button";
import Input from "../../../components/Global/Input/Input";
import Textarea from "../../../components/Global/Textarea/Textarea";
import Image from "../../../components/Global/Image/Image";
import Select from "../../../components/Global/Select/Select";
import Checkbox from "../../../components/Global/Checkbox/Checkbox";

const HouseForm = ({
  onSubmit,
  isDisabled,
  label,
  housesData = {},
  addressesData = {},
}) => {
  const [houseData, setHouseData] = useState({
    title: "",
    type: "",
    price: "",
    square_meters: "",
    year_built: "",
    for_sale: false,
    for_rent: false,
    sold: false,
    rented: false,
    description: "",
    imageUrl: "",
    adresses_id: "",
    done: false,
    ...housesData,
  });
  const [addressData, setAddress] = useState({
    street: "",
    city: "",
    zip: "",
    ...addressesData,
  });

  const options = [
    { value: "Huis", label: "Huis" },
    { value: "Appartement", label: "Appartement" },
    { value: "Kot", label: "Kot" },
    { value: "Kantoor", label: "Kantoor" },
    { value: "Garage", label: "Garage" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(addressesData);
    // Als het een afbeeldingsinvoer is, het absolute pad verwijderen
    if (type === "file") {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setHouseData({
        ...houseData,
        imageUrl: `/images/${file.name}`,
      });
    } else if (type === "checkbox") {
      setHouseData({
        ...houseData,
        [e.target.className]: e.target.checked,
      });
    } else {
      setHouseData({
        ...houseData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(houseData);
  };

  useEffect(() => {
    if (addressData) {
      setAddress({
        ...addressData,
      });
    }
  }, []);

  // useEffect(() => {
  //   if (housesData.deadline)
  //     setHouseData({
  //       ...houseData,
  //       deadline: new Date(housesData.deadline).toISOString().slice(0, 10),
  //     });
  //   if (addressData) {
  //     setAddress(`${addressData.street}, ${addressData.zip}`);
  //   }
  // }, []);

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <Input name="title" value={houseData.title} onChange={handleChange} />
      <label htmlFor="type">Type</label>
      <Select
        name="type"
        value={houseData.type}
        onChange={handleChange}
        options={options}
      />
      <label htmlFor="price">Prijs (€)</label>
      <Input name="price" value={houseData.price} onChange={handleChange} />
      <label htmlFor="square_meters">Oppervlakte (m²)</label>
      <Input
        name="square_meters"
        value={houseData.square_meters}
        onChange={handleChange}
      />
      <label htmlFor="year_built">Gebouwd in</label>
      <Input
        name="year_built"
        value={houseData.year_built}
        onChange={handleChange}
      />
      <label htmlFor="for_sale">Verkopen</label>
      <input
        onChange={handleChange}
        className="for_sale"
        checked={houseData.for_sale}
        type={"checkbox"}
      />
      <label htmlFor="for_rent">Verhuren</label>
      <input
        onChange={handleChange}
        className="for_rent"
        checked={houseData.for_rent}
        type={"checkbox"}
      />
      <label htmlFor="sold">Verkocht</label>
      <input
        onChange={handleChange}
        className="sold"
        checked={houseData.sold}
        type={"checkbox"}
      />
      <label htmlFor="rented">Verhuurd</label>
      <input
        onChange={handleChange}
        className="rented"
        checked={houseData.rented}
        type={"checkbox"}
      />

      <label htmlFor="description">Description</label>
      <Textarea
        name="description"
        value={houseData.description}
        onChange={handleChange}
      />
      <label htmlFor="imageUrl">Afbeelding</label>
      <Input
        type={"file"}
        id="imageUrl"
        name="imageUrl"
        onChange={handleChange}
      />
      <Image src={houseData.imageUrl} alt={houseData._id} />

      <h2>Adres gegevens</h2>
      <div className="address">
        <label htmlFor="street">Straat</label>
        <Input name="street" value={houseData.street} onChange={handleChange} />
        <label htmlFor="nr">Huisnummer</label>
        <Input name="nr" value={houseData.nr} onChange={handleChange} />
        <label htmlFor="city">Stad/Dorp</label>
        <Input name="city" value={houseData.city} onChange={handleChange} />
        <label htmlFor="zip">Postcode</label>
        <Input name="zip" value={houseData.zip} onChange={handleChange} />
      </div>

      <Button type="submit" disabled={isDisabled}>
        {label}
      </Button>
    </form>
  );
};

export default HouseForm;
