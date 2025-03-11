import { z } from "zod";
import { forwardRef } from "react";
import { Search } from "lucide-react";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { RootState } from "@/store/store";
import { useGetVehicle } from "@/hooks/use-get-vehicle";

interface SearchTermProps {
  className?: string;
  placeholder?: string;
  dir?: "rtl" | "ltr";
  type?: "text" | "password";
}

const formSchema = z.object({
  searchTerm: z.string().min(2, "نام ماشین باید حداقل دو حرف باشد"),
});

type FormData = z.infer<typeof formSchema>;

export const SearchTerm = forwardRef<HTMLInputElement, SearchTermProps>(
  ({ className, dir = "rtl", placeholder, type }, ref) => {
    const { token } = useSelector((state: RootState) => state.token);
    const { mutate, isPending: disabled } = useGetVehicle();

    const {
      control,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<FormData>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        searchTerm: "",
      },
      disabled,
    });

    const onSubmit = (data: FormData) => {
      if (!token) return;
      mutate({
        url: `https://exam.pishgamanasia.com/webapi/Request/GetVehicleUsers?searchTerm=${data.searchTerm}&userToken=${token}`,
      });

      reset();
    };

    return (
      <div className="flex flex-col space-y-0.5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`${className} w-full flex flex-row-reverse items-center justify-between space-x-4 bg-gray-200 px-5 py-2 rounded-lg disabled:cursor-not-allowed`}
        >
          <Controller
            name="searchTerm"
            control={control}
            render={({ field }) => (
              <input
                dir={dir}
                disabled={disabled}
                {...field}
                type={type}
                ref={ref}
                placeholder={placeholder}
                className="w-full focus:outline-none"
              />
            )}
          />
          <button disabled={disabled}>
            <Search size={20} />
          </button>
        </form>
        {errors.searchTerm && (
          <span className="text-rose-600 text-xs self-end">
            {errors.searchTerm.message}
          </span>
        )}
      </div>
    );
  }
);

SearchTerm.displayName = "SearchTerm";
