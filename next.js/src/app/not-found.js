import Hero from "@/components/sections/not-found-hero";
import Seo from "@/global/Seo";
import fetchData from "@/utils/fetchData";

const NotFoundPage = async () => {
  const { page: {
    hero_Heading,
    hero_Paragraph,
    hero_Cta,
  } } = await query();

  return (
    <>
      <Hero data={{
        hero_Heading,
        hero_Paragraph,
        hero_Cta,
      }} />
    </>
  )
}

export async function generateMetadata() {
  const { page: { seo } } = await query();
  return Seo({
    title: seo?.title,
    description: seo?.description,
  })
}

const query = async () => {
  const { body: { data } } = await fetchData(`
    query {
      page: NotFoundPage(id: "notFoundPage") {
          #Hero
        hero_Heading
        hero_Paragraph
        hero_Cta {
          theme
          text
          href
        }
      }
    }
  `)
  return data;
}

export default NotFoundPage;