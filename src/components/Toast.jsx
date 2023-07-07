import { Toast } from "react-bootstrap"
import PropTypes from 'prop-types';

function ScheduleToast({showToast, setToast}){


    return(
        <>
        <Toast onClose={() => setToast(false)} show={showToast} delay={10000} autohide>
        <Toast.Header>
          <strong className="me-auto">Bootstrap</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
      </Toast>
      </>
    )
}

ScheduleToast.propTypes = {
    showToast: PropTypes.bool.isRequired,
    setToast: PropTypes.func.isRequired,
  };

export default ScheduleToast;