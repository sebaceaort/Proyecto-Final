import React, { useContext, useState } from "react";
import { Form, Button, Image, Modal, Spinner } from "react-bootstrap";
import { UpdateContext } from "../../context/update-context";
import firewareApi from "../../services/fiwareApi";

//agregar POST

const IndicatorDataButton = ({ item }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function IndicatorDataModal() {
    const [animate, setAnimate] = useState(false);

    const [datos, setDatos] = useState({
      actMonto: 0,
    });

    const handleChangeDatos = (value, prop) => {
      setDatos({ ...datos, [prop]: value });
    };

    const { setUpdate } = useContext(UpdateContext);
    async function handleSubmit() {
      const data = await loadDataIndicator(item.id);
      async function loadDataIndicator(id) {
        return await firewareApi.loadData(datos, id);
      }

      if (data) {
        alert(
          "Datos de " + JSON.stringify(item.name) + " fue agregada exitosamente"
        );
        handleClose();
      } else {
        setAnimate(false);
        alert("Error");
      }
      setUpdate((state) => !state);
    }

    return (
      <div className="container-login">
        <Image
          src="https://pbs.twimg.com/media/EGnVk29XYAMpxVX.jpg"
          fluid
          className="centered-image"
        />
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            setAnimate(true);
            handleSubmit();
          }}
        >
          <Form.Group className="mb-3" controlId="formIndicadorMonto">
            <Form.Label>Monto actual:</Form.Label>
            <Form.Control
              required
              type="Integer"
              placeholder="Ingrese el monto actual" //ver VALIDATIONS!!!!!!!!!!!!
              onChange={(monto) => {
                handleChangeDatos(monto.target.value, "actMonto");
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Button
              variant="primary"
              type="submit"
              size="lg"
              className={"full-width"}
            >
              {animate ? (
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                ""
              )}
              {!animate ? "Agregar data indicador" : "Loading..."}
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }

  return (
    <>
      <Button className="btn-load-indicator" onClick={handleShow}>
        Cargar data indicador
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <IndicatorDataModal />
        </Modal.Body>
      </Modal>
    </>
  );
};
export default IndicatorDataButton;
