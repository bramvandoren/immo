import { useState } from "react";
import Button from "../../components/Global/Button/Button";
import Container from "../../components/Global/Container/Container";
import Input from "../../components/Global/Input/Input";
import Title from "../../components/Global/Title/Title";
import useMutation from "../../hooks/useMutation";
import style from "./LoginScreen.module.css";
import Header from "../../components/Global/Header/Header";
import { Link } from "react-router-dom";

const LoginScreen = ({ onLogin, initialError }) => {
  const { isLoading, error, mutate } = useMutation();

  const [data, setData] = useState({
    username: "",
    password: "",
    voornaam: "",
    familienaam: "",
    email: "",
    gsm: "",
  });

  const [registrationError, setRegistrationError] = useState("");

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    mutate(`${process.env.REACT_APP_API_URL}/login`, {
      method: "POST",
      data,
      onSuccess: (data) => {
        onLogin(data);
      },
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!data.username || !data.password) {
      setRegistrationError("Vul alle velden in.");
      return;
    }
    mutate(`${process.env.REACT_APP_API_URL}/register`, {
      method: "POST",
      data,
      onSuccess: (data) => {
        onLogin(data);
      },
    });
  };

  return (
    <Container>
      <Header></Header>
      <div className={style.login_register}>
        <div className={style.login}>
          <Title>Inloggen</Title>
          <form onSubmit={handleSubmit}>
            {error || initialError ? (
              <p className={style.error}>{initialError ?? error}</p>
            ) : (
              ""
            )}

            <label htmlFor="username">Username</label>
            <Input
              name="username"
              value={data.username}
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            <Input
              name="password"
              value={data.password}
              onChange={handleChange}
              type={"password"}
            />
            <Button type="submit" disabled={isLoading}>
              {" "}
              Login{" "}
            </Button>
          </form>
        </div>
        <p className={style.or}>OF</p>
        <div className={style.register}>
          <Title>Registreren</Title>
          <form onSubmit={handleRegister}>
            {/* {error || initialError ? (
              <p className={style.error}>{initialError ?? error}</p>
            ) : (
              ""
            )} */}
            {registrationError && (
              <p className={style.error}>{registrationError}</p>
            )}
            <label htmlFor="username">Username</label>
            <Input
              name="username"
              value={data.username}
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            <Input
              name="password"
              value={data.password}
              onChange={handleChange}
              type={"password"}
            />
            <label htmlFor="voornaam">Voornaam</label>
            <Input
              name="voornaam"
              value={data.voornaam}
              onChange={handleChange}
            />
            <label htmlFor="familienaam">Familienaam</label>
            <Input
              name="familienaam"
              value={data.familienaam}
              onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
            <Input name="email" value={data.email} onChange={handleChange} />
            <label htmlFor="gsm">Gsm</label>
            <Input name="gsm" value={data.gsm} onChange={handleChange} />
            <Button type="submit" disabled={isLoading} onClick={handleRegister}>
              {" "}
              Register{" "}
            </Button>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default LoginScreen;
