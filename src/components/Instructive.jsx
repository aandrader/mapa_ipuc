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
        Somos la IGLESIA PENTECOSTAL UNIDA DE COLOMBIA.
        <br />
        En este mapa puede explorar y encontrar información acerca de la ubicación, horarios y redes sociales
        de cada una de las congregaciones ubicadas en el Valle de Aburrá.
        <br/>
        <br/>

          <ul>
            <li>Para mostrar las congregaciones que estén más cerca de usted, se solicita su ubicación, la cual se marcará con el ícono 
            <img src={"/LocationMarker.svg"} alt="" /></li>
            <li>Para ver la información de una congregación haz click en el ícono <img src={"/ChurchMarker.svg"} alt="" />
            </li>
            <li>Para buscar una congregación, haz click en el icono de busqueda a la derecha <img src={"/SearchIcon.svg"}/></li>
            <li>Para iniciar una ruta hacia una congregacion, haga click en el botón 'Ir al templo',
            el cual abrirá la aplicacion de Google Maps y te indicará cómo llegar.  </li>
            <br/>
            <em>
            ¿Puede una madre olvidar a su niño de pecho, y dejar de amar al hijo que ha dado a luz?
             Aun cuando ella lo olvidara, ¡yo no te olvidaré!. Isaías 49:15 </em>
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
