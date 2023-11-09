import fetchData from '@/utils/fetchData';
import styles from './styles.module.scss';
import Markdown from '@/utils/Markdown';
import Button from '@/components/atoms/Button';
import BlogCard from '@/components/moleculas/BlogCard';

const LatestBlogEntries = async () => {
  const {
    global: {
      latestBlogEntries_Heading,
      latestBlogEntries_Paragraph,
      latestBlogEntries_Cta,
    },
    latestEntries
  } = await getData();

  return (
    <section className={styles.wrapper}>
      <header>
        <Markdown.h2>{latestBlogEntries_Heading}</Markdown.h2>
        <Markdown className={styles.paragraph}>{latestBlogEntries_Paragraph}</Markdown>
        <div className="cta-wrapper">
          {latestBlogEntries_Cta.map((cta, i) => (
            <Button data={cta} key={i} />
          ))}
        </div>
      </header>
      <div className={styles.entries}>
        {latestEntries.map(({
          name,
          slug: { current: slug },
          brief,
          thumbnail,
          category: {
            name: categoryName,
            slug: { current: categorySlug }
          },
          _createdAt
        }, i) => (
          <BlogCard
            data={{
              name,
              slug,
              brief,
              thumbnail,
              categorySlug,
              categoryName,
              _createdAt,
            }}
            key={i}
          />
        ))}
      </div>
    </section>
  );
};


const getData = async () => {
  const { body: { data } } = await fetchData(`
    global: Global(id: "global") {
      latestBlogEntries_Heading
      latestBlogEntries_Paragraph
      latestBlogEntries_Cta {
        theme
        text
        href
      }
    }
    latestEntries: allBlogEntry(limit: 3, sort: { _createdAt: DESC }) {
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
  `)
  return data;
}


export default LatestBlogEntries;