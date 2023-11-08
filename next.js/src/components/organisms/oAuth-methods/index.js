import React from "react"
import styles from "./styles.module.scss"

export default function OAuthMethods({ providers }) {

  return (
    <aside className={styles.wrapper}>
      {providers.filter(el => el.authorizationUrl).map((method, index) => (
        <a href={method.authorizationUrl} key={index}>
          {method.provider}
        </a>
      ))}
    </aside>
  )
}