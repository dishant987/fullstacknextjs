"use client";
import { ThemeToggle } from "@/components/themeToggle";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuthStore } from "@/store/Auth";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password must be at most 50 characters long")
    .superRefine((value, context) => {
      if (!/[a-z]/.test(value)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: " contain at least one lowercase letter",
        });
      }
      if (!/[A-Z]/.test(value)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: " contain at least one uppercase letter",
        });
      }
      if (!/\d/.test(value)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: " contain at least one number",
        });
      }
      if (!/[@$!%*?&]/.test(value)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must contain at least one special character",
        });
      }
    }),
});

const Page = () => {
  const { createAccount} = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError(() => "");
    const { name, email, password } = data;

    try {
      const res = await createAccount(name, email, password);
      console.log(res);
      if (res.success == true) {
        
        router.push("/login");
      }
      if (
        res.error?.code === 409 &&
        res.error.message ===
          "A user with the same id, email, or phone already exists in this project."
      ) {
        setError("A user with the same email already exists.");
      }
    } catch (error) {
      console.error("Failed to create account:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <NeonGradientCard className="dark:bg-black">
      <div className="mx-auto w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-white shadow-input dark:bg-black rounded-3xl p-2 sm:p-6 md:p-5">
        <CardHeader>
          <CardTitle className="text-center text-2xl sm:text-3xl md:text-4xl">
            Register
          </CardTitle>
          <CardDescription className="pt-3 text-center">
            {/* <ThemeToggle/> */}
            Welcome to StackOverflow
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          {error && (
            <p className="text-center text-sm text-red-500 dark:text-red-400">
              {error}
            </p>
          )}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6 sm:space-y-8"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        className="border-gray-500"
                        placeholder="shadcn"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="border-gray-500"
                        placeholder="hello@xyz.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        className="border-gray-500"
                        type={showPassword ? "text" : "password"}
                        placeholder="******"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center ml-1">
                <Switch
                  id="show-password"
                  onClick={() => setShowPassword(!showPassword)}
                />
                <label htmlFor="show-password" className="ml-2">
                  Show password
                </label>
              </div>
              <button
                className="group/btn border relative flex items-center justify-center space-x-2 h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    Submitting&nbsp;
                    <Spinner className="h-5 w-5" />
                  </>
                ) : (
                  <>Submit &rarr;</>
                )}
                <BottomGradient />
              </button>
            </form>
          </Form>

          <CardFooter>
            <p className="mt-5 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
              If you have an account,{" "}
              <Link href="/login" className="text-orange-500 hover:underline">
                Login
              </Link>{" "}
              with StackOverflow
            </p>
          </CardFooter>
        </CardContent>
      </div>
    </NeonGradientCard>
  );
};

export default Page;
