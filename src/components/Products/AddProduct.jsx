import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  Paper,
  Select as MuiSelect,
} from "@mui/material";
import Select from "../common/Select";
import { useState, useEffect } from "react";
import Textfeild from "../common/Textfeild";
import { makeStyles } from "@mui/styles";
import http from "../../services/httpService";
import MenuItem from "@mui/material/MenuItem";
import { useForm } from "./useForm";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
    "& .MuiButton-root": {
      margin: "4px",
      borderRadius: "10px",
    },
  },
  selectItems: {
    width: "80%",
    margin: theme.spacing(1),
  },
}));

const initialFormValue = {
  user: "",
  title: "",
  description: "",
  price: "",
  category: "",
  subCategory: "",
  location: "",
  active: "",
  image: [],
};

const AddProduct = () => {
  const { values, setValues, handleInputChange } = useForm(initialFormValue);
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubcategory] = useState("");
  const [enableSubcategory, setEnableSubcategory] = useState(false);
  const [subCategories, setSubcategories] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    getCities();
    getCategories();
    return () => console.log("Unmounted. Function Cleanup.");
  }, []);

  const getCities = async () => {
    const { data } = await http.get("http://localhost:4000/api/location");
    setCities(data);
  };

  const getCategories = async () => {
    const { data } = await http.get("http://localhost:4000/api/category");
    setCategories(data);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
  };

  // const handleCityChange = (event) => {
  //   const data = values;
  //   data[event.target.name] = event.target.value;
  //   setValues(data);
  // };

  // const handleCategoryChange = (event) => {
  //   const data = values;
  //   data[event.target.name] = event.target.value;
  //
  //   setValues(data);
  // };

  // const handleSubcategoryChange = (event) => {
  //   const data = values;
  //   data[event.target.name] = event.target.value;
  //   setValues(data);
  // };

  const handleFormReset = () => {
    setValues(initialFormValue);
  };

  const setSelectedCity = (cityName) => {
    setCity(cityName);
  };
  const setSelectedSubcategory = (subCategory) => {
    setSubcategory(subCategory);
  };
  const setSelectedCategory = (category) => {
    for (let item of categories) {
      if (item.name === category) {
        setSubcategories(item.subCategories);
      }
    }
    setEnableSubcategory(true);
    setCategory(category);
  };

  const handleChange = (event) => {};

  const textfeild = (
    value,
    name,
    title,
    type = "text",
    error = false,
    required = "true"
  ) => {
    return (
      <Textfeild
        type={type}
        value={value}
        title={title}
        error={error}
        required={required}
        name={name}
        onChange={handleInputChange}
      />
    );
  };
  console.log(values);
  return (
    <Paper elevation="4" className={classes.paper}>
      <form onSubmit={handleSubmit} className={classes.root} autoComplete="off">
        <Grid container>
          <Grid item xs={12}></Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            {textfeild(values.title, "title", "Title", "text", false, true)}
            {textfeild(
              values.description,
              "description",
              "Description",
              "text",
              false,
              true
            )}
            {textfeild(values.price, "price", "Price", "number", false, true)}
          </Grid>
          <Grid item xs={6}>
            <Select
              name="location"
              value={values.location}
              onChange={handleInputChange}
              label="Select City"
              options={cities}
            />
            <FormControl variant="outlined">
              <InputLabel>Category</InputLabel>
              <MuiSelect
                // className={classes.selectItems}
                value={values.category}
                label="Category"
                name="category"
                onChange={handleInputChange}
              >
                {categories.map((category) => (
                  <MenuItem
                    onClick={() => setSelectedCategory(category.name)}
                    value={category._id}
                    key={category._id}
                  >
                    {category.name}
                  </MenuItem>
                ))}
              </MuiSelect>
            </FormControl>
            <FormControl variant="outlined">
              <InputLabel>Select Subcategory</InputLabel>
              <MuiSelect
                value={values.subCategory}
                name="subCategory"
                onChange={handleInputChange}
                label="Select Subcategory"
                disabled={!enableSubcategory}
              >
                {subCategories.map((subCategory) => (
                  <MenuItem
                    onClick={() => setSelectedSubcategory(subCategory)}
                    value={subCategory}
                    key={subCategory}
                  >
                    {subCategory}
                  </MenuItem>
                ))}
              </MuiSelect>
            </FormControl>
            <Button variant="contained" color="success" type="submit">
              Submit
            </Button>
            <Button variant="outlined" color="error" onClick={handleFormReset}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default AddProduct;
