import * as yup from "yup";
export const validationSchema = yup.object({
  username: yup.string("Enter youe username").required("Username is required"),
  email: yup
    .string("Enter your email")
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Enter a valid email"
    )
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  phoneNumber: yup
    .string("Enter phone number")
    .matches(
      /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/,
      "Phone number is not valid"
    )
    .required("phone number is required"),
});

export const forgotPasswordValidationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Enter a valid email"
    )
    .required("Email is required"),
});

export const changePasswordValidationSchema = yup.object({
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const flightRequestEditModalSchema = yup.object({
  to: yup.string("Enter To").required("To is required"),
  from: yup.string("Enter From").required("From is required"),
  username: yup.string("Enter username").required("Username is required"),
  start_time: yup.string("Enter Start Time").required("Start Time is required"),
});

const userBaseSchemaObject = {
  username: yup.string("Enter youe username").required("Username is required"),
  email: yup
    .string("Enter your email")
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Enter a valid email"
    )
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  phoneNumber: yup
    .string("Enter phone number")
    .matches(
      /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/,
      "Phone number is not valid"
    )
    .required("phone number is required"),
  role: yup.string("Enter role").required("role is required"),
};

export const adminUserAddEditSchema = yup.object({
  username: yup.string("Enter youe username").required("Username is required"),
  email: yup
    .string("Enter your email")
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Enter a valid email"
    )
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  phoneNumber: yup
    .string("Enter phone number")
    .matches(
      /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/,
      "Phone number is not valid"
    )
    .required("phone number is required"),
  role: yup.string("Enter role").required("role is required"),
});
export const coperateUserAddEditSchema = yup.object({
  ...userBaseSchemaObject,
});

export const flightMaintainceUnavailablitySchema = yup.object({
  end_time: yup.string("Enter End Time").required("End Time is required"),
  start_time: yup.string("Enter Start Time").required("Start Time is required"),
});
