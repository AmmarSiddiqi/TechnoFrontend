import { FormControl, InputLabel, MenuItem } from "@mui/material";
import { Select as MuiSelect } from "@mui/material";
const Select = ({ name, value, onChange, label, options }) => {
  console.log(value);
  return (
    <FormControl variant="outlined">
      <InputLabel>{label}</InputLabel>
      <MuiSelect name={name} value={value} label={label} onChange={onChange}>
        {options.map((option) => (
          <MenuItem value={option._id} key={option._id}>
            {option.name}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};

export default Select;
