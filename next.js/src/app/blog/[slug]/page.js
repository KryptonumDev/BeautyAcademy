import { notFound } from "next/navigation";
import Seo from "@/global/Seo";
import fetchData from "@/utils/fetchData";
import Breadcrumbs from "@/components/organisms/Breadcrumbs";
import Hero from "@/components/sections/blog-post-hero";
import Content from "@/components/sections/blog-post-content";
import Newsletter from "@/components/sections/newsletter";

const BlogEntryPage = async ({ params: { slug: paramsSlug } }) => {
  const { page: [{
    name,
    brief,
    thumbnail,
    _createdAt,
    category,
    slug: { current: slug },
    contentRaw,
    author
  }]} = await query(paramsSlug);

  return (
    <>
      <Breadcrumbs data={[
        { name: 'Главная', path: '/' },
        { name: 'Блог', path: '/blog' },
        { name: name, path: `/blog/${slug}` },
      ]} />
      <Hero {...{
        heading: name,
        brief,
        img: thumbnail,
        _createdAt,
        category,
        contentRaw,
      }} />
      <Content data={contentRaw} author={author} title={name} slug={slug} />
      <Newsletter />
    </>
  )
}

export async function generateMetadata({ params: { slug: paramsSlug } }) {
  const { page: [{
    seo,
    slug: { current: slug }
  }]} = await query(paramsSlug);
  return Seo({
    title: seo?.title,
    description: seo?.description,
    path: `/blog/${slug}`,
  })
}

const query = async (slug) => {
  const { body: { data } } = await fetchData(/* GraphQL */`
    query($slug: String!) {
      page: allBlogEntry(where: { slug: { current: { eq: $slug }}}) {
        name
        brief
        slug {
          current
        }
        _createdAt
        category {
          name
          slug {
            current
          }
        }
        author {
          name
          specialization
          img {
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
          instagram
          facebook
          telegram
        }
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
        contentRaw

        seo {
          title
          description
        }
      }
    }
  `, {
    slug
  })
  !data.page[0]?.slug.current && notFound();
  return data;
}

export async function generateStaticParams() {
  const { body: { data: { entries } } } = await fetchData(`
    query {
      entries: allBlogEntry {
        slug {
          current
        }
      }
    }
  `);

  return entries.map(({ slug: { current: slug }}) => ({
    slug
  }))
}

export default BlogEntryPage;