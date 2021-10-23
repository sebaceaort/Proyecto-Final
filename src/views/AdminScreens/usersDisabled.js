import { Table, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import authApi from "../../services/authApi";

export default function UsersDisabled() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    async function getUsers() {
      const disabledUsers = await authApi.getDisabledUsers();
      setUsers((oldUsers) => [...oldUsers, disabledUsers]);
    }
    getUsers();
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Email</th>
          <th>Habilitar Usuario</th>
        </tr>
      </thead>
      <tbody>
        {users[0]?.map((user, i) => {
          return (
            <tr key={user._id}>
              <td>{i + 1}</td>
              <td>{user.usName}</td>
              <td>{user.usLastName}</td>
              <td>{user.usEmail}</td>
              <td>
                <Button
                  variant="primary"
                  size="lg"
                  className={"full-width"}
                  onClick={() => {
                    authApi.updateUsers(user._id);
                    alert("Usuario Habilitado!");
                    window.location.reload();
                  } }
                >
                  Habilitar
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
