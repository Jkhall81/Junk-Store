import { useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { useGetProductByIdQuery } from "../redux/services/productsApi";
import { addToCart } from "../redux/reducers/cart.slice";
import { useDispatch, useSelector } from "react-redux";

const CartScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const qty = parseInt(new URLSearchParams(location.search).get("qty"));

  const { data: product, error, isLoading } = useGetProductByIdQuery(id);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  useEffect(() => {
    if (product) {
      console.log(" useeffect - dispatching addtocart");
      dispatch(addToCart({ product, qty }));
    }
  }, [dispatch, product, qty]);

  const removeFromCartHandler = (id) => {
    console.log("remove", id);
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant="info">
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link key={item._id} to={`/product/${item._id}`}>
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={3}>
                    <Form.Control
                      as="select"
                      defaultValue={item.qty}
                      onChange={(e) => {
                        dispatch(
                          addToCart({
                            product: item,
                            qty: Number(e.target.value),
                          })
                        );
                      }}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              </h2>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
