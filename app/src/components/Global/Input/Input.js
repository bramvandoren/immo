import "./Input.css";

const Input = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  disabled = false,
}) => {
  return (
    <input
      className="input"
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

export default Input;
