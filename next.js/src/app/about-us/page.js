import Seo from "@/global/Seo";
import fetchData from "@/utils/fetchData";
import Hero from "@/components/sections/about-us-hero";
import Cooperation from "@/components/sections/cooperation";
import Newsletter from "@/components/sections/newsletter";
import LatestBlogEntries from "@/components/sections/latest-blog-entries";
import TextSection from "@/components/sections/text-section";
import Breadcrumbs from "@/components/organisms/Breadcrumbs";
import Team from "@/components/sections/about-us-team";

const pathname = '/about-us';

const AboutUsPage = async () => {
  const { page: {
    hero_Heading,
    hero_Paragraph,
    hero_List,
    hero_Img,
    textSection,
    textSection2,
    team_Heading,
    team_List,
    team_Paragraph,
    team_Cta,
    cooperation_Heading,
    cooperation_Cta,
    cooperation_Img,
    cooperation_List,
  } } = await query();

  return (
    <>
      <Breadcrumbs data={[
        { name: 'Homepage', path: '/' },
        { name: 'About us', path: pathname },
      ]} />
      <Hero data={{
        hero_Heading,
        hero_Paragraph,
        hero_List,
        hero_Img,
      }} />
      <TextSection data={textSection} />
      <TextSection data={textSection2} />
      <Team {...{
        team_Heading,
        team_List,
        team_Paragraph,
        team_Cta,
      }} />
      <Cooperation data={{
        cooperation_Heading,
        cooperation_Cta,
        cooperation_Img,
        cooperation_List,
      }} />
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
  const { body: { data } } = await fetchData(/* GraphQL */`
    query {
      page: AboutUsPage(id: "aboutUsPage") {
        # Hero
        hero_Heading
        hero_Paragraph
        hero_List
        hero_Img {
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

        # TextSection 1
        textSection {
          isReversed
          heading
          paragraph
          standout
          cta {
            theme
            text
            href
          }
          # about_Video
        }
        # TextSection 1
        textSection2 {
          isReversed
          heading
          paragraph
          standout
          cta {
            theme
            text
            href
          }
          # about_Video
        }

        # Team
        team_Heading
        team_List {
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
          paragraph
          partnership_Title
          partnership_List {
            title
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
        }
        team_Paragraph
        team_Cta {
          theme
          text
          href
        }

        # Cooperation
        cooperation_Heading
        cooperation_Cta {
          theme
          text
          href
        }
        cooperation_Img {
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
        cooperation_List {
          title
          description
        }

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

export default AboutUsPage;