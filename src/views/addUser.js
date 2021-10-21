import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import authApi from "../services/authApi";

export default function AddUser() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const history = useHistory();

  async function handleSubmit() {
    await authApi.addUser(username, name, lastname, password, role);   
  }

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Form.Group className="mb-3">
          <Form.Label>Ingrese su nombre:</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Nombre"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Ingrese su apellido:</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Apellido"
            onChange={(e) => {
              setLastname(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Ingrese su Email:</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Ingrese una contraseña:</Form.Label>
          <Form.Control
            required
            type="password"
            autoComplete="current-password"
            placeholder="Contraseña"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicSelect">
          <Form.Label>Ingrese un rol</Form.Label>
          <Form.Control
            required
            as="select"
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
            }}
          >
            <option>Selecciona un Rol</option>
            <option value="admin">Administrador</option>
            <option value="municipio">Municipio</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Button
            variant="primary"
            type="submit"
            size="lg"
            className={"full-width"}
          >
            Registrar nuevo usuario
          </Button>
        </Form.Group>
      </Form>
      <div>
        <Button
          variant="warning"
          size="lg"
          className={"full-width"}
          onClick={() => {
            history.push("/UsersDisabled");
          }}
        >
          Habilitar usuarios
        </Button>
      </div>
    </>
  );
}
