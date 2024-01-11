import Message from "../components/Message";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../redux/services/productsApi";
import { useDeleteProductByIdMutation } from "../redux/services/productsApi";

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);
  const {
    data: { products } = {},
    isLoading,
    refetch,
    error,
  } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductByIdMutation();

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      console.log("admin status");
    } else {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    refetch();
  }, []);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
    }
    refetch();
  };

  const createProductHandler = (product) => {
    // create product
  };

  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <LinkContainer to="/admin/product/edit">
            <Button className="my-3" onClick={createProductHandler}>
              <i className="fas fa-plus"></i> Create Product
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">Error: {error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/edit/${product._id}`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit fa-lg"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    onClick={() => deleteHandler(product._id)}
                    variant="danger"
                    className="mx-3 btn-sm"
                  >
                    <i className="fas fa-trash fa-lg"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ProductListScreen;
