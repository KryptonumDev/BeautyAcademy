import React from "react";
// import styles from "./styles.module.scss"
import NoContent from "@/components/organisms/dashboard-no-content";
import Img from "@/components/atoms/Img";
import Link from "next/link";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import fetchData from "@/utils/fetchData";

export default async function Content() {
  const courses = await getData();

  return (
    <>
      {/* TODO: types - courses/videos */}
      {courses?.length > 0 ? (
        <ul>
          {courses.map((course, index) => {
            return (
              <li key={index}>
                <Link href={`/courses/${course.slug.current}`} />
                {course.image && <Img data={course.image} />}
                <div>
                  <div>
                    <p>онлайн курс</p>
                    <h3>{course.name}</h3>
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
    .eq("id", id)
    .single();

  // TODO: handle course id's that are not found

  const {
    body: {
      data: { courses },
    },
  } = await fetchData(
    `
      query($id: [ID!]) {
        courses: allCourse(where: {_id: {in: $id}}) {
          name
          slug{
            current
          }
          image {
            asset {
              url
              altText
              metadata {
                lqip
                dimensions {
                  width
                  height
                }
              }
            }
          }
        }
      }
    `,
    {
      id: data.enrolled_courses.map((course) => course.course_id),
    }
  );

  return courses;
};
