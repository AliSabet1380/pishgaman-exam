import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Input } from "@/components/input";

import { useLogin } from "@/hooks/use-login";

const formSchema = z.object({
  username: z.string(), // username validation
  password: z.string(), // password validation
});

type FormData = z.infer<typeof formSchema>;

// !Can Separate Form Form Page But I Dont Want To Over Do Sepration

export const Login = () => {
  const { mutate, isPending: disabled } = useLogin();

  const { handleSubmit, control } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // can get default values from previous state in such senario
      username: "",
      password: "",
    },
    disabled,
  });

  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="space-y-10 w-[400px]">
          <div className="space-y-3">
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <Input label="نام کاربری" placeholder="مثال: علی" {...field} />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  type="password"
                  label="رمز عبور"
                  placeholder="مثال: 123456"
                  {...field}
                />
              )}
            />
          </div>

          {/* Can Show Error Message Here ... Dont Want to be so Complecate */}

          <Button disabled={disabled} className="w-full" type="submit">
            ورود
          </Button>
        </Card>
      </form>
    </div>
  );
};
