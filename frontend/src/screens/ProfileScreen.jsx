import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { userDetailRequest } from "../redux/reducers/userDetail.slice";
import { useNavigate } from "react-router-dom";
import { useGetUserByIdQuery } from "../redux/services/userDetailApi";

const ProfileScreen = () => {
  const id = useSelector((state) => state.user?.userInfo?.id);

  const { data: user, isLoading, error } = useGetUserByIdQuery(id);
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [username, setUsername] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(user);
  useEffect(() => {
    if (!id) {
      navigate("/login");
    }
  }, [navigate, id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
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
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
