import Pagination from "@mui/material/Pagination";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getAllProducts,
  getTotalNumberOfProducts,
} from "../../services/httpRequests";
import Loading from "../common/Loading";
import Product from "./Product";

const useStyles = makeStyles((theme) => ({
  products: {
    display: "grid",
    gridTemplateColumns: "24% 24% 24% 24%",
    gridColumnGap: "1px",
    gridRowGap: "1px",
  },
  pagination: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const classes = useStyles();

  useEffect(() => {
    getProducts();
    totalProductsCount();
    setLoading(false);
  }, [pageNumber]);

  async function getProducts() {
    try {
      const { data } = await getAllProducts(pageNumber, pageSize);
      setProducts(data);
    } catch (ex) {
      toast.error(ex.response.data);
    }
  }

  async function totalProductsCount() {
    try {
      const { data } = await getTotalNumberOfProducts();
      const pageNumbers = Math.ceil(data / pageSize);
      setPageCount(pageNumbers);
    } catch (ex) {
      console.log(ex);
    }
  }

  const handlePageChange = (event) => {
    setPageNumber(event.target.textContent);
  };

  if (loading) {
    return <Loading type="cubes" color="#3365B5" />;
  }

  return (
    <>
      <div className={classes.products}>
        {products.map((product) => (
          <div key={product._id}>
            <Product data={product} />
          </div>
        ))}
      </div>
      {!loading && (
        <Pagination
          count={pageCount}
          color="primary"
          onChange={handlePageChange}
          hidePrevButton
          hideNextButton
          className={classes.pagination}
        />
      )}
    </>
  );
};

export default Products;
