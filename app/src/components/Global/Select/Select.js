import "./Select.css";

const Select = ({ name, value, onChange, disabled = false, options }) => {
  return (
    <select
      className="select"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
