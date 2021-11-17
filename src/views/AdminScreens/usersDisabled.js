import { Table, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import authApi from "../../services/authApi";
import DeleteUserButton from "../../components/AdminButtons/DeleteUserButton";
import UpdateUserButton from "../../components/AdminButtons/EditUserButton";

export default function UsersDisabled() {
  const history = useHistory();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const allUsers = await authApi.getAllUsers();
      setUsers((oldUsers) => [...oldUsers, allUsers]);
    }
    getUsers();
  }, []);

  return (
    <>
      <Table className="smartFontModal" striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Gestionar usuarios</th>
            <th>Actualizar datos</th>
            <th>Eliminar usuario</th>
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
                <>
                  <td>
                    {(!user.usActive && (
                      <Button
                        variant="success"
                        size="lg"
                        className={"full-width btnEnable"}
                        onClick={() => {
                          authApi.changeStateUser(user._id);
                          alert("Usuario Habilitado!");
                          history.replace("/UsersDisabled");
                        }}
                      >
                        Habilitar
                      </Button>
                    )) || (
                      <Button
                        variant="secondary"
                        size="lg"
                        className={"full-width"}
                        onClick={() => {
                          authApi.changeStateUser(user._id);
                          alert("Usuario Deshabilitado!");
                          history.replace("/UsersDisabled");
                        }}
                      >
                        Deshabilitar
                      </Button>
                    )}
                  </td>
                </>
                <td>
                  <UpdateUserButton user={user} />
                </td>
                <td>
                  <DeleteUserButton user={user} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
