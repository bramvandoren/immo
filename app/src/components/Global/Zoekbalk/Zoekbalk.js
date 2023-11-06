import "./Zoekbalk.css";
import Container from "../Container/Container";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Input from "../../../components/Global/Input/Input";
import Select from "../../../components/Global/Select/Select";

const Zoekbalk = ({ onSubmit, isDisabled, label, initialData = {} }) => {
  const [data, setData] = useState({
    title: "",
    type: "",
    price: "",
    square_meters: "",
    year_built: "",
    for_sale: false,
    for_rent: false,
    sold: true,
    rented: false,
    description: "",
    imageUrl: "",
    done: false,
    ...initialData,
  });

  const optionsBuyOrRent = [
    { value: "Te Koop", label: "Te koop" },
    { value: "Te Huur", label: "Te Huur" },
  ];

  const options = [
    { value: "Huis", label: "Huis" },
    { value: "Appartement", label: "Appartement" },
    { value: "Kot", label: "Kot" },
    { value: "Kantoor", label: "Kantoor" },
    { value: "Garage", label: "Garage" },
  ];

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Als het een afbeeldingsinvoer is, het absolute pad verwijderen
    if (type === "file") {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setData({
        ...data,
        imageUrl: `/images/${file.name}`, // Opmerking: de waarde hier is de relatieve URL
      });
    } else {
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data);
  };

  useEffect(() => {
    if (initialData.deadline)
      setData({
        ...data,
        deadline: new Date(initialData.deadline).toISOString().slice(0, 10),
      });
  }, []);

  return (
    <div className="zoekbalk">
      <div className="zoekbalk-item">
        <label htmlFor="buyOrRent">Te koop / Te huur</label>
        <Select
          name="buyOrRent"
          value={data.for_sale}
          onChange={handleChange}
          type={"input"}
          options={optionsBuyOrRent}
        />
      </div>
      <div className="zoekbalk-item">
        <label htmlFor="type">Type</label>
        <Select
          name="type"
          value={data.for_sale}
          onChange={handleChange}
          options={options}
        ></Select>
      </div>
      <div className="zoekbalk-item">
        <label htmlFor="location">Locatie</label>
        <Input
          name="location"
          onChange={handleChange}
          placeholder={"bv. Gent"}
        />
      </div>
      <div className="zoekbalk-item">
        <label htmlFor="straal">Straal</label>
        <Input name="straal" onChange={handleChange} placeholder={"bv 5 km"} />
      </div>
      <div className="zoekbalk-item">
        <label htmlFor="price">Prijs</label>
        <Select
          name="price"
          value={data.price}
          onChange={handleChange}
          type={"input"}
          options={optionsBuyOrRent}
        />
      </div>
      <div className="button-container">
        <Button color="secondary">Zoeken</Button>
      </div>
    </div>
  );
};

export default Zoekbalk;
