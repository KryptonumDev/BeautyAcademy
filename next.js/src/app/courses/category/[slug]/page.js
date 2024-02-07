import Breadcrumbs from "@/components/organisms/Breadcrumbs";
import Grid from "@/components/sections/courses-grid";
import Hero from "@/components/sections/courses-hero";
import LatestBlogEntries from "@/components/sections/latest-blog-entries";
import Seo from "@/global/Seo";
import fetchData from "@/utils/fetchData";

export default async function Courses({ params: { slug } }) {
  const { page, allCourse, categories } = await getData(slug);

  return (
    <>
      <Breadcrumbs
        data={[
          { name: "Главная", path: "/" },
          { name: "Курсы", path: "/courses" },
          {
            name: categories?.find((el) => el.slug.current === slug).name,
            path: `/courses/${slug}`,
          },
        ]}
      />
      <Hero data={page} />
      <Grid
        slug={slug}
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

export async function generateStaticParams() {
  const {
    body: {
      data: { categories },
    },
  } = await fetchData(`
    query {
      categories: allCourseCategory {
        slug{
          current
        }
      }
    }
  `);

  return categories.map(({ slug }) => ({
    slug: slug.current,
  }));
}

const getData = async (slug) => {
  const {
    body: { data },
  } = await fetchData(
    `
    query($slug: String!) {
      allCourse(limit: 6, where:{category: {slug: {current:{in: [$slug]}}}}){
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
  `,
    { slug: slug }
  );
  return data;
};
