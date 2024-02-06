import React from "react";
import styles from "./styles.module.scss";
import Markdown from "@/components/atoms/Markdown";
import PasswordChangeForm from "./form";

export default function ResetPassword() {
  return (
    <section className={styles.wrapper}>
      <Markdown.h1>Сброс пароля</Markdown.h1>
      <Markdown>
        Забыли пароли? Введите адрес вашей электронной почты ниже. Мы вышлем вам
        ссылку для сброса пароля, чтобы вы снова могли наслаждаться курсами.
      </Markdown>
      <PasswordChangeForm />
    </section>
  );
}
