import React from "react";
// import styles from "./styles.module.scss"
import NoContent from "@/components/organisms/dashboard-no-content";
import Img from "@/components/atoms/Img";
import Link from "next/link";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Content() {
  const data = await getData();
  console.log(data);

  return (
    <>
      {/* TODO: types - courses/videos */}
      {data.customer?.courses?.nodes?.length > 0 ? (
        <ul>
          {data.customer?.courses?.nodes?.map((course, index) => {
            return (
              <li key={index}>
                <Link href={`/courses/${course.slug}`} />
                {course.featuredImage && (
                  <Img
                    src={course.featuredImage.asset.url}
                    width={course.featuredImage.asset.metadata.width}
                    height={course.featuredImage.asset.metadata.height}
                    alt={course.featuredImage.asset.altText}
                  />
                )}
                <div>
                  <div>
                    <p>онлайн курс</p>
                    <h3>{course.title}</h3>
                  </div>
                  {/* TODO: progressbar */}
                </div>
              </li>
            );
          })}
          {/* TODO: load more and limit */}
        </ul>
      ) : (
        <NoContent
          text="У вас пока нет курсов"
          link={{ url: "/courses", title: "Академия" }}
        />
      )}
      {/* TODO: add slider with products */}
    </>
  );
}

const getData = async () => {
  const supabase = createServerActionClient({ cookies });
  const {
    data: {
      user: { id },
    },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("profiles")
    .select(
      `
        id, 
        enrolled_courses (
          course_id
        )
      `
    )
    .eq("id", id);

  return data;
};
