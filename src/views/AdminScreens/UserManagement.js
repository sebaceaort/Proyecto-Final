import { Table, Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/user-context";
import { useHistory } from "react-router-dom";
import authApi from "../../services/authApi";
import DeleteUserButton from "../../components/AdminButtons/DeleteUserButton";
import UpdateUserButton from "../../components/AdminButtons/EditUserButton";
import { ImUserMinus, ImUserPlus } from "react-icons/im";

export default function UserManagement() {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getUsers() {
      const allUsers = await authApi.getAllUsers();
      setUsers((oldUsers) => [
        ...oldUsers,
        allUsers.filter((us) => us.usEmail !== user.usEmail),
      ]);
    }
    getUsers();
  }, [user]);

  return (
    <>
      <Table className="smartFontModal" striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Rol</th>
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
                <td>{user.usRole}</td>
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
                          history.replace("/userManagement");
                        }}
                      >
                        <ImUserPlus className="mb-1"/> Habilitar
                      </Button>
                    )) || (
                      <Button
                        variant="secondary"
                        size="lg"
                        className={"full-width"}
                        onClick={() => {
                          authApi.changeStateUser(user._id);
                          alert("Usuario Deshabilitado!");
                          history.replace("/userManagement");
                        }}
                      >
                        <ImUserMinus className="mb-1"/> Deshabilitar
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
