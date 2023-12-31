import Breadcrumbs from "@/components/organisms/Breadcrumbs";
import Grid from "@/components/sections/courses-grid";
import Hero from "@/components/sections/courses-hero";
import LatestBlogEntries from "@/components/sections/latest-blog-entries";
import fetchData from "@/utils/fetchData";
import wpFetchData from "@/utils/wpFetchData";

export default async function Courses({ params: { slug } }) {
  const { page } = await getData();
  const { products, productCategories } = await getProducts(slug);

  return (
    <>
      <Breadcrumbs data={[
        { name: 'Главная', path: '/' },
        { name: 'Курсы', path: '/courses' },
        { name: productCategories?.nodes?.find(el => el.slug === slug).name, path: `/courses/${slug}` }
      ]} />
      <Hero data={page} />
      <Grid slug={slug} products={products} productCategories={productCategories} />
      <LatestBlogEntries />
    </>
  )
}

const getData = async () => {
  const { body: { data } } = await fetchData(`
    query {
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
  `)
  return data;
}

const getProducts = async (slug) => {
  const { body: { data } } = await wpFetchData(`
  query Category ($slug: String!) {
    products(where: {categoryIn: ["онлайн-курс", $slug]}, first: 6) {
      nodes {
        ... on SimpleProduct {
          productId: databaseId
          id
          slug
          name
          date
          onSale
          price(format: FORMATTED)
          regularPrice(format: FORMATTED)
          salePrice(format: FORMATTED)
          productTags {
            nodes {
              name
              id
              slug
            }
          }
          productCategories {
            nodes {
              name
              children {
                nodes {
                  name
                }
              }
            }
          }
          featuredImage {
            asset : node {
              altText
              url : mediaItemUrl
              metadata : mediaDetails {
                width
                height
              }
            }
          }
        }
      }
      pageInfo {
        total
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
    productCategories(where: {childless: true}) {
      nodes {
        name
        id
        slug
      }
    }
  }
`, { slug: slug }, 3600)
  return data;
}

export async function generateStaticParams() {
  const { body: { data: { categories } } } = await wpFetchData(`
    query {
      categories: productCategories(where: {childless: true}) {
        nodes {
          slug
        }
      }
    }
  `, {}, 3600);

  return categories.nodes.map(({ slug }) => ({
    slug: slug
  }))
}