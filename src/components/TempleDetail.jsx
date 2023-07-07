import PropTypes from "prop-types";
import { defaultSchedule } from "../utils/data";

function TempleDetail({ templeData, closeTempleDetail }) {

  function templeRoute() {
    const url = "https://www.google.com/maps/place/";
    window.open(url + templeData.coordenadas.join(","));
  }
  return (
    <>
      <div className="temple-detail-container">
        <div className="card text-center h-100 w-100 rounded-4 overflow-auto">
          <img src="/logo_ipuc.png" className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title fs-2 ">{templeData.nombre}</h5>
          </div>
          <ul className="list-group list-group-flush">
            <div className="container">
              <div className="row p-4 d-flex justify-content-center">
                <div className="col-8 text-start fs-6">
                  <b>Horarios</b> <br />
                  <ul className="list-group  list-group-flush  ">
                    {templeData.horarios[0] != null
                      ? templeData.horarios.map((service) => (
                          <li key={service.dia}>
                            <b>{service.dia}</b>: {service.hora}
                          </li>
                        ))
                      : defaultSchedule.map((service) => (
                          <li key={service.dia}>
                            <b>{service.dia}</b>: {service.hora}
                          </li>
                        ))}
                  </ul>
                </div>
                {templeData.facebook != "" || templeData.youtube != "" ? (
                  <div className="col d-flex align-content-around flex-wrap">
                    {templeData.facebook != "" ? (
                      <a
                        className="  btn facebookButton d-flex justify-content-center"
                        target="_blank"
                        rel="noreferrer"
                        href={templeData.facebook}
                      >
                        <img src="/facebookIcon.svg" />
                      </a>
                    ) : null}
                    {templeData.youtube != "" ? (
                      <a
                        className="  btn youtubeButton d-flex justify-content-center"
                        target="_blank"
                        rel="noreferrer"
                        href={templeData.youtube}
                      >
                        <img src="/youtubeIcon.svg" />
                      </a>
                    ) : null}
                    {templeData.pagina != "" ? (
                      <a
                        className="  btn pageButton d-flex justify-content-center"
                        target="_blank"
                        rel="noreferrer"
                        href={templeData.pagina}
                      >
                        <img src="/pageIcon.png" />
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          </ul>
          <div className="card-footer">
            <button
              onClick={() => {
                closeTempleDetail();
              }}
              className="card-link btn defaultButton"
            >
              Cerrar
            </button>
            <button
              onClick={templeRoute}
              className="card-link btn defaultButton"
            >
              Ir al templo
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
TempleDetail.propTypes = {
  templeData: PropTypes.object.isRequired,
  closeTempleDetail: PropTypes.func.isRequired,
};

export default TempleDetail;
