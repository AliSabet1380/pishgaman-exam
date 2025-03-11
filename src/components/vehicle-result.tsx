import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/button";

import type { RootState } from "@/store/store";
import { clearVehicles, setSelectedVehicle } from "@/store/vehicle-slice";

export const VehicleResult = () => {
  const dispatch = useDispatch();
  const { allVehicle, selectedVehicle } = useSelector(
    (state: RootState) => state.vehicle
  );

  const onSelect = (id: number) => {
    dispatch(setSelectedVehicle(id));
  };
  const onDelete = () => {
    dispatch(clearVehicles());
  };

  return (
    <div className="w-full flex flex-row space-x-2 flex-wrap justify-between items-center">
      {allVehicle.length > 0 && (
        <Button
          className="bg-red-500 text-white text-sm hover:bg-red-500/80"
          onClick={onDelete}
        >
          حذف
        </Button>
      )}
      <div className="flex space-x-3">
        {allVehicle &&
          allVehicle.map((vehicle) => (
            <Button
              key={vehicle.id}
              onClick={() => onSelect(vehicle.id)}
              className={`p-1.5 bg-blue-200 hover:bg-blue-200/80 text-black text-sm ${
                selectedVehicle?.id === vehicle.id
                  ? "bg-blue-500 text-white"
                  : ""
              }`}
            >
              {vehicle.name}
            </Button>
          ))}
      </div>
    </div>
  );
};
