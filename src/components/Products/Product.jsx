import React, { useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { formatDate } from "../../helpers/formatDate";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import numeral from "numeral";

const useStyles = makeStyles((theme) => ({
  actions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const Product = ({ data }) => {
  const [favouriteIcon, setFavouriteIcon] = useState(true);
  const { title, description, user, image, price, publishAt } = data;
  const handleFavoriteIconClick = () => {
    setFavouriteIcon((prev) => !prev);
  };

  const classes = useStyles();
  return (
    <div>
      <Card
        sx={{
          maxWidth: 300,
          maxHeight: 350,
          margin: "10px",
          borderRadius: "15px",
        }}
      >
        <CardHeader
          sx={{ maxHeight: 50 }}
          avatar={
            <Avatar
              sx={{ backgroundColor: "grey" }}
              aria-label="recipe"
              src={user?.image}
              alt="R"
            ></Avatar>
          }
          title={user?.name}
          subheader={formatDate(publishAt)}
        />
        <CardMedia
          component="img"
          height="180"
          image={image}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="h6" sx={{ fontSize: "20px" }}>
            {title}
          </Typography>
          <Typography
            variant="soan"
            sx={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              display: "inline-block",
              width: "250px",
              fontSize: "15px",
            }}
          >
            {description}
          </Typography>
          <div className={classes.actions}>
            <Typography
              variant="h6"
              sx={{
                fontSize: "18px",
                color: "#0a326b",
                textDecoraion: "none",
              }}
            >
              {/* {price} PKR */}
              {numeral(price).format("0,0.00")} PKR
            </Typography>
            {favouriteIcon && (
              <IconButton
                aria-label="add to favorites"
                onClick={handleFavoriteIconClick}
              >
                <FavoriteBorderIcon sx={{ color: "red" }} />
              </IconButton>
            )}
            {!favouriteIcon && (
              <IconButton
                aria-label="add to favorites"
                onClick={handleFavoriteIconClick}
              >
                <FavoriteIcon sx={{ color: "red" }} />
              </IconButton>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Product;
