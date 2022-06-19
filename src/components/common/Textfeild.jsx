import { TextField } from "@mui/material";

const Textfeild = ({ value, title, type, error = null, required, ...rest }) => {
  return (
    <TextField
      {...rest}
      required={required}
      type={type}
      label={title}
      value={value}
      {...(error && { error: true, helperText: error })}
    />
  );
};

export default Textfeild;
