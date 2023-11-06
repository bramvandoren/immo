import { Link, useNavigate } from "react-router-dom";
import useMutation from "../../hooks/useMutation";
import Title from "../../components/Global/Title/Title";
import HouseForm from "./Form/HouseForm";
import { useAuthContext } from "../../contexts/AuthContainer";
import "./Houses.css";

const AddHouse = () => {
  const navigate = useNavigate();
  const { isLoading, error, mutate } = useMutation();
  const { user } = useAuthContext();

  const handleSubmit = (data) => {
    data = {
      ...data,
      deadline: new Date(data.deadline).getTime(),
      creator: user._id,
    };
    mutate(`${process.env.REACT_APP_API_URL}/houses`, {
      method: "POST",
      data,
      onSuccess: () => {
        navigate(`/houses`);
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
      <Title>Add house</Title>
      {error && <p>{error}</p>}
      <HouseForm
        onSubmit={handleSubmit}
        isDisabled={isLoading}
        label="Create"
      />
    </>
  );
};

export default AddHouse;
