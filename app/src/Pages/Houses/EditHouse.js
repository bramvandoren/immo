import { Link, useNavigate } from "react-router-dom";
import Title from "../../components/Global/Title/Title";
import HouseForm from "./Form/HouseForm";
import useMutation from "../../hooks/useMutation";
import "./Houses.css";

const EditHouse = ({ houses, addresses, onUpdate }) => {
  const navigate = useNavigate();
  const { isLoading, error, mutate } = useMutation();

  const handleSubmit = (data) => {
    data = {
      ...data,
    };
    mutate(`${process.env.REACT_APP_API_URL}/houses/${houses._id}`, {
      method: "PATCH",
      data,
      onSuccess: () => {
        onUpdate();
        navigate(`/houses/${houses._id}`);
      },
    });
  };

  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      <Link to={goBack} onClick={goBack} class="back">
        &lt; Terug
      </Link>
      <Title>Edit house</Title>
      {error && <p>{error}</p>}
      <HouseForm
        onSubmit={handleSubmit}
        isDisabled={isLoading}
        label="Save"
        housesData={houses}
        addressesData={addresses}
      />
    </>
  );
};

export default EditHouse;
