import { Table, Button, Modal, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import authApi from "../../services/authApi";

export default function UsersDisabled() {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    async function getUsers() {
      const allUsers = await authApi.getAllUsers();
      setUsers((oldUsers) => [...oldUsers, allUsers]);
    }
    getUsers();
  }, []);

   async function deleteUserById (user) {
    await authApi.deleteUser(user,history)
  }

  const FormModalUpdateUser = (user) => {
    console.log(user);
    return (
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>{user.usName}</Form.Label>
          <Form.Control
            type="text"
            placeholder={user.usName}
            title={user.usName}
          />
        </Form.Group>
      </Form>
    );
  };

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
                          authApi.changePassword(user._id);
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
                  <Button
                    variant="primary"
                    size="lg"
                    className={"full-width"}
                    onClick={() => {
                      handleShow();
                      console.log();
                      // alert("Usuario Deshabilitado!");
                      // history.replace("/UsersDisabled");
                    }}
                  >
                    Actualizar
                  </Button>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                      <FormModalUpdateUser user={user} />
                    </Modal.Body>
                  </Modal>
                </td>
                <td>
                  <Button
                    variant="danger"
                    size="lg"
                    className={"full-width"}
                    onClick={async () => {
                      // console.log(user._id)
                      await deleteUserById(user);
                    }}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
