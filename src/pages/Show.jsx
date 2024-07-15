import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../store/features/userSlice";
import { useParams } from "react-router-dom";
import { Heading, Loader } from "../component";

const Show = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const status = useSelector((state) => state.user.status);

  const { id } = useParams();
  useEffect(() => {
    dispatch(getUserById(id));
  }, [id, dispatch]);

  return (
    <div>
      <Heading heading="User Details" />
      {user && status !== "loading" ? (
        <div className="container-fluid d-flex justify-content-center align-items.center">
          <div className="text-dark ">
            <b>Username:</b>
            <p>{user.name}</p>
            <b>Email:</b>
            <p>{user.email}</p>
            <b>Profession</b>
            <p>{user.profession}</p>
            <b>Gender:</b>
            <p>{user.gender}</p>
            <b>Address:</b>
            <p>{user.address?.city}</p>
            <b>Street#</b>
            <p>{user.address?.street}</p>
            <b>PostalCode:</b>
            <p>{user.address?.postalCode}</p>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Show;
