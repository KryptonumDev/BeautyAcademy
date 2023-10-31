
import React from 'react';
import { domain } from '../Seo';

const SchemaBreadcrumbs = ({ breadcrumbs }) => {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html:
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          breadcrumbs.map(({ name, path = '' }, i) => (
            {
              "@type": "ListItem",
              "position": ++i,
              "name": name,
              "item": `${domain}${path}`
            }
          ))
        ]
      })
    }} />
  )
};

export default SchemaBreadcrumbs;