import Breadcrumbs from "@/components/organisms/Breadcrumbs";
import Grid from "@/components/sections/courses-grid";
import Hero from "@/components/sections/courses-hero";
import LatestBlogEntries from "@/components/sections/latest-blog-entries";
import Seo from "@/global/Seo";
import fetchData from "@/utils/fetchData";

export default async function Courses() {
  const { page, allCourse, categories } = await getData();

  return (
    <>
      <Breadcrumbs
        data={[
          { name: "Главная", path: "/" },
          { name: "Курсы", path: "/courses" },
        ]}
      />
      <Hero data={page} />
      <Grid
        slug={null}
        customer={null} // TODO: customer
        products={allCourse}
        productCategories={categories}
      />
      <LatestBlogEntries />
    </>
  );
}

export async function generateMetadata() {
  // const { page: { seo } } = await query();
  return Seo({
    title: "TODO: seo",
    description: "",
    path: "",
  });
}

const getData = async () => {
  const {
    body: { data },
  } = await fetchData(`
    query {
      allCourse(limit: 6){
        name
        price
        discount
        complexity
        _id
        slug{
          current
        }
        image{
          asset{
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
        category {
          name
          slug{
            current
          }
        }
      }
      categories: allCourseCategory {
        name
        slug {
          current
        }
      }
      page: CoursesPage(id: "coursesPage"){
        # Hero
        hero_Paragraph
        hero_Heading
        
        # SEO
        seo {
          title
          description
        }
      }
    }
  `);
  return data;
};
