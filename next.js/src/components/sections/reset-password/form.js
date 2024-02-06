"use client";

import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Input from "@/components/moleculas/Input";
import Button from "@/components/atoms/Button";
import { regex } from "@/global/constants";

const PasswordChangeForm = () => {
  const [fetching, setFetching] = useState(false);
  const supabase = createClientComponentClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const onSubmit = async (data) => {
    setFetching(true);
    try {
      const res = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${location.origin}/api/auth/callback?backUrl=/authorization/set-password`,
      });
      if (res.error) throw new Error(res.error.message);

      alert("Ссылка для сброса пароля отправлена на вашу почту"); // TODO: replace with toast
    } catch (err) {
      console.error(err); // TODO: handle error
    } finally {
      setFetching(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
      <Input
        label="Электронный адрес"
        type="text"
        register={register("email", {
          required: { value: true, message: `Введите E-mail` },
          pattern: { value: regex.email, message: `неправильный адрес E-mail` },
        })}
        errors={errors}
      />
      <Button disabled={fetching}>Сбросить пароль</Button>
    </form>
  );
};

export default PasswordChangeForm;
