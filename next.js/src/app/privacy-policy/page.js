import Seo from "@/global/Seo";
import fetchData from "@/utils/fetchData";
import Breadcrumbs from "@/components/organisms/Breadcrumbs";
import Newsletter from "@/components/sections/newsletter";
import Hero from "@/components/sections/privacy-policy-hero";
import Services from "@/components/sections/privacy-policy-services";

const pathname = '/privacy-policy';

const PrivacyPolicyPage = async () => {
  const { page: {
    hero_Heading,
    content,
    services_Heading,
    services_Ctas,
    services_List,
  } } = await query();

  return (
    <>
      <Breadcrumbs data={[
        { name: 'Главная', path: '/' },
        { name: 'Политика конфидециальности', path: pathname },
      ]} />
      <Hero {...{
        hero_Heading,
        content,
      }} />
      <Services {...{
        services_Heading,
        services_Ctas,
        services_List,
      }} />
      <Newsletter />
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
      page: PrivacyPolicyPage(id: "privacyPolicyPage") {
        # Hero
        hero_Heading
        content {
          title
          list {
            title
            description
          }
        }

        # Services
        services_Heading
        services_Ctas {
          theme
          text
          href
        }
        services_List {
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

export default PrivacyPolicyPage;