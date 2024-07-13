const Heading = ({ heading, className }) => {
  return (
    <h1 to="/" className={`fs-1 text-primary text-center fw-bold ${className}`}>
      {heading}
    </h1>
  );
};

export default Heading;
