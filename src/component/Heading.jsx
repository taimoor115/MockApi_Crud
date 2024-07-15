import { Link } from "react-router-dom";

const Heading = ({ heading, className, path }) => {
  return (
    <Link className="text-decoration-none" to={path}>
      <h1
        to="/"
        className={`fs-1 text-primary text-center fw-bold ${className}`}
      >
        {heading}
      </h1>
    </Link>
  );
};

export default Heading;
