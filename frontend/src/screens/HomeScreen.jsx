import { useEffect } from "react";
import { useGetProductsQuery } from "../redux/services/productsApi";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useNavigate, useSearchParams } from "react-router-dom";

const HomeScreen = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const {
    data: products,
    error,
    isLoading,
    refetch,
  } = useGetProductsQuery(keyword);

  // homescreen not automatically updating after adding product, have to refresh to see new data.
  // this handles that.  may not be best practice.  but it works.
  useEffect(() => {
    refetch();
    if (keyword) {
      console.log("refetch:", keyword);
    }
  }, [keyword, refetch]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Message variant="danger">Error: {error}</Message>;
  }

  return (
    <div>
      <h1 className="text-center">Latest Products</h1>
      <Row>
        {products?.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomeScreen;
