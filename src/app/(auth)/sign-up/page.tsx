import { getLoggedInUser } from "@/actions/user.action";
import AuthForm from "@/components/AuthForm";
import React from "react";

const SignUp = async () => {
  const user = await getLoggedInUser();
  console.log(user);
  return (
    <section className="flex-center size-full max-sm:px-6">
      <AuthForm type="sign-up" />
    </section>
  );
};

export default SignUp;
