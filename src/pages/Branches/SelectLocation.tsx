import { FC, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { UseFormSetValue } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
const SelectLocation: FC<{
  setValue: UseFormSetValue<any>;
  error?: string;
}> = ({ setValue, error }) => {
  const [openActionModel, setOpenActionModel] = useState(false);
  const [position, setPosition] = useState<any>();
  const handleMapClick = (event: any) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    setPosition({ lat, lng });
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBkHcnl50GF1tiER0QI7pIoBoIa_1BVgG4",
    libraries: ["geometry", "drawing"],
  });
  const handleAddLocation = () => {
    if (position) {
      // console.log("Latitude:", position.lat);
      // console.log("Longitude:", position.lng);
      setValue("latitude", position.lat);
      setValue("longitude", position.lng);
      setOpenActionModel(false);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <Button type="button" className="mt-10" onClick={() => setOpenActionModel(true)}>
          Select Location
        </Button>
      </div>
      <Dialog open={openActionModel} onOpenChange={setOpenActionModel}>
        <DialogContent>
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={{ height: "400px", width: "100%" }}
              center={{
                lat: parseFloat("36.2137678"),
                lng: parseFloat("37.1415791"),
              }}
              zoom={10}
              onClick={handleMapClick}
            >
              {position && <Marker position={position} />}
            </GoogleMap>
          )}
          <Button onClick={handleAddLocation}>Add Location</Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default SelectLocation;
