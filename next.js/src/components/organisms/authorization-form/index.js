import React, { useState } from "react";
import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";
import Input from "@/components/moleculas/Input";
import Checkbox from "@/components/moleculas/Checkbox";
import { regex } from "@/global/constants";
import Link from "next/link";
import Button from "@/components/atoms/Button";
import Loader from "@/components/moleculas/request-loader";

export default function Form({
  type,
  nextStep,
  registration,
  setRegistration,
}) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const onSubmit = (data) => {
    setLoading(true);
    if (registration) {
      //SIGN UP
      fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        redirect: "follow",
        body: JSON.stringify({
          email: data.email,
          name: data.name,
          password: data.password,
          type: type,
        }),
      })
        .then((response) => response.json())
        .then(async (response) => {
          if (response.redirect) window.location.href = response.redirect;
          if (response.error) throw new Error(response.error);
          nextStep();
          setLoading(false);
        })
        .catch(() => {
          // TODO ERROR HANDLING
          setLoading(false);
        });
    } else {
      // SIGN IN
      fetch("/api/auth/password", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        redirect: "follow",
        body: JSON.stringify({
          username: data.email,
          password: data.password,
          type: type,
        }),
      })
        .then((response) => response.json())
        .then(async (response) => {
          if (response.redirect) window.location.href = response.redirect;
          if (response.error) throw new Error(response.error);
          nextStep();
          setLoading(false);
        })
        .catch(() => {
          // TODO ERROR HANDLING
          setLoading(false);
        });
    }
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
      <Loader show={loading} />
      {registration && (
        <Input
          label="Имя"
          type="text"
          register={register("name", {
            required: { value: true, message: `Введите имя` },
            minLength: {
              value: 2,
              message: `Имя должно состоять минимум из 2-х символов`,
            },
          })}
          errors={errors}
        />
      )}
      <Input
        label="Электронный адрес"
        type="text"
        register={register("email", {
          required: { value: true, message: `Введите E-mail` },
          pattern: { value: regex.email, message: `неправильный адрес E-mail` },
        })}
        errors={errors}
      />
      <Input
        label="Пароль"
        type="password"
        register={register("password", {
          required: { value: true, message: `Введите пароль` },
          minLength: {
            value: registration ? 8 : null,
            message: `Пароль должен содердать минимум 8 символов`,
          },
          pattern: {
            value: registration ? regex.password : null,
            message: `Пароль должен состоять из латинских символов, содержать минимум одну букву верхнего и нижнего регистра, цифру и специальный символ`,
          },
        })}
        errors={errors}
      />
      <div className={styles.checkboxes}>
        {registration && (
          <>
            <Checkbox
              label={
                <>
                  Я согласен с{" "}
                  <Link
                    className="link"
                    href="/privacy-policy"
                    target="_blank"
                    rel="noreferrer"
                  >
                    политикой конфиденциальности
                  </Link>
                </>
              }
              register={register("legal", {
                required: { value: true, message: `Необходимо согласие` },
              })}
              errors={errors}
            />
            <Checkbox
              label={<> Я хочу подписаться на рассылку новостей </>}
              register={register("newsletter")}
              errors={errors}
            />
          </>
        )}
      </div>
      <Button type="submit">
        {registration ? "Зарегистрироваться" : "Войти"}
      </Button>
      {registration ? (
        <p>
          У вас уже есть аккаунт?{" "}
          <button
            className="link"
            type="button"
            onClick={() => {
              setRegistration(!registration);
            }}
          >
            Авторизоваться
          </button>
        </p>
      ) : (
        <p>
          У вас еще нет учетной записи?{" "}
          <button
            className="link"
            type="button"
            onClick={() => {
              setRegistration(!registration);
            }}
          >
            Регистрация
          </button>
        </p>
      )}
    </form>
  );
}
