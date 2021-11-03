import React, { useState } from "react";
import { Form, Button, Modal, Spinner } from "react-bootstrap";
//import { MunicipioContext } from "../context/user-context"; //agregar contexto municipio
import firewareApi from "../services/fiwareApi"
import { useHistory } from "react-router";


const DeleteEntityButton = ({item}) => {
    const history = useHistory()
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
                history.push("/show-data")
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