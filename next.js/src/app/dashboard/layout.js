import Breadcrumbs from "@/components/organisms/Breadcrumbs"
import DashboardControl from "@/components/sections/dashboard-control"
import Seo from "@/global/Seo"
import React from "react"

export const dynamic = "force-dynamic"

export default function Account({ children }) {
  return (
    <>
      <Breadcrumbs data={[
        { name: 'Главная', path: '/' },
        { name: 'Личный кабинет', path: '/dashboard/my-courses' },
      ]} />
      <div className="dashboard-layout">
        <DashboardControl />
        {children}
      </div>
    </>
  )
}

export async function generateMetadata() {

  return Seo({
    title: 'Личный кабинет',
  })
}