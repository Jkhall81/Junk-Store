import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword) {
      navigate(`/?keyword=${keyword}&page=2`);
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        className="mr-2 ml-sm-5"
      />
      <Button type="submit" variant="outline-success" className="p-2">
        submit
      </Button>
    </Form>
  );
};

export default SearchBox;
