import  {  useState } from "react";
import GoogleMapReact from "google-map-react";

const GoogleMap = () => {
  const [map, setMap] = useState(null);
  const [maps, setMaps] = useState(null);
  const [geocoder, setGeocoder] = useState(null);
  const [address, setAddress] = useState(null);
  const [marker, setMarker] = useState(null);
  const GoogleApiKey = "AIzaSyAM9R5tR739G53HXlFkSoX10uYHimKeD8U";

  const defaultLatLng = {
    lat: 35.7022589,
    lng: 139.7744733,
  };

  const handleApiLoaded = (object) => {
    setMap(object.map);
    setMaps(object.maps);
    setGeocoder(new object.maps.Geocoder());
  };

  const search = () => {
    geocoder.geocode(
      {
        address,
      },
      (results, status) => {
        if (status === maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);
          if (marker) {
            marker.setMap(null);
          }
          setMarker(
            new maps.Marker({
              map,
              position: results[0].geometry.location,
            })
          );
          console.log(results[0].geometry.location.lat());
          console.log(results[0].geometry.location.lng());
        }
      }
    );
  };

  return (
    <div >
      <div >
        <input type="text" onChange={(e) => setAddress(e.target.value)} />
        <button type="button" onClick={search}>
          Search
        </button>
      </div>
      <div >
        <GoogleMapReact
          bootstrapURLKeys={{ key: GoogleApiKey }}
          defaultCenter={defaultLatLng}
          defaultZoom={8}
          onGoogleApiLoaded={handleApiLoaded}
          yesIWantToUseGoogleMapApiInternals={true}
        />
      </div>
    </div>
  );
};

export default GoogleMap;
