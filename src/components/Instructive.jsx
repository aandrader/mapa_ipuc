import { Modal, Button } from "react-bootstrap";
import { useState } from "react";

function Instructive() {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>¡Bienvenido a Mapa Ipuc!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Somos la Iglesia Pentecostal Unida de Colombia. 
        <br />
        En este mapa puedes explorar y encontrar información acerca de la ubicación, horarios y redes sociales de cada una de las congregaciones que hay.
        <br/>
        <br/>

          <ul>
            <li>Para mostrarte las congregaciones que esten más cerca de ti solicitamos tu ubicación que se marcará con el icono 
            <img src={"/LocationMarker.svg"} alt="" /></li>
            <li>Para ver la información de una congregación haz click en su icono <img src={"/ChurchMarker.svg"} alt="" />
            </li>
            <li>Para buscar una congregacion, haz click en el icono de busqueda a la derecha <img src={"/SearchIcon.svg"}/></li>
            <li>Para iniciar una ruta hacia una congregacion, haz click en el botón 'Ir al templo',
            el cual abrirá la aplicacion de Google Maps y te indicará donde se encuentra.  </li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Instructive;
