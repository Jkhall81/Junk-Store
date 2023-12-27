import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { userDetailRequest } from "../redux/reducers/userDetail.slice";
import { useNavigate } from "react-router-dom";
import { useGetUserByIdQuery } from "../redux/services/userDetailApi";
import { useUpdateMutation } from "../redux/services/updateApi";
import { userUpdateRequest } from "../redux/reducers/update.slice";

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
      </Col>
    </Row>
  );
};

export default ProfileScreen;
