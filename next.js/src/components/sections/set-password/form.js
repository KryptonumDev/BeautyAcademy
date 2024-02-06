"use client";

import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Input from "@/components/moleculas/Input";
import Button from "@/components/atoms/Button";
import { regex } from "@/global/constants";

const PasswordChangeForm = () => {
  const [fetching, setFetching] = useState(false);
  const router = useRouter();
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
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      });
      if (error) throw new Error(error.message);
      router.push("/authorization/success-password-change");
    } catch (err) {
      console.error(err); // TODO: handle error
    } finally {
      setFetching(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
      <Input
        label="Пароль <small>(минимум 8 символов)</small>"
        type="password"
        register={register("password", {
          required: { value: true, message: `Введите пароль` },
          minLength: {
            value: 8,
            message: `Пароль должен содердать минимум 8 символов`,
          },
          pattern: {
            value: regex.password,
            message: `Пароль должен состоять из латинских символов, содержать минимум одну букву верхнего и нижнего регистра, цифру и специальный символ`,
          },
        })}
        errors={errors}
      />
      <Button disabled={fetching}>Сохранить новый пароль</Button>
    </form>
  );
};

export default PasswordChangeForm;
