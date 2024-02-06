import React from "react";
import styles from "./styles.module.scss";
import Markdown from "@/components/atoms/Markdown";
import PasswordChangeForm from "./form";

export default function SetPassword() {
  return (
    <section className={styles.wrapper}>
      <Markdown.h1>
        Установите новый пароль
      </Markdown.h1>
      <PasswordChangeForm/>
    </section>
  );
}
