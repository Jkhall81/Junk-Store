import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { useGetOrderByIdQuery } from "../redux/services/orderApi";
import { useGetOrderItemByOrderIdQuery } from "../redux/services/orderApi";

const OrderScreen = () => {
  const { ...cart } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data: order } = useGetOrderByIdQuery({ id });
  const { data: orderItem } = useGetOrderItemByOrderIdQuery({ id });
  const [shippingAddress, setShippingAddress] = useState({});
  const name = JSON.parse(localStorage.getItem("userInfo"));
  console.log(order);
  // console.log(orderItem);
  // console.log(shippingAddress);

  useEffect(() => {
    if (orderItem) {
      const { shipping_address } = orderItem;
      setShippingAddress(shipping_address);
    }
  }, [orderItem]);

  const placeOrder = async () => {};
  return (
    <div>
      <Row>
        <h1>Order: {id}</h1>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                Name: {name.first_name} {name.last_name}
              </p>
              <p>
                <strong>Shipping: </strong>
                {shippingAddress.address}, {shippingAddress.city}{" "}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order?.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {orderItem?.order_items.length === 0 ? (
                <Message variant="info">No items in this order!</Message>
              ) : (
                <ListGroup variant="flush">
                  {orderItem?.order_items.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>

                        <Col md={4}>
                          {item.qty} X ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>
                    $
                    {orderItem?.order_items
                      .reduce((acc, x) => acc + Number(x.price), 0)
                      .toFixed(2)}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${order?.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${order?.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${order?.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderScreen;
