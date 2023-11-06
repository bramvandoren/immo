import "./HouseInfo.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../components/Global/Button/Button";
import { useAuthContext } from "../../../contexts/AuthContainer";

const HouseInfo = ({ house, address, office }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const convertDate = (dateTime) => {
    const date = new Date(dateTime);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based, so add 1
    const year = date.getFullYear();
    return `${day < 10 ? "0" + day : day}/${
      month < 10 ? "0" + month : month
    }/${year}`;
  };

  const goBack = () => {
    navigate(-1);
  };

  const isAdmin = user.username === "admin";

  return (
    <div>
      <Link to={goBack} onClick={goBack} className="back">
        &lt; Terug
      </Link>
      <div className="flex flex-end">
        {isAdmin && (
          <Button color="primary" href="edit">
            Edit
          </Button>
        )}
      </div>
      <div>
        <h1 className="title">{house.title}</h1>
        {/* <p className="type">{office.name}</p> */}
        <p className="type">{house.type}</p>
        <p className="price">€ {house.price}</p>
        <div className="address">
          <p className="street">
            {house.street} {house.nr}
          </p>
          <p className="street">
            {house.zip} {house.city}
          </p>
        </div>
        <p className="opp">{house.square_meters} m²</p>
        <p className={`house-state house-${house.for_sale}`}>
          {house.for_sale ? "Te koop" : "Verkocht"}
        </p>
        <p className={`house-state house-${house.for_rent}`}>
          {house.for_rent ? "Te huur" : "Verhuurd"}
        </p>
        <p className="description">{house.description}</p>
        <img className="image" src={house.imageUrl} alt={house._id}></img>
      </div>
    </div>
  );
};

export default HouseInfo;
