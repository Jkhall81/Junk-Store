import Container from "react-bootstrap/Container";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../redux/reducers/user.slice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);
  const handleLogout = () => {
    dispatch(userLogout());
    navigate("/");
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container fluid>
          <LinkContainer to="/">
            <Navbar.Brand>Junk Shop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart px-1"></i>Cart
                </Nav.Link>
              </LinkContainer>
              {!userInfo ? (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user px-1"></i>Login
                  </Nav.Link>
                </LinkContainer>
              ) : (
                <NavDropdown
                  title={
                    <>
                      <i className="fas fa-user px-1"></i>
                      {userInfo.username}
                    </>
                  }
                  id="username"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>
                      <i className="fas fa-user px-1"></i>Profile
                    </NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={handleLogout}>
                    <i className="fas fa-user px-1"></i>Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              <LinkContainer to="/register">
                <Nav.Link>
                  <i className="fas fa-user px-1"></i>Register
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
