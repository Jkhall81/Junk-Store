/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  useGetProductByIdQuery,
  usePostProductReviewMutation,
} from "../redux/services/productsApi";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetReviewsQuery } from "../redux/services/reviewsApi";

const ProductScreen = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);

  const { id } = useParams();
  const {
    data: product,
    error,
    isLoading,
    refetch: productRefetch,
  } = useGetProductByIdQuery(id);
  const [postReview] = usePostProductReviewMutation();

  const [reviewMessage, setReviewMessage] = useState(null);
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const {
    data: reviews,
    isLoading: reviewsIsLoading,
    refetch,
  } = useGetReviewsQuery();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await postReview({
        name: `${userInfo.first_name} ${userInfo.last_name}`,
        rating,
        comment,
        product: product._id,
        user: userInfo._id,
      });
      setReviewMessage("Your review has been posted successfully!");
      setRating(" ");
      setComment(" ");
      refetch();
      productRefetch();
    } catch (error) {
      console.error("Error posting review:", error);
    }
  };

  if (isLoading || reviewsIsLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Message variant="danger">
        Error: {error.status} {error.data.detail || "Something went wrong!"}
      </Message>
    );
  }

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>

            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
                color={"#f8e825"}
              />
            </ListGroup.Item>

            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col xs="auto" className="my-1">
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <div className="d-grid">
                  <Button
                    onClick={addToCartHandler}
                    disabled={product.countInStock == 0}
                    variant="dark"
                    size="lg"
                  >
                    Add to Cart
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <br />
      <Row>
        <Col md={6}>
          <h4>Reviews</h4>
          {product.numReviews === 0 && (
            <Message variant="info">No Reviews</Message>
          )}
          <ListGroup variant="flush">
            {reviews
              .filter((x) => x.product === product._id)
              .map((review) => (
                <ListGroup.Item key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} color="#f8e825" />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </ListGroup.Item>
              ))}
            <ListGroup.Item>
              <h4>Write a Review</h4>
              {reviewMessage && (
                <Message variant="success">
                  Review submitted successfully!
                </Message>
              )}

              {userInfo ? (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as="select"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="">select...</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Meh</option>
                      <option value="3">3 - Decent</option>
                      <option value="4">4 - Nice</option>
                      <option value="5">5 - Amazing</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="comment">
                    <Form.Label>Review</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Button className="mt-4" type="submit" variant="primary">
                    Submit
                  </Button>
                </Form>
              ) : (
                <Message variant="info">
                  Please <Link to="/login">Login</Link> to write a review
                </Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default ProductScreen;
