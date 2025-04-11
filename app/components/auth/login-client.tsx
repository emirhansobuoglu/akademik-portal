"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthContainer from "../containers/authcontainer";
import Button from "../general/button";
import Heading from "../general/heading";
import Input from "../general/input";

const LoginClient = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <AuthContainer>
      <div className="relative w-full md:w-[500px] p-3 shadow-lg rounded-md">
        <Heading center text="Giriş Yap" />
        <Input
          placeholder="T.C Kimlik No"
          type="text"
          id="tcno"
          register={register}
          errors={errors}
          required
        />
        <Input
          placeholder="Şifre"
          type="password"
          id="sifre"
          register={register}
          errors={errors}
          required
        />
        <Button text="Giriş Yap" onClick={handleSubmit(onSubmit)} />
      </div>
    </AuthContainer>
  );
};

export default LoginClient;
