import "./Image.css";
const Image = ({ src, alt, type, name, value, onChange, disabled = false }) => {
  return <img className="image" src={src} alt={alt} />;
};

export default Image;
