const Input = ({ value, placeholder, onChange, type, name, min }) => {
  return (
    <input
      type={type}
      className="form-control mb-3"
      onChange={onChange}
      name={name}
      placeholder={placeholder}
      value={value}
      min={min}
    />
  );
};
export default Input;
