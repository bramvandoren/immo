import React, { useState } from "react";
import Loading from "../../components/Global/Loading/Loading";
import List from "../../components/Global/List/List";
import ListItem from "../../components/Global/List/ListItem";
import Button from "../../components/Global/Button/Button";
import useFetch from "../../hooks/useFetch";
import Zoekbalk from "../../components/Global/Zoekbalk/Zoekbalk";
import Image from "../../components/Global/Image/Image";
import Container from "../../components/Global/Container/Container";
import "./Houses.css";
import { useAuthContext } from "../../contexts/AuthContainer";

const HousesOverview = () => {
  const { isLoading, error, invalidate, data: houses } = useFetch("/houses");
  const user = useAuthContext();
  const [sortOption, setSortOption] = useState("recent"); // Default sort option is "recent"
  const [filteredHouses, setFilteredHouses] = useState([]); // Filtered houses state

  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return <Loading />;
  }

  const handleDeleteSuccess = () => {
    invalidate();
  };

  // Sort houses based on the selected sort option
  const sortedHouses = filteredHouses.slice().sort((a, b) => {
    // Sorting logic
  });

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const handleFilterChange = (value) => {
    // Apply filter based on the selected value
    if (value === "recent") {
      setFilteredHouses(houses.filter((house) => house));
    } else if (value === "cheapest") {
      setFilteredHouses(houses.sort((a, b) => b.price + a.price));
    } else if (value === "expensive") {
      setFilteredHouses(houses.filter((house) => house.price));
    } else if (value === "postcode") {
      setFilteredHouses(houses.filter((house) => house.zip));
    }
  };

  return (
    <Container>
      <h2 className="title__tekoop">Te Koop</h2>
      {user.user.username !== "admin" && (
        <div className="zoekbalk.div">{/* <Zoekbalk></Zoekbalk> */}</div>
      )}
      <p>Sorteren op:</p>
      <div className="resultaten">
        <p
          className={`resultaten-item ${
            sortOption === "recent" ? "active" : ""
          }`}
          onClick={() => {
            handleSortChange("recent");
            handleFilterChange("recent");
          }}
        >
          Meest recent
        </p>
        <p
          className={`resultaten-item ${
            sortOption === "cheapest" ? "active" : ""
          }`}
          onClick={() => {
            handleSortChange("cheapest");
            handleFilterChange("cheapest");
          }}
        >
          Goedkoopste
        </p>
        <p
          className={`resultaten-item ${
            sortOption === "expensive" ? "active" : ""
          }`}
          onClick={() => {
            handleSortChange("expensive");
            handleFilterChange("expensive");
          }}
        >
          Duurste
        </p>
        <p
          className={`resultaten-item ${
            sortOption === "postcode" ? "active" : ""
          }`}
          onClick={() => {
            handleSortChange("postcode");
            handleFilterChange("postcode");
          }}
        >
          Postcode
        </p>
      </div>
      {filteredHouses.length > 0 ? (
        <List>
          {sortedHouses.map((house) => (
            <ListItem href={`/houses/${house._id}`} key={house._id}>
              <div className="listItem-image">
                <Image src={house.imageUrl} alt={house._id} />
              </div>
              <div className="listItem-data">
                <p>{house.type}</p>
                <p>€ {house.price}</p>
                <p>{house.square_meters} m²</p>
              </div>
            </ListItem>
          ))}
        </List>
      ) : (
        <p>Geen huizen te koop.</p>
      )}
      {/* <div className="flex flex-end">
        <Button color="primary" href="add">
          Add
        </Button>
      </div> */}
    </Container>
  );
};

export default HousesOverview;
