import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";
import { useGetUserByIdQuery } from "../redux/services/userDetailApi";
import { useUpdateMutation } from "../redux/services/updateApi";
import { userUpdateRequest } from "../redux/reducers/update.slice";
import { useGetOrdersQuery } from "../redux/services/orderApi";

const ProfileScreen = () => {
  const email = useSelector((state) => state.user.userInfo.username);
  const id = useSelector((state) => state.user?.userInfo?.id);
  const { data: user, isLoading, error } = useGetUserByIdQuery(id);
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [username, setUsername] = useState("");
  const [update] = useUpdateMutation();
  const {
    data: orders,
    isLoading: ordersIsLoading,
    error: ordersError,
  } = useGetOrdersQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/login");
    } else {
      setFirst_name(user?.first_name || "");
      setLast_name(user?.last_name || "");
      setUsername(email);
    }
  }, [navigate, user, id, email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("initial id:", id);
    if (password != password2) {
      console.log("passwords dont match");
    } else if (password == password2) {
      console.log("updating with password");
      console.log(id);
      try {
        const userData = await update({
          id,
          username,
          first_name,
          last_name,
          password,
        }).unwrap();
        dispatch(
          userUpdateRequest({
            ...userData,
          })
        );
        location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    if (error.data?.password) {
      return (
        <div>
          <Message variant="danger">Error: {error.data.password[0]}</Message>
          <Link to="/" className="btn btn-light my-3">
            Go Back
          </Link>
        </div>
      );
    } else {
      <div>
        return <Message variant="danger">Error: {error.data?.detail}</Message>;
        <Link to="/" className="btn btn-light my-3">
          Go Back
        </Link>
      </div>;
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              required
              autoComplete="username"
              placeholder="Enter Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password2">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              autoComplete="new-password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="first_name">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Enter First Name"
              value={first_name}
              onChange={(e) => setFirst_name(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="last_name">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Enter Last Name"
              value={last_name}
              onChange={(e) => setLast_name(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button className="mt-3" type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {ordersIsLoading ? (
          <Loader />
        ) : ordersError ? (
          <Message variant="danger">{ordersError}</Message>
        ) : (
          <Table striped responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders
                ?.filter((x) => x.user === id)
                .map((order, index) => (
                  <tr key={index}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>${order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className="btn-sm">Details</Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};
export default ProfileScreen;
