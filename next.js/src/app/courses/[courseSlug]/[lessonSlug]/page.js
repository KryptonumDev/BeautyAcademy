import Breadcrumbs from "@/components/organisms/Breadcrumbs";
import { notFound } from "next/navigation";
import Content from "@/components/sections/course-lesson-content";
import Hero from "@/components/sections/course-lesson-hero";
import Seo from "@/global/Seo";
import fetchData from "@/utils/fetchData";

const CourseLessonPage = async ({ params: { courseSlug, lessonSlug } }) => {
  const {
    course: [{ chapters, name: courseName, author, category, complexity, courseLength }],
    page: [{ name: lessonName, _id: lessonId, video: lessonVideo, description }],
  } = await query(courseSlug, lessonSlug);

  return (
    <>
      <Breadcrumbs
        data={[
          { name: "Главная", path: "/" },
          { name: "Курсы", path: "/courses" },
          { name: courseName, path: `/courses/${courseSlug}` },
          { name: lessonName, path: `/courses/${courseSlug}/${lessonSlug}` },
        ]}
      />
      <Hero
        {...{
          name: lessonName,
          id: lessonId,
          video: lessonVideo,
          courseSlug,
          lessonSlug,
          chapterLessons: chapters,
        }}
      />
      <Content
        courseSlug={courseSlug}
        author={author}
        category={category}
        complexity={complexity}
        chapters={chapters}
        content={description}
        courseLength={courseLength}
      />
    </>
  );
};

export async function generateMetadata({ params: { courseSlug, lessonSlug } }) {
  const {
    page: [{ seo }],
  } = await query(courseSlug, lessonSlug);

  return Seo({
    title: seo?.title,
    description: seo?.description,
    path: `/courses/${courseSlug}/${lessonSlug}`,
  });
}

export async function generateStaticParams() {
  const {
    body: {
      data: { entries },
    },
  } = await fetchData(`
    query {
      entries: allLesson {
        slug {
          current
        }
      }
    }
  `);

  return entries.map(({ slug: { current: slug } }) => ({
    lessonSlug: slug,
  }));
}

const query = async (courseSlug, lessonSlug) => {
  const {
    body: { data },
  } = await fetchData(
    /* GraphQL */ `
      query ($slug: String!, $course: String!) {
        course: allCourse(where: { slug: { current: { eq: $course } } }) {
          _id
          name
          complexity
          courseLength
          slug {
            current
          }
          category {
            name
            slug{
              current
            }
          }
          chapters{
            chapterName
            lessons{
              _id
              name
              lengthInMinutes
              slug{
                current
              }
            }
          }
          author{
            name
            facebook
            instagram
            telegram
            specialization
            img{
              asset {
                altText
                url
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
        page: allLesson(where: { slug: { current: { eq: $slug } } }) {
          _id
          name
          lengthInMinutes
          video
          description
          files{
            asset{
              altText
              url
            }
          }
          slug{
            current
          }
        }
      }
    `,
    {
      course: courseSlug,
      slug: lessonSlug,
    }
  );

  !data.page[0]?.slug.current && notFound();
  return data;
};

export default CourseLessonPage;
