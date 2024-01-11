import { useEffect } from "react";
import { useGetProductsQuery } from "../redux/services/productsApi";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { useNavigate, useSearchParams } from "react-router-dom";

const HomeScreen = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const pageParam = searchParams.get("page");
  console.log("Page:", pageParam);
  const {
    data: { products, page, pages } = {},
    error,
    isLoading,
    refetch,
  } = useGetProductsQuery({ keyword, pageParam });

  // homescreen not automatically updating after adding product, have to refresh to see new data.
  // this handles that.  may not be best practice.  but it works.
  useEffect(() => {
    refetch();
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
        {console.log(products)}
        {products?.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
      <Paginate page={page} pages={pages} keyword={keyword} />
    </div>
  );
};

export default HomeScreen;
