import fetchData from '@/utils/fetchData';
import React from 'react';
import { domain } from '../Seo';

const SchemaOrganization = async () => {
  const {
    page: {
      seo
    },
    global: {
      instagram,
      facebook,
      email,
      phone,
    }
  } = await getData();
  
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html:
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": seo?.title,
        "url": `${domain}`,
        "email": email,
        "telephone": phone || undefined,
        "logo": `${domain}/beauty-academy-logo.png`,
        "image": `${domain}/beauty-academy-logo.png`,
        "description": seo?.description,
        // "OpeningHoursSpecification": {
        //   "@type": "OpeningHoursSpecification",
        //   "dayOfWeek": [
        //     "Monday",
        //     "Tuesday",
        //     "Wednesday",
        //     "Thursday",
        //     "Friday",
        //     "Saturday",
        //     "Sunday"
        //   ],
        //   "opens": "00:00",
        //   "closes": "00:00"
        // },
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "email": email,
          },
        ],
        "sameAs": [
          instagram || '',
          facebook || '',
        ]
      })
    }} />
  );
}

export default SchemaOrganization;

const getData = async () => {
  const { body: { data } } = await fetchData(`
  query Organisation {
    page: IndexPage(id: "indexPage") {
        # SEO
      seo {
        title
        description
      }
    }
    global: Global(id: "global") {
      email
      phone
      instagram
      facebook
    }
  }
  `)
  return data;
}