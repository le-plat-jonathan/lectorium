"use client";
import { CardWrapper } from "@/components/marketing/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import {
  LoginFormType,
  LoginSchema,
} from "../../../../app/(marketing)/auth/login/login.schema";

export const LoginForm = () => {
  const mutation = useMutation(async (values) => {});
  const form =
    useForm <
    LoginFormType >
    {
      resolver: zodResolver(LoginSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    };

  return (
    <CardWrapper
      title="Login"
      headerLabel="Welcome Back !"
      backButtonLabel="Don't have an account ?"
      backButtonHref="/auth/register"
    >
      {" "}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={mutation.isLoading}
                      type="email"
                      placeholder="email@domaine.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={mutation.isLoading}
                      type="password"
                      placeholder="******"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>
          {mutation.isError && <FormError message={mutation.error} />}
          {mutation.isSuccess && <FormSuccess message={mutation.data} />}
          <Button
            disabled={mutation.isLoading}
            type="submit"
            className="flex w-full items-center gap-2"
          >
            {mutation.isLoading && (
              <span>
                <Loader />
              </span>
            )}
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
