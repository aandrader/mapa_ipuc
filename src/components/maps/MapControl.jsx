import { useState, useEffect } from "react";
import { useMap } from "react-leaflet";
import SearchButton from "../SearchButton";
import TempleDetail from "../TempleDetail";
import TemplesList from "../TemplesList";
import { marker } from "leaflet";
import { getTemples, templeIcon, locationIcon } from "../../utils/data";

function MapControl() {
  const [userLocation, setUserLocation] = useState([false]);
  const [templeListOpen, setTempleListOpen] = useState(false);
  const handleToggleTempleList = (state) => {
    setTempleListOpen(state);
  };
  const [templeDetail, setTempleDetailData] = useState({
    state: false,
    data: {
      name: "Iglesia",
      coordenadas: [1, 1],
    },
  });

  function closeTempleDetail() {
    setTempleDetailData({
      state: false,
    });
  }

  function openTempleDetail(data) {

    setTempleDetailData({
      state: false,
    });
    handleToggleTempleList(false)

    map.flyTo(data.coordenadas, 16, { duration: 1.5 }),
      setTimeout(() => {
        setTempleDetailData({
          state: true,
          data: data,
        });
      }, 2000);
  }

  const map = useMap();
  useEffect(() => {
    const templesArray = getTemples();
    templesArray.map((Temple) => {
      marker(Temple.coordenadas, { icon: templeIcon })
        .addTo(map)
        .on("click", () => {
          openTempleDetail(Temple);
        });
    });
  }, []);
  useEffect(() => {
    map.locate({ enableHighAccuracy: true }).on("locationfound", function (e) {
      marker([e.latlng.lat, e.latlng.lng], { icon: locationIcon }).addTo(map);
      setUserLocation([e.latlng.lat, e.latlng.lng]);
      map.flyTo(e.latlng, 13);
    });
  }, []);

  return (
    <>
      {templeDetail.state && (
        <TempleDetail
          closeTempleDetail={closeTempleDetail}
          templeData={templeDetail.data}
        />
      )}
      <SearchButton toggleTempleList={handleToggleTempleList} />
      { (
        <TemplesList
          map={map}
          userLocation={userLocation}
          openTempleDetail={openTempleDetail}
          isOpen={templeListOpen}
          toggleTempleList={handleToggleTempleList}
        />
      )}
    </>
  );
}

export default MapControl;
