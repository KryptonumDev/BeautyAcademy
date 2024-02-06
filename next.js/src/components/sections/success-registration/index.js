import React from "react";
import styles from "./styles.module.scss";
import Markdown from "@/components/atoms/Markdown";
import Button from "@/components/atoms/Button";

export default function SuccessRegistration() {
  return (
    <section className={styles.wrapper}>
      <Markdown.h1>Регистрация прошла успешно!</Markdown.h1>
      <Markdown className={styles.paragraph}>
        Для входа в личный кабинет, пожалуйста, перейдите по ссылке из письма на электронной почте.
      </Markdown>
      <Button href="/courses">Наши курсы</Button>
    </section>
  );
}
