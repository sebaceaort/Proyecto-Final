import React, { useState } from "react";
import { Form, Button, Image, Modal, Spinner, InputGroup } from "react-bootstrap";
//import { MunicipioContext } from "../context/user-context"; //agregar contexto municipio
import firewareApi from "../services/fiwareApi"
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

//agregar POST
function UpdateEntityModal({ item, handleClose }) {

    const [animate, setAnimate] = useState(false);
    const [datos, setDatos] = useState({
        name: item.name.value,
        description: item.description?.value,
        indicatorType: item.indicatorType?.value
    });
    const handleChangeDatos = (value, prop) => {
        setDatos({ ...datos, [prop]: value });
    };
    const entityType = item.type;


    async function handleSubmit() {
        try {
            const data = await firewareApi.updateEntity(datos, item.id)
            alert(JSON.stringify(datos.name) + " fue modificado exitosamente")
            handleClose();
        }
        catch (error) {
            setAnimate(false);
            alert("Ups! Algo salió mal!");
        }
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
                <Form.Group className="mb-3" controlId="formNombreMun">
                    <Form.Label>Nombre del {entityType}:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Nombre"
                        value={datos.name}                             //ver VALIDATIONS!!!!!!!!!!!!
                        onChange={(nombre) => {
                            handleChangeDatos(nombre.target.value, "name");
                        }}
                    />
                </Form.Group>

                {entityType === "Indicator" ?   //SI ES INDICATOR UN COSA
                    <>
                        <Form.Label>Tipo de dato:</Form.Label>
                        <InputGroup className="mb-3" controlId="formNombreMun">

                            <Form.Control
                                required
                                type="text"
                                value={datos.indicatorType}
                                disabled readonly //ver VALIDATIONS!!!!!!!!!!!!
                            />

                            <DropdownButton align="end" id="dropdown-menu" onSelect={(tipoDato) => {
                                handleChangeDatos(tipoDato, "indicatorType")
                            }}>

                                <Dropdown.Item eventKey="Número">Número</Dropdown.Item>
                                <Dropdown.Item eventKey="Índice">Índice</Dropdown.Item>
                                <Dropdown.Item eventKey="Porcentaje">Porcentaje</Dropdown.Item>
                            </DropdownButton>

                        </InputGroup>

                        <Form.Group className="mb-3" controlId="formDescripcion">
                            <Form.Label>Descripcion:</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                value={datos.description}
                                placeholder="Descripcion"

                                //ver VALIDATIONS!!!!!!!!!!!!
                                onChange={(descripcion) => {
                                    handleChangeDatos(descripcion.target.value, "description")
                                }} />
                        </Form.Group></>

                    : null

                }



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
                        {!animate ? "Editar" : "Loading..."}
                    </Button>
                </Form.Group>
            </Form>
        </div>
    );
}

const UpdateEntityButton = ({ item }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="secondary" onClick={handleShow}>
                Update
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <UpdateEntityModal item={item} handleClose={handleClose} />
                </Modal.Body>
            </Modal>
        </>
    );
}
export default UpdateEntityButton;
