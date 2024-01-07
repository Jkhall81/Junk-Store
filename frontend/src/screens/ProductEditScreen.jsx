import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Form, Button, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { useNavigate } from "react-router-dom";
import { useGetProductByIdQuery } from "../redux/services/productsApi";
import { useCreateProductMutation } from "../redux/services/productsApi";
import { usePatchProductMutation } from "../redux/services/productsApi";

const ProductEditScreen = () => {
  const { id } = useParams();
  const {
    data: product,
    isLoading,
    error,
  } = id ? useGetProductByIdQuery(id) : {};
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [createProduct] = useCreateProductMutation();
  const [patchProduct] = usePatchProductMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setImage(product.image);
      setPrice(product.price);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (id) {
      await patchProduct({
        id: product._id,
        name,
        image,
        price,
        brand,
        category,
        countInStock,
        description,
      });
    } else {
      const fileInput = e.target.querySelector('input[type="file"]');
      const file = fileInput.files[0];
      console.log(file);

      await createProduct({
        name,
        image: file,
        price,
        brand,
        category,
        countInStock,
        description,
      }).then((response) => {
        console.log(response);
      });
      navigate("/admin/productlist");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div>
        <Message variant="danger">Error: {error}</Message>
        <Link to="/" className="btn btn-light my-3">
          Go Back
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/admin/productlist">Go Back</Link>
      <FormContainer>
        <h1>Product Details</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            {product && product.image && (
              <div className="mb-2">
                <Image src={product.image} alt={product.name} fluid />
              </div>
            )}
            {!product || !product.image ? (
              <Form.Control
                type="file"
                placeholder="Enter Image"
                custom
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
            ) : null}
          </Form.Group>

          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="test"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="countInStock">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Count In Stock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              type="text"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button className="mt-3" type="submit" variant="primary">
            Submit
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default ProductEditScreen;
