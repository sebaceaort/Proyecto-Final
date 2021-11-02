import React, { useState, useContext } from "react";
import { Form, Button, Image, Modal, Spinner, InputGroup } from "react-bootstrap";
import { MunicipioContext } from "../context/user-context"; //agregar contexto municipio
import firewareApi from "../services/fiwareApi"


const DeleteEntityButton = ({item}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
     

    function DeleteEntityModal() {
        const [animate, setAnimate] = useState(false);
        async function handleSubmit() {
            const data = await firewareApi.deleteEntity(item.type, item.id);
            if (data) {
                alert(item.name.value + " eliminado con éxito")
                handleClose();
            }
            else {
                setAnimate(false);
                alert("Error")
            }
        }

        return ( <Form
            onSubmit={(e) => {
                e.preventDefault();
                setAnimate(true);
                handleSubmit();
            }}            
        >
            <Form.Group className="mb-3">
            <Form.Label>¿Está seguro que desea elimniar el {item.type} {item.name.value} ?</Form.Label>
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
                            {!animate ? "Confirmar" : "Eliminando..."}
                        </Button>
                    </Form.Group>
        </Form>)
    }


    return (
        <>
            <Button variant="danger" onClick={handleShow}>
                Delete
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <DeleteEntityModal />
                </Modal.Body>
            </Modal>
        </>
    );

}

export default DeleteEntityButton;