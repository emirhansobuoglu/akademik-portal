"use client";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthContainer from "../containers/authcontainer";
import Button from "../general/button";
import Heading from "../general/heading";
import Input from "../general/input";

const RegisterClient = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    router.push("/yonetici");
  };
  return (
    <AuthContainer>
      <div className="relative w-full md:w-[500px] p-3 shadow-lg rounded-md">
        <Heading center text="Kayıt Yap" />
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
        <Button text="Kayıt Yap" onClick={handleSubmit(onSubmit)} />
      </div>
    </AuthContainer>
  );
};

export default RegisterClient;
