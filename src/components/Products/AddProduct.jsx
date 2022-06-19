import {
  FormControl,
  Grid,
  InputLabel,
  Paper,
  FormHelperText,
  Select as MuiSelect,
} from "@mui/material";
import Button from "../common/Button";
import Joi from "joi-browser";
import Select from "../common/Select";
import { useState, useEffect, useRef } from "react";
import Textfeild from "../common/Textfeild";
import { makeStyles } from "@mui/styles";
import http from "../../services/httpService";
import MenuItem from "@mui/material/MenuItem";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CancelIcon from "@mui/icons-material/Cancel";
import { useForm } from "./useForm";

const cloudinary_url = "https://api.cloudinary.com/v1_1/dnf7w0ph1/upload";
const cloudinary_preset = "ml_default";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  root: {
    "& .MuiFormControl-root": {
      width: "90%",
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
  imageWithCancel: {
    display: "flex",
    margin: "10px",
  },
  imageCrossIcon: {
    color: "#ed1a1a",
    cursor: "pointer",
  },
}));

const initialFormValue = {
  user: "62a86b36722eb444144a379c",
  title: "",
  description: "",
  price: "",
  category: "",
  subCategory: "",
  location: "",
  image: "",
};

const AddProduct = () => {
  const { values, setValues, handleInputChange, errors, setErrors, resetForm } =
    useForm(initialFormValue, true, validateProperty);
  const [images, setImages] = useState(null);
  const [imageData, setImageData] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubcategory] = useState("");
  const [enableSubcategory, setEnableSubcategory] = useState(false);
  const [subCategories, setSubcategories] = useState([]);
  const [enableUploadButton, setEnableUploadButton] = useState(false);
  const imagePickerRef = useRef();
  const classes = useStyles();

  const schema = {
    image: Joi.string(),
    title: Joi.string().required().label("Title"),
    description: Joi.string().required().label("Description"),
    price: Joi.number().required().min(0).label("Price"),
    location: Joi.string().required().label("Location"),
    category: Joi.string().required().label("Category"),
    subCategory: Joi.string().required().label("Subcategory"),
    user: Joi.string(),
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(values, schema, options);
    if (!error) return null;
    const errors = {};
    error.details.map((error) => {
      errors[error.path] = error.message;
    });
    setErrors(errors);
    setEnableUploadButton(Object.values(errors).every((item) => item));
  };

  function validateProperty(name, value) {
    const obj = { [name]: value };
    const singleSchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, singleSchema, { abortEarly: false });
    if (error) return error.details[0].message || null;
  }

  // function validate(feildValues = values) {
  //   console.log(feildValues);
  //   let temp = { ...errors };
  //   if ("title" in feildValues)
  //     temp.title = feildValues.title ? "" : "Invalid Name";
  //   if ("description" in feildValues)
  //     temp.description = feildValues.description ? "" : "Invalid Description";
  //   if ("price" in feildValues)
  //     temp.price = feildValues.price ? "" : "Invalid Price";
  //   if ("category" in feildValues)
  //     temp.category = feildValues.category ? "" : "Please select a category";
  //   if ("subcategory" in feildValues)
  //     temp.subCategory = feildValues.subCategory
  //       ? ""
  //       : "Please select a subcategory";
  //   if ("location" in feildValues)
  //     temp.location = feildValues.location ? "" : "Please Select Your City";
  //   if ("image" in feildValues)
  //     temp.image = feildValues.image ? "" : "Please select and Image";
  //   setErrors({ ...temp });
  //   if (feildValues === values)
  //     return Object.values(temp).every((x) => x == "");
  // }

  useEffect(() => {
    getCities();
    getCategories();
    return () => console.log("Unmounted. Function Cleanup.");
  }, []);

  useEffect(() => {
    setValues((values) => values);
  }, [values]);

  // const handleImageChange = (event) => {
  //   setImages(event.target.file[0]);
  // };

  // const uploadImage = async (event) => {
  //   event.preventDefault();
  //   const file = images;
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("upload", cloudinary_preset);
  //   const data = await http.post(cloudinary_url);
  //   console.log(data);
  // };

  const uploadImage = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    setImageData(file);
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onload = (readerEvent) => {
      setImages(readerEvent.target.result);
    };
  };

  const handleImageRemove = (event) => {
    setImages(null);
    setImageUrl("");
    const data = { ...values };
    data["image"] = "";
    setValues(data);
  };

  const getCities = async () => {
    const { data } = await http.get("http://localhost:4000/api/location");
    setCities(data);
  };

  const getCategories = async () => {
    const { data } = await http.get("http://localhost:4000/api/category");
    setCategories(data);
  };

  async function uploadImageToCloudinary() {
    const formData = new FormData();
    formData.append("file", imageData);
    formData.append("upload_preset", cloudinary_preset);

    const { data: imgData } = await http.post(cloudinary_url, formData);
    const data = { ...values };
    data["image"] = imgData.secure_url;
    setValues(data); //image is being set in values.image at this stage
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    uploadImageToCloudinary();
    validate();
    doSubmit();

    // here we set the image's url to current state.image
    //then we can save this url to the backend or do other stuff
    // const data = await http.post(cloudinary_url, formData);
    // console.log(data);
    return null;
  };

  const doSubmit = async () => {
    const res = await http.post(
      "http://localhost:4000/api/products/add",
      values
    );
    console.log(res);
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

  function handleFormReset() {
    setValues(initialFormValue);
    setImages(null);
    setErrors({});
    setImageUrl("");
  }

  // const setSelectedCity = (cityName) => {
  // setCity(cityName);
  // };

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
    error,
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

  return (
    <Paper elevation="4" className={classes.paper}>
      <form onSubmit={handleSubmit} className={classes.root} autoComplete="off">
        <Grid container>
          <Grid item xs={12}>
            {!images && (
              <div
                className="upload__placeholder"
                onClick={() => imagePickerRef.current.click()}
              >
                <AddPhotoAlternateIcon fontSize="large" />
              </div>
            )}
            {images && (
              <div
                className={classes.imageWithCancel}
                onClick={handleImageRemove}
              >
                <CancelIcon
                  className={classes.imageCrossIcon}
                  onClick={handleImageRemove}
                />
                <img
                  required
                  className="upload__content"
                  src={images}
                  alt="img"
                  onClick={() => imagePickerRef.current.click()}
                  // onClick={handleImageChange}
                />
                {/* <button onClick={uploadImage}>Upload</button> */}
              </div>
            )}
            <input
              hidden
              accept="image/*"
              onChange={uploadImage}
              ref={imagePickerRef}
              type="file"
            />
          </Grid>
        </Grid>
        <Grid container>
          {/* <Grid item xs={6}> */}
          {textfeild(
            values.title,
            "title",
            "Title",
            "text",
            errors.title,
            false
          )}
          {textfeild(
            values.description,
            "description",
            "Description",
            "text",
            errors.description,
            false
          )}
          {textfeild(
            values.price,
            "price",
            "Price",
            "number",
            errors.price,
            false
          )}
          {/* </Grid> */}
          {/* <Grid item xs={6}> */}
          <Select
            name="location"
            value={values.location}
            onChange={handleInputChange}
            label="Select City"
            options={cities}
            error={errors.location}
          />
          <FormControl
            variant="outlined"
            {...(errors.category && { error: true })}
          >
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
            {errors.category && (
              <FormHelperText>{errors.category}</FormHelperText>
            )}
          </FormControl>

          <FormControl
            variant="outlined"
            {...(errors.subCategory && { error: true })}
          >
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
            {errors.subCategory && (
              <FormHelperText>{errors.subCategory}</FormHelperText>
            )}
          </FormControl>
          {/* </Grid> */}
          <Grid container>
            <Button text="Post" type="submit" disabled={!enableUploadButton} />
            <Button
              text="Reset"
              color="error"
              variant="outlined"
              onClick={handleFormReset}
              type="reset"
            />
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default AddProduct;
