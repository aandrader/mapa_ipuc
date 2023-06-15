import TempleCard from "./templeCard";
import { getTemples } from "../utils/data";
import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

function TemplesList({ map, userLocation, openTempleDetail }) {
  const templesArray = useRef(getTemples(map, userLocation));
  const [templesArraySorted, setTemplesArray] = useState(templesArray.current);

  const offcanvas = useRef(null);

  function filterTempleArray(value) {
    const array = templesArray.current;
    const sortedArray = array.filter((item) => {
      return item.name.toLowerCase() === ""
        ? item
        : item.name.toLowerCase().includes(value.toLowerCase());
    });
    setTemplesArray(sortedArray);
  }

  useEffect(() => {
    const element = offcanvas.current;

    element.addEventListener("show.bs.offcanvas", function () {
      map.scrollWheelZoom.disable();
      map.dragging.disable();
    });
    element.addEventListener("hide.bs.offcanvas", function () {
      map.scrollWheelZoom.enable();
      map.dragging.enable();
    });
  }, []);

  return (
    <>
      <div
        className="offcanvas offcanvas-end rounded-4 m-2 "
        ref={offcanvas}
        tabIndex={-1}
        id="congregationList"
        aria-labelledby="offcanvasExampleLabel"
        style={{ width: "80%" }}
      >
        <div className="offcanvas-header">
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

          {/* <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Congregaciones cercanas
          </h5> */}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            id="btn-close-templeList"
          ></button>
        </div>
        <div className="offcanvas-body">
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
        </div>
      </div>
    </>
  );
}

TemplesList.propTypes = {
  map: PropTypes.object.isRequired,
  userLocation: PropTypes.array.isRequired,
  openTempleDetail: PropTypes.func.isRequired,
};

export default TemplesList;
