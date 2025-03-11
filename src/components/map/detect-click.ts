import { useDispatch } from "react-redux";
import { useMapEvent } from "react-leaflet";

import { setCoords } from "@/store/coords-slice";

export const DetectClick = () => {
  const dispatch = useDispatch();
  useMapEvent("click", (e) => {
    dispatch(setCoords({ coords: e.latlng }));
  });

  return null;
};
