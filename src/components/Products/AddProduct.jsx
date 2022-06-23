import {
  FormControl,
  Grid,
  InputLabel,
  Paper,
  FormHelperText,
  Select as MuiSelect,
} from "@mui/material";
import Button from "../common/Button";
import { getCities, getCategories } from "../../services/httpRequests";
import Joi from "joi-browser";
import Select from "../common/Select";
import { useState, useEffect, useRef } from "react";
import Textfeild from "../common/Textfeild";
import { makeStyles } from "@mui/styles";
import http from "../../services/httpService";
import MenuItem from "@mui/material/MenuItem";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CancelIcon from "@mui/icons-material/Cancel";
import { useForm } from "../common/useForm";

const cloudinary_url = process.env.REACT_APP_CLOUDINARY_URL;
const cloudinary_preset = process.env.REACT_APP_CLOUDINARY_PRESET;

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
  const [cities, setCities] = useState([]);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubcategory] = useState("");
  const [enableSubcategory, setEnableSubcategory] = useState(false);
  const [subCategories, setSubcategories] = useState([]);
  const [enableUploadButton, setEnableUploadButton] = useState(true);
  const imagePickerRef = useRef();
  const classes = useStyles();

  useEffect(() => {
    populateCities();
    populateCategories();
    return () => console.log("Unmounted. Function Cleanup.");
  }, []);

  useEffect(() => {
    setValues(values);
  }, [values]);

  const populateCities = async () => {
    const cities = await getCities();
    setCities(cities);
  };
  const populateCategories = async () => {
    const categories = await getCategories();
    console.log(categories);
    setCategories(categories);
  };

  const schema = {
    image: Joi.string(),
    title: Joi.string().min(3).max(256).required().label("Title"),
    description: Joi.string().min(6).max(999).required().label("Description"),
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
    // setEnableUploadButton(Object.values(errors).every((item) => item));
  };

  function validateProperty(name, value) {
    const obj = { [name]: value };
    const singleSchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, singleSchema, { abortEarly: false });
    if (error) return error.details[0].message || null;
  }

  const uploadImage = (event) => {
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
  };

  const doSubmit = async () => {
    const res = await http.post(
      "http://localhost:4000/api/products/add",
      values
    );
    console.log(res);
  };

  function handleFormReset() {
    setValues(initialFormValue);
    setImages(null);
    setErrors({});
    setImageUrl("");
  }

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
                />
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
              value={values.category}
              label="Category"
              name="category"
              onChange={handleInputChange}
            >
              {categories?.map((category) => (
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
              {subCategories?.map((subCategory) => (
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
            <Button text="Post" type="submit" disabled={enableUploadButton} />
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
