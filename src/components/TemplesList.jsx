import TempleCard from "./TempleCard";
import { getTemples } from "../utils/data";
import { useState, useRef } from "react";
import { Offcanvas } from "react-bootstrap";
import PropTypes from "prop-types";

function TemplesList({
  map,
  userLocation,
  openTempleDetail,
  isOpen,
  toggleTempleList,
}) {
  console.log(".")
  const templesArray = useRef(getTemples(map, userLocation));
  const [templesArraySorted, setTemplesArray] = useState(templesArray.current);

  function filterTempleArray(value) {
    const array = templesArray.current;
    const sortedArray = array.filter((item) => {
      return item.name.toLowerCase() === ""
        ? item
        : item.name.toLowerCase().includes(value.toLowerCase());
    });
    setTemplesArray(sortedArray);
  }

  return (
    <>
      <Offcanvas
        show={isOpen}
        onHide={toggleTempleList}
        placement={"end"}
        className="rounded-4 m-2 "
        style={{ width: "80%" }}s
      >
        <Offcanvas.Header closeButton>
          <form
            onChange={(e) => {
              filterTempleArray(e.target.value);
            }}
            className=" w-100"
          >
            <input
              name="searchTemple"
              type="text"
              inputMode="search"
              className="form-control"
              placeholder="Buscar congregaciones..."
            />
          </form>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div
            className="d-flex justify-content-center flex-wrap"
            id="body-offcanvas"
          >
            {templesArraySorted.length != 0 ? (
              templesArraySorted.map((temple, i) => (
                <>
                  <TempleCard
                    openTempleDetail={openTempleDetail}
                    key={i}
                    data={temple}
                  ></TempleCard>
                </>
              ))
            ) : (
              <p>No existen congregaciones con ese nombre</p>
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

TemplesList.propTypes = {
  map: PropTypes.object.isRequired,
  userLocation: PropTypes.array.isRequired,
  openTempleDetail: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleTempleList: PropTypes.func.isRequired,
};

export default TemplesList;

// useEffect(() => {
//   const element = offcanvas.current;

//   element.addEventListener("show.bs.offcanvas", function () {
//     map.scrollWheelZoom.disable();
//     map.dragging.disable();
//   });
//   element.addEventListener("hide.bs.offcanvas", function () {
//     map.scrollWheelZoom.enable();
//     map.dragging.enable();
//   });
// }, []);
