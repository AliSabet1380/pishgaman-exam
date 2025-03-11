import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface Req {
  token: string | null;
  vehicleUserId: number;
  source: { lat: number; lng: number };
  destination: { lat: number; lng: number };
}

interface Res {
  status: number;
  message: string;
  data: {
    requestNo: number;
  };
}

export const useSubmitRequest = () => {
  const { mutate, isPending } = useMutation<Res, Error, Req>({
    mutationFn: async ({ destination, source, token, vehicleUserId }) => {
      if (!token) throw new Error("ابتدا وارد حساب کاربری خود شوید");
      const response = await fetch(
        "https://exam.pishgamanasia.com/webapi/Request/SendRequest",
        {
          method: "POST",
          body: JSON.stringify({
            destination: `${destination.lat}, ${destination.lng}`,
            source: `${source.lat}, ${source.lng}`,
            userToken: token,
            vehicleUserId,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error((await response.json()).title);

      const result = await response.json();
      if (result.status !== 1) throw new Error(result.message);

      return result;
    },
    onSuccess: (data) => {
      toast.success(`${data.message} ... شماره سفارش: ${data.data.requestNo}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate, isPending };
};
