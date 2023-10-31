import Hero from "@/components/sections/homepage/Hero";
import Clients from "@/components/sections/homepage/Clients";
import Motivation from "@/components/sections/homepage/Motivation";
import Services from "@/components/sections/homepage/Services";
import Seo from "@/global/Seo";
import fetchData from "@/utils/fetchData";
import SchemaBreadcrumbs from "@/global/Schema/Breadcrumbs";

// export const runtime = 'edge'

const pathname = '';

const IndexPage = async () => {
  const { page: {
    hero_Heading,
    hero_Paragraph,
    hero_Cta,
    services_Tag,
    services_Heading,
    services_Paragraph,
    services_Cta,
    services_List,
    motivation_Paragraph,
    clients_Tag,
    clients_Heading,
    clients_Paragraph,
    clients_List,
    clients_Cta,
  } } = await getData();

  return (
    <>
      <Hero data={{
        hero_Heading,
        hero_Paragraph,
        hero_Cta,
      }} />
      <Services data={{
        services_Tag,
        services_Heading,
        services_Paragraph,
        services_Cta,
        services_List,
      }} />
      <Motivation data={{
        motivation_Paragraph
      }} />
      <Clients data={{
        clients_Tag,
        clients_Heading,
        clients_Paragraph,
        clients_List,
        clients_Cta,
      }} />
      <SchemaBreadcrumbs breadcrumbs={[
        { name: 'Main page', path: pathname },
      ]} />
    </>
  )
}

export async function generateMetadata() {
  const { page: { seo } } = await getData();
  return Seo({
    title: seo?.title,
    description: seo?.description,
    url: pathname,
  })
}

const getData = async () => {
  const { body: { data } } = await fetchData(`
    page: IndexPage(id: "indexPage") {
        #Hero
      hero_Heading
      hero_Paragraph
      hero_Cta {
        theme
        text
        href
      }
        # Services
      services_Tag
      services_Heading
      services_Paragraph
      services_Cta {
        theme
        text
        href
      }
      services_List {
        title
        description
      }
        # Motivation
      motivation_Paragraph
        # Clients
      clients_Tag
      clients_Heading
      clients_Paragraph
      clients_List {
        name
        href
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
      clients_Cta {
        theme
        text
        href
      }
        # SEO
      seo {
        title
        description
      }
    }
  `)
  return data;
}

export default IndexPage;