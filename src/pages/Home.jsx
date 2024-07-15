import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { destroyUser, getUsers } from "../store/features/userSlice";
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Heading, Loader } from "../component";
import Search from "../component/Search";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";

const Home = () => {
  const dispatch = useDispatch();
  const { users, status } = useSelector((state) => state.user);
  const [id, setId] = useState(0);
  const search = useSelector((state) => state.user.setSearch);

  const filteredUsers = search
    ? users?.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      )
    : users;
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
            {filteredUsers.length !== 0 ? (
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
                    filteredUsers.length !== 0 &&
                    filteredUsers.map((user, index) => (
                      <tr key={user?.id || ""}>
                        <td>{index + 1}</td>
                        <td>{user?.name}</td>
                        <td>{user?.profession}</td>
                        <td>{user?.gender}</td>
                        <td className="d-flex justify-content-between align-items-center fs-4 ">
                          <Link to={`/users/${user?.id}`}>
                            <FaEye />
                          </Link>
                          <Link to={`/users/edit/${user?.id}`}>
                            <FaEdit />
                          </Link>
                          <div>
                            <button
                              type="button"
                              className="btn btn-primary btn-sm"
                              onClick={() => setId(user?.id)}
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                            >
                              <MdDelete />
                            </button>

                            <div
                              className="modal fade"
                              id="exampleModal"
                              tabIndex="-1"
                              aria-labelledby="exampleModalLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h1
                                      className="modal-title fs-5"
                                      id="exampleModalLabel"
                                    >
                                      Are you sure?
                                    </h1>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      data-bs-dismiss="modal"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        dispatch(destroyUser(id));
                                        toast.success(
                                          "User delete successfully..."
                                        );
                                      }}
                                      data-bs-dismiss="modal"
                                      className="btn btn-primary"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
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
            ) : (
              <div>No searched users found...</div>
            )}
          </>
        ) : (
          <div className="text-center">No Users Added...</div>
        )}
      </div>
    </div>
  );
};

export default Home;
