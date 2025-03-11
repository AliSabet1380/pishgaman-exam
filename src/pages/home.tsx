import { Map } from "@/components/map/map";
import { Card } from "@/components/card";
import { Button } from "@/components/button";
import { SearchTerm } from "@/components/search-term";
import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "@/store/store";
import { clearCoords, resetCoords } from "@/store/coords-slice";
import { clearToken } from "@/store/token-slice";
import { VehicleResult } from "@/components/vehicle-result";
import { useSubmitRequest } from "@/hooks/use-submit-request";
import { clearVehicles } from "@/store/vehicle-slice";

export const Home = () => {
  const dispatch = useDispatch();
  const { position, disabled } = useSelector(
    (state: RootState) => state.coords
  );
  const { selectedVehicle } = useSelector((state: RootState) => state.vehicle);
  const { token } = useSelector((state: RootState) => state.token);

  const { mutate, isPending: disabledSubmit } = useSubmitRequest();

  const onDelete = () => {
    dispatch(resetCoords());
  };
  const onExit = () => {
    dispatch(clearToken());
    dispatch(clearVehicles());
    dispatch(clearCoords());
  };
  const onSubmitRequest = () => {
    if (!selectedVehicle) return;
    if (position.length !== 2) return;

    mutate({
      destination: position[1].coords,
      source: position[0].coords,
      token,
      vehicleUserId: selectedVehicle.id,
    });
  };

  return (
    <div className="relative w-full h-screen">
      <Button
        onClick={onExit}
        className="bg-red-600 z-20 text-white absolute top-5 right-5 hover:bg-red-600/80 "
      >
        خروج
      </Button>
      <Map />
      <Card className="absolute z-50 bg-white w-1/2 -bottom-2 left-1/2 -translate-x-1/2 space-y-3">
        <div className="space-y-2 mb-6">
          {position.map(({ coords, name }) => (
            <div
              key={name}
              className={`${
                name === "مبدا" ? "text-green-500" : "text-red-500"
              } w-full flex items-center justify-end px-1 text-xs md:text-sm font-semibold`}
            >
              <span>
                {coords.lat}, {coords.lng}: {name}
              </span>
            </div>
          ))}
          {position.length !== 0 && <Button onClick={onDelete}>حذف</Button>}
        </div>
        <SearchTerm className="w-full" placeholder="نوع ماشین آلات" />
        <VehicleResult />

        <Button
          onClick={onSubmitRequest}
          disabled={disabled || disabledSubmit}
          className="w-full rounded-lg disabled:bg-gray-600 disabled:text-white disabled:cursor-not-allowed"
        >
          ثبت درخواست
        </Button>
      </Card>
    </div>
  );
};
