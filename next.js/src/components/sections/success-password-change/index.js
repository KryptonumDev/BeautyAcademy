import React from "react";
import styles from "./styles.module.scss";
import Markdown from "@/components/atoms/Markdown";
import Button from "@/components/atoms/Button";

export default function SuccessPasswordChange() {
  return (
    <section className={styles.wrapper}>
      <Markdown.h1>Ваш пароль был успешно изменен!</Markdown.h1>
      <Button href="/dashboard/my-courses">Личный кабинет</Button>
    </section>
  );
}
