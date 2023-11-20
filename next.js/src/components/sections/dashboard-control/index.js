'use client'

import React from "react"
import styles from "./styles.module.scss"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { Courses, Downloads, History, MyData } from "@/components/atoms/Icons";

export default function DashboardControl() {
  const pathname = usePathname();
  return (
    <aside className={styles.wrapper}>
      <Link className={`${styles.button} ${pathname === '/dashboard/my-courses' ? styles.active : ''}`} href='/dashboard/my-courses'>
        <Courses />
        Мои курсы
      </Link>
      <Link className={`${styles.button} ${pathname === '/dashboard/purchase-history' ? styles.active : ''}`} href='/dashboard/purchase-history'>
        <History />
        История покупок
      </Link>
      <Link className={`${styles.button} ${pathname === '/dashboard/downloads' ? styles.active : ''}`} href='/dashboard/downloads'>
        <Downloads />
        Файлы для скачивания
      </Link>
      <Link className={`${styles.button} ${pathname === '/dashboard/my-data' ? styles.active : ''}`} href='/dashboard/my-data'>
        <MyData />
        Мои данные
      </Link>
      <Link className={`${styles.logout} link`} href="/logout">
        выйти
      </Link>
    </aside>
  )
}