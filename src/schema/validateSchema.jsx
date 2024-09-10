import * as yup from "yup";
export const validationSchema = yup.object({
  username: yup.string("Enter youe username").required("Username is required"),
  email: yup
    .string("Enter your email")
    .matches(/^[\w.+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Enter a valid email")
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
    .matches(/^[\w.+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Enter a valid email")
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

export const adminUserAddSchema = yup.object({
  username: yup.string("Enter youe username").required("Username is required"),
  email: yup
    .string("Enter your email")
    .matches(/^[\w.+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  phone: yup
    .string("Enter phone number")
    .matches(
      /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/,
      "Phone number is not valid"
    )
    .required("phone number is required"),
  role: yup.string("Enter role").required("role is required"),
});

export const adminUserEditSchema = yup.object({
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length"),
  phone: yup
    .string("Enter phone number")
    .matches(
      /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/,
      "Phone number is not valid"
    ),
  role: yup.string("Enter role").required("role is required"),
});

export const coperateUserAddSchema = yup.object({
  username: yup.string("Enter youe username").required("Username is required"),
  email: yup
    .string("Enter your email")
    .matches(/^[\w.+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  phone: yup
    .string("Enter phone number")
    .matches(
      /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/,
      "Phone number is not valid"
    )
    .required("phone number is required"),
  total_hours: yup
    .number("Enter no. of total hours")
    .required("Password is required"),
});

export const coperateUserEditSchema = yup.object({
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length"),
  phone: yup
    .string("Enter phone number")
    .matches(
      /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/,
      "Phone number is not valid"
    ),
});

export const flightMaintainceUnavailablitySchema = yup.object({
  end_time: yup.string("Enter End Time").required("End Time is required"),
  start_time: yup.string("Enter Start Time").required("Start Time is required"),
});

export const editHoursSchema = yup.object({
  new_total_hours: yup
    .number("Enter no. of total hours")
    .required("no. of total hours is required")
    .min(0),
  new_used_hours: yup
    .number("Enter no. of used hours")
    .required("no. of used hours is required")
    .min(0),
});
