import { useState, useEffect } from "react";
import { Button, InputGroup, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import authApi from "../../services/authApi";
import fiwareApi from "../../services/fiwareApi";
import { Formik, Field } from "formik";
import { FaUserPlus, FaUsersCog } from "react-icons/fa";
import { Roles } from "../../enums/Roles";

export default function AddUser() {
  const [formularioEnviado, cambiarFormularioEnviado] = useState(0);
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

    try {
      await authApi.addUser(
        valores.username,
        valores.name,
        valores.lastname,
        valores.password,
        valores.role,
        valores.selectedMunicipio,
        history
      );
      cambiarFormularioEnviado(1);
      setTimeout(() => cambiarFormularioEnviado(0), 1000);
    } catch (error) {
      cambiarFormularioEnviado(2);
      setTimeout(() => cambiarFormularioEnviado(0), 1000);
    }
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

  function validateSelectedMuncipio(municipio) {
    return municipios[0].find((m) => m.id === municipio);
  }

  function validateSelectedRole(role) {
    return roles[0].find((r) => r.name === role)
  }

  return (
    <>
      <Card>
        <Card.Header>Alta de usuarios</Card.Header>
        <Card.Body>
          <Formik
            initialValues={{
              name: "",
              lastname: "",
              username: "",
              password: "",
              role: "",
              selectedMunicipio: "",
            }}
            validate={(valores) => {
              let errores = {};
              if (!valores.name) {
                errores.name = "Por favor ingrese un nombre";
              } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.name)) {
                errores.name =
                  "El nombre solo puede contener letras y espacios";
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
                errores.username =
                  "Por favor ingrese un email que no este vacío";
              }
              if (!valores.password) {
                errores.password = "Por favor ingrese una contraseña";
              } else if (
                valores.password.replace(" ", "") !== valores.password
              ) {
                errores.password =
                  "Por favor ingrese una contraseña sin espacios";
              } else if (!/^[a-zA-ZÀ-ÿ0-9\s]{6,25}$/.test(valores.password)) {
                errores.password =
                  "La contraseña no debe contener caracteres especiales";
              }
              if (valores.role === "") {
                errores.role = "Por favor selecciona un rol";
              } else if (valores.role === "Selecciona un Rol") {
                errores.role = "Por favor selecciona un rol";
              }
              else if (!validateSelectedRole(valores.role)) {
                errores.role =
                  "El rol seleccionado es invalido";
              }
              if (valores.role === "municipio") {
                if (valores.selectedMunicipio === "") {
                  errores.selectedMunicipio =
                    "Por favor selecciona un municipio";
                } else if (valores.selectedMunicipio === "Municipios...") {
                  errores.selectedMunicipio =
                    "Por favor selecciona un municipio";
                } else if (!validateSelectedMuncipio(valores.selectedMunicipio)) {
                  errores.selectedMunicipio =
                    "El municipio seleccionado es invalido";
                }
              }
              return errores;
            }}
            onSubmit={(valores, { resetForm }) => {
              resetForm();

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
                      placeholder="Nombre..."
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      maxlength="60"
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
                      placeholder="Apellido..."
                      value={values.lastname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      maxlength="60"
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
                      placeholder="Email..."
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      maxLength="80"
                      minLength="7"
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
                      placeholder="Contraseña..."
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      minLength="6"
                      maxlength="20"
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
                      <option readonly>Selecciona un Rol</option>
                      {roles[0]?.map((rol, i) => {
                        return (
                          <>
                            <option readonly key={role.id} value={role.name}>
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
                        <option readonly>Municipios...</option>
                        {municipios[0]?.map((muni) => {
                          return (
                            <option readonly key={muni.id} value={muni.id}>
                              {muni.name.value}
                            </option>
                          );
                        })}
                      </Field>
                    </InputGroup>
                    {touched.selectedMunicipio && errors.selectedMunicipio && (
                      <div style={{ color: "red" }}>
                        {errors.selectedMunicipio}
                      </div>
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

                  {formularioEnviado === 1 ? (
                    <p style={{ color: "green" }}>Usuario creado con éxito!</p>
                  ) : formularioEnviado === 2 ? (
                    <p style={{ color: "red" }}>
                      Hubo un problema al crear el usuario!
                    </p>
                  ) : null}
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
                history.push("/userManagement");
              }}
            >
              <FaUsersCog className="fs-2" />
              <span className="ms-2"> Gestionar usuarios</span>
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
