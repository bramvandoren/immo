import "./Profiel.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Loading from "../../components/Global/Loading/Loading";
import List from "../../components/Global/List/List";
import ListItem from "../../components/Global/List/ListItem";
import Button from "../../components/Global/Button/Button";
import useFetch from "../../hooks/useFetch";
import Zoekbalk from "../../components/Global/Zoekbalk/Zoekbalk";
import Image from "../../components/Global/Image/Image";
import Container from "../../components/Global/Container/Container";
import { useAuthContext } from "../../contexts/AuthContainer";
import Input from "../../components/Global/Input/Input";
import useMutation from "../../hooks/useMutation";

const Profiel = ({ onSubmit, onUpdate }) => {
  const user = useAuthContext();
  console.log(user);

  const { mutate } = useMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      setUserData({
        ...user.user,
      });
    }
  }, [user.user]);
  const {
    isLoading,
    error,
    invalidate,
    data: houses,
    isDisabled,
    label,
  } = useFetch("/houses");
  const [userData, setUserData] = useState(user.user);

  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return <Loading />;
  }

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (data) => {
    console.log(data);
    data = {
      ...data,
      username: data.username,
    };
    mutate(`${process.env.REACT_APP_API_URL}/profiel/${user.user._id}`, {
      method: "PATCH",
      data,
      onSuccess: () => {
        onUpdate();
        navigate(`/profiel`);
      },
    });
  };

  return (
    <Container>
      {user.user.username === "admin" ? (
        <>
          {houses.length > 0 ? (
            <List>
              {houses.map((house) => (
                <ListItem href={`/houses/${house._id}`} key={house._id}>
                  <div className="listItem-image">
                    <Image src={house.imageUrl} alt={house._id} />
                  </div>
                  <div className="listItem-data">
                    <p>{house.type}</p>
                    <p>{house.price}</p>
                    <p>{house.square_meters}</p>
                  </div>
                </ListItem>
              ))}
            </List>
          ) : (
            <p>Nog geen huizen online staan, voeg huizen toe.</p>
          )}
          <div className="flex">
            <Button color="primary" href="/houses/add">
              Add
            </Button>
          </div>
        </>
      ) : (
        <div className="profile">
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Gebruikersnaam</label>
            <Input
              name="username"
              value={userData.username}
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            <Input
              name="password"
              value={userData.password}
              onChange={handleChange}
              type={"password"}
            />
            <label htmlFor="voornaam">Voornaam</label>
            <Input
              name="voornaam"
              value={userData.voornaam}
              onChange={handleChange}
            />
            <label htmlFor="familienaam">Familienaam</label>
            <Input
              name="familienaam"
              value={userData.familienaam}
              onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
            <Input
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
            <label htmlFor="gsm">Gsm</label>
            <Input name="gsm" value={userData.gsm} onChange={handleChange} />
            <Button type="submit" disabled={isDisabled}>
              Opslaan
            </Button>
          </form>
        </div>
      )}
    </Container>
  );
};

export default Profiel;
