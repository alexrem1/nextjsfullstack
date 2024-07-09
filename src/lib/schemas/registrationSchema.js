import * as yup from "yup";

export const registrationSchema = yup.object().shape({
  name: yup.string().required("Your name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Enter a valid email")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Enter a valid email"
    ),
  password: yup
    .string()
    .required(
      "Must contain at least 12 Characters, 1 Uppercase, 1 Lowercase, 1 Special Character, and 1 Number"
    )
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*[\]{}()?"\\,><':;|_~`=+-])[a-zA-Z\d!@#$%^&*[\]{}()?"\\,><':;|_~`=+-]{12,99}$/,
      "Must contain at least 12 Characters, 1 Uppercase, 1 Lowercase, 1 Special Character, and 1 Number"
    ),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password")],
      "Your passwords do not match, please ensure they match."
    )
    .required("Your passwords do not match, please ensure they match"),
});
