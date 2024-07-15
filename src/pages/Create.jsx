import { useFormik } from "formik";
import { Button, Error, Heading, Input } from "../component";
import { userSchema } from "../validations";
import { useDispatch, useSelector } from "react-redux";
import { postUser } from "../store/features/userSlice";
import { useNavigate } from "react-router-dom";

const initialValues = {
  name: "",
  email: "",
  gender: "",
  profession: "",
  address: {
    city: "",
    street: "",
    postalCode: "",
  },
};

const Create = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((state) => state.user.status);

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: userSchema,
    onSubmit: async (values, { resetForm }) => {
      await dispatch(postUser(values));
      navigate("/");
      resetForm();
    },
  });

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6 p-4">
          <Heading heading="Create User" className="mt-2" />
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
              className="btn btn-primary"
              value={status == "loading" ? "Creating..." : "Create User"}
              type="submit"
              disabled={status == "loading"}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
