import * as yup from "yup";

const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(15).required(),
});

export default loginSchema;
