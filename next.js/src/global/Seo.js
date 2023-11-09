import fetchData from "@/utils/fetchData";

export const domain = 'https://beautyacademy.expert';
export const locale = "ru";

const Seo = async ({ title, description, path }) => {
  const { global } = await getData();

  const seo = {
    title: title || 'Beauty Academy',
    description: description || '',
    url: `${domain}${path}` || '',
    ogImage: global.seo?.og_Img.asset.url || ''
  }

  const metadata = {
    robots: {
      index: false,
    },
    metadataBase: new URL(domain),
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: seo.url,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      siteName: seo.title,
      url: seo.url,
      images: [
        {
          url: seo.ogImage,
          width: 1200,
          height: 630,
        },
      ],
      locale: locale,
      type: 'website',
    },
  }

  return metadata;
}

export default Seo;

const getData = async () => {
  const { body: { data } } = await fetchData(`
    query {
      global: Global(id: "global") {
        seo {
          og_Img {
            asset {
              url
            }
          }
        }
      }
    }
  `)
  return data;
}