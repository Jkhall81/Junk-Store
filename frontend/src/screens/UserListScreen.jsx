import Message from "../components/Message";
import Loader from "../components/Loader";
import { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useGetUsersQuery } from "../redux/services/userApi";
import { userListRequest } from "../redux/reducers/user.slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: users, isLoading, error } = useGetUsersQuery();
  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    if (!isLoading) {
      if (userInfo.isAdmin) {
        dispatch(userListRequest(users));
      } else {
        navigate("/login");
      }
    }
  }, [dispatch, navigate, users, isLoading, userInfo.isAdmin]);

  const deleteHandler = (id) => {
    console.log("DELETEl", id);
  };

  return (
    <div>
      <h1>Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">Error: {error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>
                  {user.first_name} {user.last_name}
                </td>
                <td>{user.username}</td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-x" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit fa-lg"></i>
                    </Button>
                  </LinkContainer>

                  <Button
                    variant="danger"
                    className="mx-3 btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash fa-lg"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default UserListScreen;
