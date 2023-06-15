import PropTypes from "prop-types";

function TempleDetail({ templeData, closeTempleDetail }) {
  // console.log(" - - templeDetail")
  function templeRoute() {
    const url = "https://www.google.com/maps/place/";
    window.open(url + templeData.coordenadas.join(","));
  }
  return (
    <>
      <div className="temple-detail-container">
        <div className="card text-center h-100 w-100 rounded-4 ">
          <img
            src="/logo_ipuc.png"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title fs-1 ">{templeData.name}</h5>
            <p className="card-text"></p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Horarios</li>
            <li className="list-group-item">Facebook</li>
            <li className="list-group-item">Instagram</li>
          </ul>
          {/* <div className="card-body">
            
          </div> */}
          <div className="card-footer">
            <button onClick={templeRoute} className="card-link btn defaultButton">
              Ir al templo
            </button>
            <button
              onClick={() => {
                closeTempleDetail();
              }}
              className="card-link btn defaultButton"
            >
              Cerrar
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
