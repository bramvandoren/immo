import { Link, useNavigate } from "react-router-dom";
import useMutation from "../../../hooks/useMutation";
import Button from "../Button/Button";
import style from "./List.css";

const ListItem = ({ title, done, data, onClick, href, children }) => {
  const navigate = useNavigate();
  const { isLoading, error, mutate } = useMutation();

  const handleCheck = (e) => {
    e.preventDefault();

    data = {
      ...data,
      done: !data.done,
    };

    mutate(`${process.env.REACT_APP_API_URL}/houses/${data._id}`, {
      method: "PATCH",
      data,
      onSuccess: () => {
        navigate(`/houses`);
      },
    });
  };

  if (href) {
    return (
      <div className="list-item">
        <Link to={href} className="list-item__button">
          <Button onClick={href} className="info">
            MEER INFO
          </Button>
        </Link>
        {children}
      </div>
    );
  }

  return (
    <li className="list-item" onClick={onClick}>
      <h3 className="list-item__title">{title}</h3>
      {children}
    </li>
  );
};

export default ListItem;
