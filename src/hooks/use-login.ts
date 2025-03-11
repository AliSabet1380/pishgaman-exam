import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { setToken } from "@/store/token-slice";

interface Req {
  username: string;
  password: string;
}

interface Res {
  status: number;
  message: string;
  data: {
    userToken: string;
  };
}

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation<Res, Error, Req>({
    mutationFn: async (data) => {
      const response = await fetch(
        "https://exam.pishgamanasia.com/webapi/Account/Login",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Error Happen So Throw It With Custom Error Message Or What Ever Come From BackEnd
      if (!response.ok) throw new Error((await response.json()).title);

      const result = await response.json();
      if (result.status === 0) throw new Error(result.message);

      return result;
    },
    onSuccess: (data) => {
      dispatch(setToken({ token: data.data.userToken }));
      navigate("/home");
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate, isPending };
};
