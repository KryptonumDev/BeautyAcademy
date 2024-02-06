"use client";

import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Courses,
  //  Downloads,
  History,
  MyData,
} from "@/components/atoms/Icons";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function DashboardControl() {
  const pathname = usePathname();
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <aside className={styles.wrapper}>
      <div className={styles.grid}>
        <Link
          className={`${styles.button} ${
            pathname === "/dashboard/my-courses" ? styles.active : ""
          }`}
          href="/dashboard/my-courses"
        >
          <Courses />
          Мои курсы
        </Link>
        <Link
          className={`${styles.button} ${
            pathname === "/dashboard/purchase-history" ? styles.active : ""
          }`}
          href="/dashboard/purchase-history"
        >
          <History />
          История покупок
        </Link>
        {/* <Link className={`${styles.button} ${pathname === '/dashboard/downloads' ? styles.active : ''}`} href='/dashboard/downloads'>
        <Downloads />
        Файлы для скачивания
      </Link> */}
        <Link
          className={`${styles.button} ${
            pathname === "/dashboard/my-data" ? styles.active : ""
          }`}
          href="/dashboard/my-data"
        >
          <MyData />
          Мои данные
        </Link>
      </div>
      <button
        onClick={() => {
          handleSignOut();
        }}
        className={`${styles.logout} link`}
      >
        выйти
      </button>
    </aside>
  );
}
