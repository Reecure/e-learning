import { ReactElement, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { Routes } from "@/shared/config/routes";
import { useRouter } from "next/router";
import AuthForm from "@/pages/auth/ui/AuthForm";
import { useForm } from "react-hook-form";
import { Button } from "@/shared/ui";
import { ButtonThemes } from "@/shared/ui/Button/Button";
import { Label } from "@/shared/ui/Label";
import { Text } from "@/shared/ui/Text";
import Layout from "@/pages/layout";

interface LoginForm {
  email: string;
  password: string;
}

interface AuthError {
  isError: boolean;
  message: string;
}

function SignInPage() {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<LoginForm>();
   const [authError, setAuthError] = useState<AuthError>({
      isError: false,
      message: "",
   });
   const router = useRouter();

   const session = useSession();

   if (session.status === "authenticated") {
      return (
         <div className={"w-full h-full flex justify-center items-center"}>
            <p className={"text-2xl"}>You are an authenticated</p>
         </div>
      );
   }

   return (
      <AuthForm>
         <form
            onSubmit={handleSubmit(async (data) => {
               const res = await signIn("credentials", {
                  email: data.email,
                  password: data.password,
                  redirect: false,
               });

               if (res?.status !== 200) {
                  setAuthError(() => ({
                     isError: true,
                     message: res?.error || "Some error try again later",
                  }));
               } else {
                  setAuthError((prev) => ({ ...prev, isError: false }));
                  await router.push(Routes.USER_PROFILE);
               }
            })}
            className={
               "max-w-[500px] flex flex-col gap-5 w-full p-5 rounded-xl border-2 border-light-primary-main dark:border-dark-primary-main"
            }
         >
            <p className={"text-center text-2xl"}>Login Form</p>
            {authError.isError && <Text error text={authError.message} />}

            <Label htmlFor={"email"} labelText={"Email"}>
               <input
                  className={"inputField"}
                  type="text"
                  {...register("email", { required: true })}
               />
               {errors.email && <Text error text={"Email is required"} />}
            </Label>

            <Label htmlFor="password" labelText={"Password"}>
               <input
                  className={"inputField"}
                  type="password"
                  {...register("password", { required: true })}
               />
               {errors.password && <Text error text={"Password is required"} />}
            </Label>

            <Button type={"submit"} theme={ButtonThemes.FILLED}>
          SUBMIT
            </Button>
         </form>
      </AuthForm>
   );
}

SignInPage.getLayout = function getLayout(page: ReactElement) {
   return <Layout>{page}</Layout>;
};

export default SignInPage;
