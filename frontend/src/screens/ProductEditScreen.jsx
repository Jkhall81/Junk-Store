import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { useGetUserByIdQuery } from "../redux/services/userDetailApi";
import { useUpdateMutation } from "../redux/services/updateApi";
import { useNavigate } from "react-router-dom";

const ProductEditScreen = () => {
  const { id } = useParams();
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const [username, setUsername] = useState("");
  const { data: user, refetch, isLoading, error } = useGetUserByIdQuery(id);
  const [update] = useUpdateMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setFirst_name(user.first_name);
      setLast_name(user.last_name);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    await update({
      id: user._id,
      username,
      first_name,
      last_name,
      isAdmin,
    });
    refetch();
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
      <Link to="/admin/userlist">Go Back</Link>
      <FormContainer>
        <h1>Edit User</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              autoComplete="username"
              placeholder="Enter Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="first_name">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter First Name"
              value={first_name}
              onChange={(e) => setFirst_name(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="last_name">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Last Name"
              value={last_name}
              onChange={(e) => setLast_name(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="isAdmin">
            <Form.Label>Admin Status</Form.Label>
            <Form.Check
              type="checkbox"
              label="IsAdmin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            ></Form.Check>
          </Form.Group>

          <Button className="mt-3" type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default ProductEditScreen;
