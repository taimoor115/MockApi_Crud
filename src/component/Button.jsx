const Button = ({ value, type, disabled, className }) => {
  return (
    <div className="d-grid gap-2 col-6 mx-auto">
      <button disabled={disabled} className={className} type={type}>
        {value}
      </button>
    </div>
  );
};

export default Button;
