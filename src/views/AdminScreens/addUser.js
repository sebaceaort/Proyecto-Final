import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import authApi from "../../services/authApi";
import fiwareApi from "../../services/fiwareApi";

export default function AddUser() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState({});
  const [roles, setRoles] = useState([]);
  const [municipio, setMunicipio] = useState({});
  const [selectedMunicipio, setSelectedMunicipio] = useState({});
  const [municipios, setMunicipios] = useState([]);
  const history = useHistory();

  async function handleSubmit() {
    await authApi.addUser(username, name, lastname, password, role, municipio);
  }

  useEffect(() => {
    async function getRoles() {
      const roles = await authApi.getRoles();
      setRoles((oldRoles) => [...oldRoles, roles]);
    }
    async function getMunicipios() {
      const allMunicipios = await fiwareApi.getDataByType("Municipio");

      setMunicipios((oldMunicipios) => [...oldMunicipios, allMunicipios]);
    }
    getRoles();
    getMunicipios();
  }, []);

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
            {roles[0]?.map((rol, i) => {
              return (
                <>
                  <option key={i} value={role.name}>
                    {rol.name}
                  </option>
                </>
              );
            })}
          </Form.Control>
        </Form.Group>
        {role !== "admin" && (
          <Form.Group className="mb-3">
            <Form.Label>Ingrese el municipio correspondiente</Form.Label>
            <Form.Select
              required
              value={selectedMunicipio}
              onChange={(e) => {
                // e.preventDefault()
                // console.log(e)
                setMunicipio(e.target.value);
                setSelectedMunicipio(e.innerText);
              }}
            >
              <option>Municipios...</option>
              {municipios[0]?.map((muni) => {
                return (
                  <option key={muni.id} value={muni.id}>
                    {muni.name.value}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
        )}
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
          Gestionar usuarios
        </Button>
      </div>
    </>
  );
}
