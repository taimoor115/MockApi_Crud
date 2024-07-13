import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../store/features/userSlice";
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Heading, Loader, Modal } from "../component";
import Search from "../component/Search";

const Home = () => {
  const dispatch = useDispatch();
  const { users, status } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <Heading heading="Users" />

      <div className="table-responsive">
        {users.length !== 0 ? (
          <>
            <div>
              <Search />
            </div>
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Profession</th>
                  <th>Gender</th>
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>
                {users && status !== "loading" ? (
                  users.map((user, index) => (
                    <tr key={user?.id || ""}>
                      <td>{index + 1}</td>
                      <td>{user?.name}</td>
                      <td>{user?.profession}</td>
                      <td>{user?.gender}</td>
                      <td className="d-flex justify-content-between align-items-center fs-5">
                        <Link to={`/users/${user?.id}`}>
                          <FaEye />
                        </Link>
                        <Link to={`/users/edit/${user?.id}`}>
                          <FaEdit />
                        </Link>
                        <Modal id={user?.id} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      <Loader />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        ) : (
          <div className="text-center">No Users Added...</div>
        )}
      </div>
    </div>
  );
};

export default Home;
