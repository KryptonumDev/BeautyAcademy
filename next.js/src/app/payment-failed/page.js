import Seo from "@/global/Seo";
import fetchData from "@/utils/fetchData";
import Newsletter from "@/components/sections/newsletter";
import Hero from "@/components/sections/payment-status-hero";
import UpsellCarousel from "@/components/sections/upsell-carousel";

const pathname = '/payment-successful';

const PaymentFailedPage = async () => {
  const { page: {
    hero_Heading,
    hero_Paragraph,
    hero_Cta,
  } } = await query();

  return (
    <>
      <Hero {...{
        hero_Heading,
        hero_Paragraph,
        hero_Cta,
      }} />
      <UpsellCarousel />
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
    robots: { index: false },
  })
}

const query = async () => {
  const { body: { data } } = await fetchData(`
    query {
      page: PaymentFailedPage(id: "paymentFailedPage") {
        # Hero
        hero_Heading
        hero_Paragraph
        hero_Cta {
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
    }
  `)
  return data;
}

export default PaymentFailedPage;