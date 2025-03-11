import { toast } from "sonner";
import { useDispatch } from "react-redux";

import { useMutation } from "@tanstack/react-query";
import { setVehicles } from "@/store/vehicle-slice";

type Req = {
  url: string;
};

type Res = {
  status: number;
  message: string;
  data: { id: number; name: string }[];
};

export const useGetVehicle = () => {
  const dispatch = useDispatch();
  const { mutate, isPending } = useMutation<Res, Error, Req>({
    mutationFn: async ({ url }) => {
      const response = await fetch(url);

      if (!response.ok) throw new Error((await response.json()).message);

      const result = await response.json();

      if (result.status === 0) throw new Error(result.message);

      return result;
    },
    onSuccess: (data) => {
      dispatch(setVehicles(data.data));
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate, isPending };
};
