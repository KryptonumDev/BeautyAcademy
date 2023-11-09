import { notFound } from "next/navigation"
import fetchData from "@/utils/fetchData";
import Seo from "@/global/Seo";
import Hero from "@/components/sections/blog-hero";
import BlogEntries from "@/components/sections/blog-entries";
import SchemaBreadcrumbs from "@/global/Schema/Breadcrumbs";
import { limit } from "../../page";

const BlogCategoryPage = async ({
  params: { slug },
  searchParams: { page = 1 }
}) => {
  const pageNumber = Number(page) > 1 ? Number(page) : 1;
  const offset = Number(pageNumber) ? Number(pageNumber) * limit : limit;
  let {
    page: {
      hero_Paragraph,
      category_Paragraph,
    },
    categories,
    entries: {
      0: {
        category: {
          categoryName
        }
      }
    },
    entries,
    countAllEntries,
    allEntriesCategories,
  } = await getData(offset, slug);
  const showEntries = offset > countAllEntries.length ? countAllEntries.length : offset;
  categories = categories.filter(({ slug: { current: slug } }) =>
    allEntriesCategories.some(entry => entry.category.slug.current === slug)
  );

  return (
    <>
      <Hero
        data={{
          hero_Heading: categoryName,
          hero_Paragraph,
          category_Paragraph
        }}
        categories={categories}
        currentCategorySlug={slug}
      />
      <BlogEntries
        entries={entries}
        page={pageNumber}
        showEntries={showEntries}
        scrollToId={showEntries - limit}
        allEntries={countAllEntries.length}
      />
      <SchemaBreadcrumbs breadcrumbs={[
        { name: 'Homepage', path: '' },
        { name: 'Blog', path: '/blog' },
        { name: categoryName, path: `/blog/${slug}` },
      ]} />
    </>
  )
}

export async function generateMetadata({ params: { slug } }) {
  const { categories } = await getData(limit, slug);
  const seo = categories.filter(({ slug: { current: categoriesSlug } }) => categoriesSlug === slug);
  return Seo({
    title: seo?.title,
    description: seo?.description,
    url: `/blog/category/${slug}`,
  })
}


const getData = async (offset = limit, slug) => {
  const { body: { data } } = await fetchData(`
    query($slug: String!, $limit: Int) {
      page: BlogPage(id: "blogPage") {
        # Hero
        hero_Paragraph

        # Category
        category_Paragraph
      }
      categories: allBlogCategory {
        name
        slug {
          current
        }
        
        seo {
          title
          description
        }
      }
      entries: allBlogEntry(
        limit: $limit,
        sort: { _createdAt: DESC },
        where: { category: { slug: { current: { eq: $slug } } } }
      ) {
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
      countAllEntries: allBlogEntry(
        sort: { _createdAt: DESC },
        where: { category: { slug: { current: { eq: $slug } } } }
      ) {
        name
      }
      allEntriesCategories: allBlogEntry(sort: { _createdAt: DESC }) {
        category {
          slug {
            current
          }
        }
      }
    }
  `, {
    limit: offset,
    slug: slug,
  })

  if (!data.entries[0]) {
    notFound();
  }

  return data
}

export default BlogCategoryPage;