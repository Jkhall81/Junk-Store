import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { useRegisterMutation } from "../redux/services/registerApi";
import { userRegisterRequest } from "../redux/reducers/register.slice";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/services/userApi";
import { userLoginRequest } from "../redux/reducers/user.slice";

const RegisterScreen = () => {
  const [register, { isLoading, error }] = useRegisterMutation();
  const [login] = useLoginMutation();
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [username, setUsername] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const userData = await register({
        username,
        password,
        password2,
        first_name,
        last_name,
      }).unwrap();
      dispatch(userRegisterRequest({ userData }));
      setUsername("");
      setPassword("");
      setPassword2("");
      setFirst_name("");
      setLast_name("");
      const userLoginData = await login({
        username,
        password,
      }).unwrap();
      dispatch(userLoginRequest({ ...userLoginData }));
      navigate("/");
    } catch (error) {
      console.log(error);
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
    <FormContainer>
      <h1>Register</h1>
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
            required
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
            required
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
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Have an Account? <Link to={"/login"}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
