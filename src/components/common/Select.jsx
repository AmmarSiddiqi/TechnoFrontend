import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
} from "@mui/material";

import { Select as MuiSelect } from "@mui/material";
const Select = ({ name, value, onChange, label, options, error = null }) => {
  return (
    <FormControl variant="outlined" {...(error && { error: true })}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect name={name} value={value} label={label} onChange={onChange}>
        {options?.map((option) => (
          <MenuItem value={option._id} key={option._id}>
            {option.name}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default Select;
