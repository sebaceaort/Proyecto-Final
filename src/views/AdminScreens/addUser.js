import { useState, useEffect } from "react";
import { Button, InputGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import authApi from "../../services/authApi";
import fiwareApi from "../../services/fiwareApi";
import { Formik, Field } from "formik";
import { FaUserPlus, FaUsersCog } from "react-icons/fa";
import { Roles } from "../../enums/Roles";

export default function AddUser() {
  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
  const [role, setRole] = useState({});
  const [roles, setRoles] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const history = useHistory();

  async function handleSubmit(valores) {
    await authApi.addUser(
      valores.username,
      valores.name,
      valores.lastname,
      valores.password,
      valores.role,
      valores.selectedMunicipio,
      history
    );
  }

  useEffect(() => {
    setRole("");
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
      <Formik
        initialValues={{
          name: "",
          lastname: "",
          username: "",
          password: "",
          role,
          selectedMunicipio: "",
        }}
        validate={(valores) => {
          let errores = {};
          if (!valores.name) {
            errores.name = "Por favor ingrese un nombre";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.name)) {
            errores.name = "El nombre solo puede contener letras y espacios";
          } else if (valores.name.trim() === "") {
            errores.name = "Por favor ingrese un nombre que no este vacío";
          }
          if (!valores.lastname) {
            errores.lastname = "Por favor ingrese un apellido";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.lastname)) {
            errores.lastname =
              "El apellido solo puede contener letras y espacios";
          } else if (valores.lastname.trim() === "") {
            errores.lastname =
              "Por favor ingrese un apellido que no este vacío";
          }
          if (!valores.username) {
            errores.username = "Por favor ingrese un email";
          } else if (
            !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
              valores.username
            )
          ) {
            errores.username = "El formato de email no es correcto";
          } else if (valores.username.trim() === "") {
            errores.username = "Por favor ingrese un email que no este vacío";
          }
          if (!valores.password) {
            errores.password = "Por favor ingrese una contraseña";
          } else if (valores.password.replace(" ", "") !== valores.password) {
            errores.password = "Por favor ingrese una contraseña sin espacios";
          }
          if (valores.role === "Selecciona un Rol") {
            errores.role = "Por favor selecciona un rol";
          }
          return errores;
        }}
        onSubmit={(valores, { resetForm }) => {
          resetForm();
          console.log("Formulario enviado");
          cambiarFormularioEnviado(true);
          setTimeout(() => cambiarFormularioEnviado(false), 1000);
          handleSubmit(valores);
        }}
      >
        {({
          values,
          errors,
          handleSubmit,
          handleChange,
          handleBlur,
          touched,
        }) => (
          <form className="row smartFontModal" onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label htmlFor="name">Ingrese su nombre: </label>
              <div className="w-100">
                <input
                  className="mb-1 mt-2 w-100"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Ingrese el nombre"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.name && errors.name && (
                  <div style={{ color: "red" }}>{errors.name}</div>
                )}
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="lastname">Ingrese su apellido: </label>
              <div className="w-100">
                <input
                  className="mb-1 mt-2 w-100"
                  type="text"
                  id="lastname"
                  name="lastname"
                  placeholder="Ingrese el apellido"
                  value={values.lastname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.lastname && errors.lastname && (
                  <div style={{ color: "red" }}>{errors.lastname}</div>
                )}
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="username">Ingrese su Email: </label>
              <div className="w-100">
                <input
                  className="mb-1 mt-2 w-100"
                  type="email"
                  id="username"
                  name="username"
                  placeholder="Ingrese el email"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.username && errors.username && (
                  <div style={{ color: "red" }}>{errors.username}</div>
                )}
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="password">Ingrese una contraseña: </label>
              <div className="w-100">
                <input
                  className="mb-1 mt-2 w-100"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Ingrese una contraseña"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.password && errors.password && (
                  <div style={{ color: "red" }}>{errors.password}</div>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="role">Rol:</label>
              <InputGroup className="mt-2 mb-1 select-rol">
                <Field
                  name="role"
                  as="select"
                  value={values.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option>Selecciona un Rol</option>
                  {roles[0]?.map((rol, i) => {
                    return (
                      <>
                        <option key={role.id} value={role.name}>
                          {rol.name}
                        </option>
                      </>
                    );
                  })}
                </Field>
              </InputGroup>
              {touched.role && errors.role && (
                <div style={{ color: "red" }}>{errors.role}</div>
              )}
            </div>
            {values.role === Roles.municipio && (
              <div>
                <label htmlFor="selectedMunicipio">
                  Ingrese el municipio correspondiente:{" "}
                </label>
                <InputGroup className="mt-2 mb-3">
                  <Field
                    name="selectedMunicipio"
                    as="select"
                    value={values.selectedMunicipio}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option>Municipios...</option>
                    {municipios[0]?.map((muni) => {
                      return (
                        <option key={muni.id} value={muni.id}>
                          {muni.name.value}
                        </option>
                      );
                    })}
                  </Field>
                </InputGroup>
                {touched.selectedMunicipio && errors.selectedMunicipio && (
                  <div style={{ color: "red" }}>{errors.selectedMunicipio}</div>
                )}
              </div>
            )}
            <div>
              <Button
                variant="primary"
                type="submit"
                size="lg"
                className="full-width btn-add-user"
              >
                <FaUserPlus className="mb-1 fs-3" />
                <span className="ms-2">Registrar nuevo usuario</span>
              </Button>
              {formularioEnviado && (
                <p style={{ color: "green" }}>Usuario creado con éxito!</p>
              )}
            </div>
          </form>
        )}
      </Formik>

      <div>
        <Button
          variant="warning"
          size="lg"
          className="full-width btn-user "
          onClick={() => {
            history.push("/UsersDisabled");
          }}
        >
          <FaUsersCog className="fs-2" />
          <span className="ms-2"> Gestionar usuarios</span>
        </Button>
      </div>
    </>
  );
}
