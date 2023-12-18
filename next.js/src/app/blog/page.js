import Seo from "@/global/Seo";
import fetchData from "@/utils/fetchData";
import Hero from "@/components/sections/blog-hero";
import BlogEntries from "@/components/sections/blog-entries";
import Breadcrumbs from "@/components/organisms/Breadcrumbs";

const pathname = '/blog';
export const limit = 6;

const BlogPage = async ({ searchParams: { page = 1 } }) => {
  const pageNumber = Number(page) > 1 ? Number(page) : 1;
  const offset = Number(pageNumber) ? Number(pageNumber) * limit : limit;

  let {
    page: {
      hero_Heading,
      hero_Paragraph,
      category_Paragraph,
    },
    categories,
    entries,
    countAllEntries,
  } = await query(offset);

  categories = categories.filter(({ slug: { current: slug }}) =>
    countAllEntries.some(entry => entry.category.slug.current === slug)
  );

  const showEntries = offset > countAllEntries.length ? countAllEntries.length : offset;

  return (
    <>
      <Breadcrumbs data={[
        { name: 'Главная', path: '/' },
        { name: 'Блог', path: pathname },
      ]} />
      <Hero
        data={{
          hero_Heading,
          hero_Paragraph,
          category_Paragraph
        }}
        categories={categories}
      />
      <BlogEntries
        entries={entries}
        page={pageNumber}
        showEntries={showEntries}
        scrollToId={showEntries - limit}
        allEntries={countAllEntries.length}
      />
    </>
  )
}

export async function generateMetadata() {
  const { page: { seo } } = await query();
  return Seo({
    title: seo?.title,
    description: seo?.description,
    path: pathname,
  })
}

const query = async (offset = limit) => {
  const { body: { data } } = await fetchData(`
    query($limit: Int) {
      page: BlogPage(id: "blogPage") {
        # Hero
        hero_Heading
        hero_Paragraph

        # Category
        category_Paragraph

        seo {
          title
          description
        }
      }
      categories: allBlogCategory {
        name
        slug {
          current
        }
      }
      entries: allBlogEntry(limit: $limit, sort: { _createdAt: DESC }) {
        name
        slug {
          current
        }
        brief
        thumbnail {
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
        category {
          name
          slug{
            current
          }
        }
        _createdAt
      }
      countAllEntries: allBlogEntry(sort: { _createdAt: DESC }) {
        category {
          slug {
            current
          }
        }
      }
    }
  `, {
    limit: offset
  })

  return data;
}

export default BlogPage;