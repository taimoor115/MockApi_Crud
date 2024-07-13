const Button = ({ value, type, disabled }) => {
  return (
    <div className="d-grid gap-2 col-6 mx-auto">
      <button disabled={disabled} className="btn btn-primary" type={type}>
        {value}
      </button>
    </div>
  );
};

export default Button;
