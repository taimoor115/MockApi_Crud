import { useFormik } from "formik";
import { userSchema } from "../validations";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, updateUser } from "../store/features/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Button, Error, Heading, Input, Loader } from "../component";

const Edit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const status = useSelector((state) => state.user.status);
  const user = useSelector((state) => state.user.user);
  //   console.log(user);

  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch, id]);

  const initialValues = {
    name: user.name,
    email: user.email,
    gender: user.gender,
    profession: user.profession,
    address: {
      city: user.address?.city,
      street: user.address?.street,
      postalCode: user.address?.postalCode,
    },
  };

  const { values, handleSubmit, errors, touched, handleChange } = useFormik({
    initialValues,
    validationSchema: userSchema,
    onSubmit: async (values) => {
      await dispatch(updateUser({ updatedData: values, id }));
      navigate("/users");
      console.log(values);
    },
    enableReinitialize: true,
  });

  //   console.log(values);

  return (
    <div className="container">
      {user ? (
        <div className="row justify-content-center">
          <div className="col-lg-6 p-4">
            <Heading heading="Edit User" className="mt-2" />
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                {errors.name && touched.name && <Error message={errors.name} />}
                <Input
                  name="name"
                  placeholder="Name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                {errors.email && touched.email && (
                  <Error message={errors.email} />
                )}
                <Input
                  name="email"
                  value={values.email}
                  placeholder="Email"
                  type="email"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                {errors.gender && touched.gender && (
                  <Error message={errors.gender} />
                )}
                <select
                  className="form-select"
                  name="gender"
                  value={values.gender}
                  onChange={handleChange}
                >
                  <option defaultValue="Choose">Choose...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="mb-3">
                {errors.profession && touched.profession && (
                  <Error message={errors.profession} />
                )}
                <Input
                  name="profession"
                  value={values.profession}
                  placeholder="Profession"
                  type="text"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                {errors?.address?.city && touched.address?.city && (
                  <Error message={errors.address.city} />
                )}
                <Input
                  name="address.city"
                  placeholder="City"
                  value={values.address.city}
                  type="text"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                {errors.address?.street && touched.address?.street && (
                  <Error message={errors.address.street} />
                )}
                <Input
                  name="address.street"
                  value={values.address.street}
                  placeholder="Street#"
                  type="number"
                  min={1}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                {errors.address?.postalCode && touched?.address?.postalCode && (
                  <Error message={errors.address.postalCode} />
                )}
                <Input
                  name="address.postalCode"
                  value={values.address.postalCode}
                  placeholder="Postal Code"
                  type="number"
                  min={1}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <Button
                value={status == "loading" ? "Updating..." : "Update User"}
                type="submit"
                disabled={status == "loading"}
                className="btn btn-primary"
              />
            </form>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Edit;
