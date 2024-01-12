import { useEffect } from "react";
import { useGetProductsQuery } from "../redux/services/productsApi";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import { useNavigate, useSearchParams } from "react-router-dom";

const HomeScreen = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const pageParam = searchParams.get("page");
  const {
    data: { products, page, pages } = {},
    error,
    isLoading,
    refetch,
  } = useGetProductsQuery({ keyword, pageParam });

  const filteredProducts = products
    ?.filter((x) => Number(x.rating) >= 4)
    .sort((a, b) => b.rating - a.rating.slice(0, 5));

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
      {!keyword && <ProductCarousel products={filteredProducts} />}

      <h1 className="text-center">Latest Products</h1>
      <Row>
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
