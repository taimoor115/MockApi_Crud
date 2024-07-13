import * as Yup from "yup";

export const userSchema = Yup.object({
  name: Yup.string().required("Name is required").min(3).max(30),
  email: Yup.string().email().required("Email is required").lowercase(),
  gender: Yup.string().required("Gender is required"),
  profession: Yup.string().required("Profession is required"),
  address: Yup.object().shape({
    city: Yup.string().required("City is required"),
    street: Yup.number().required("Street no. is required"),
    postalCode: Yup.number().required("Postal code is required"),
  }),
});
