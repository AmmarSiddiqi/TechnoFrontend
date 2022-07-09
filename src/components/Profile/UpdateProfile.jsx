import { Avatar, Button, Paper, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
// import axios from "axios";
import http from "../../services/httpService";
import { updateProfile } from "../../services/httpRequests";

const cloudinary_url = process.env.REACT_APP_CLOUDINARY_URL;
const cloudinary_preset = process.env.REACT_APP_CLOUDINARY_PRESET;

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "grid",
    placeItems: "center",
    borderRadius: "50px",
    height: "70vh",
    width: "80vh",
    margin: "30px auto",
  },
  imageSelect: {
    display: "flex",
    flex: "1 1 auto",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  inputImage: {
    maxWidth: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    margin: "auto auto auto 50px",
  },
}));

const UpdateProfile = ({ user }) => {
  const { image, countryCode, phone, _id } = user;
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({ phone, image });
  const [error, setError] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [preview, setPreview] = useState();
  const classes = useStyles();

  useEffect(() => {
    setValues({ image, phone });
  }, []);

  const phoneNumberError = () => {
    if (values.phone?.length < 5 || values.phone?.length > 15) setError(true);
    else setError(false);
  };

  useEffect(() => {
    phoneNumberError();
  }, [values.phone]);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  async function uploadImageToCloudinary() {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", cloudinary_preset);

    try {
      const { data: imgData } = await http.post(cloudinary_url, formData);
      const data = { ...values };
      data["image"] = imgData.secure_url;
      setValues(data);
      doSubmit();
    } catch (ex) {
      console.log(ex);
    } //image is being set in values.image at this stage
  }

  const handleChange = ({ target }) => {
    const { name, value } = target;
    const data = { ...values };
    data[name] = value;
    setValues(data);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    uploadImageToCloudinary();
  };

  const doSubmit = async () => {
    values._id = _id;
    const res = await updateProfile(values);
  };

  return (
    <Paper elevation={14} className={classes.paper}>
      <form onSubmit={handleSubmit}>
        <div className={classes.imageSelect}>
          <Avatar
            sx={{
              width: 150,
              height: 150,
              margin: 2,
            }}
            src={`${selectedFile ? preview : image}`}
          />
          <div className={classes.inputImage}>
            <PhotoCameraIcon fontSize="large" />
            <input type="file" accept="image/*" onChange={onSelectFile} />
          </div>
          <div className={classes.data}>
            <TextField
              error={error}
              sx={{ margin: "5px 0px" }}
              variant="standard"
              value={values.phone}
              onChange={handleChange}
              label="Phone Number"
              name="phone"
              type="number"
              fullWidth
            />
          </div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Paper>
  );
};

export default UpdateProfile;
