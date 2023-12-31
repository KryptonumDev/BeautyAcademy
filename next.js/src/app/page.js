import Seo from "@/global/Seo";
import fetchData from "@/utils/fetchData";
import Hero from "@/components/sections/homepage-hero";
import Benefits from "@/components/sections/homepage-benefits";
import Newsletter from "@/components/sections/newsletter";
import Reviews from "@/components/sections/reviews";
import Features from "@/components/sections/homepage-features";
import Advantages from "@/components/sections/homepage-advantages";
import LatestBlogEntries from "@/components/sections/latest-blog-entries";
import Breadcrumbs from "@/components/organisms/Breadcrumbs";
import TextSection from "@/components/sections/text-section";

const pathname = '';

const IndexPage = async () => {
  const { page: {
    hero_Heading,
    hero_Paragraph,
    hero_Cta,
    hero_Images,
    hero_VideoPhone,
    hero_VideoSquare,
    benefits_Heading,
    benefits_Paragraph,
    benefits_List,
    benefits_Paragraph2,
    benefits_Cta,
    benefits_Img,
    advantages_Heading,
    advantages_Paragraph,
    advantages_Cta,
    advantages_List,
    features_Heading,
    features_Paragraph,
    features_Cta,
    features_List,
    reviews_Heading,
    reviews_Paragraph,
    reviews_Cta,
    reviews_List,
    partnership,
  } } = await query();

  return (
    <>
      <Breadcrumbs data={[
        { name: 'Главная', path: pathname },
      ]} visible={false} />
      <Hero data={{
        hero_Heading,
        hero_Paragraph,
        hero_Cta,
        hero_Images,
        hero_VideoPhone,
        hero_VideoSquare,
      }} />
      <Benefits data={{
        benefits_Heading,
        benefits_Paragraph,
        benefits_List,
        benefits_Paragraph2,
        benefits_Cta,
        benefits_Img,
      }} />
      <Features data={{
        features_Heading,
        features_Paragraph,
        features_Cta,
        features_List,
      }} />
      <Advantages data={{
        advantages_Heading,
        advantages_Paragraph,
        advantages_Cta,
        advantages_List,
      }} />
      <Reviews data={{
        reviews_Heading,
        reviews_Paragraph,
        reviews_Cta,
        reviews_List,
      }} />
      <TextSection data={partnership} />
      <Newsletter />
      <LatestBlogEntries />
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

const query = async () => {
  const { body: { data } } = await fetchData(`
    query {
      page: IndexPage(id: "indexPage") {
        # Hero
        hero_Heading
        hero_Paragraph
        hero_Cta {
          theme
          text
          href
        }
        hero_Images {
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
        hero_VideoPhone {
          asset {
            url
            altText
          }
        }
        hero_VideoSquare {
          asset {
            url
            altText
          }
        }
  
        # Benefits
        benefits_Heading
        benefits_Paragraph
        benefits_List
        benefits_Paragraph2
        benefits_Cta {
          theme
          text
          href
        }
        benefits_Img {
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
  
        # Advantages
        advantages_Heading
        advantages_Paragraph
        advantages_Cta {
          theme
          href
          text
        }
        advantages_List {
          title
          description
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
        }
  
        # Features
        features_Heading
        features_Paragraph
        features_Cta {
          theme
          href
          text
        }
        features_List {
          title
          description
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
        }
  
        # Reviews
        reviews_Heading
        reviews_Paragraph
        reviews_Cta {
          theme
          href
          text
        }
        reviews_List {
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
          name
          content
          rating
        }
  
        # Partnership
        partnership {
          isReversed
          heading
          paragraph
          standout
          cta {
            theme
            text
            href
          }
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
          video {
            asset {
              url
              altText
            }
          }
        }
      }
    }
  `)
  return data;
}

export default IndexPage;