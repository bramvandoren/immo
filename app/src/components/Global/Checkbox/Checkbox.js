import { useState } from "react";
import Input from "../Input/Input";
const Checkbox = ({ label }) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
      <label htmlFor={label}>
        {label}
        <Input
          name={label}
          value={label}
          type="checkbox"
          checked={isChecked}
          onChange={() => setIsChecked((prev) => !prev)}
        />
      </label>
  );
};
export default Checkbox;
