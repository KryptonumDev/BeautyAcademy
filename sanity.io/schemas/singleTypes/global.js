export default {
  name: 'global',
  title: 'Global',
  type: 'document',
  icon: () => '🌍',
  fields: [
    {
      type: 'string',
      name: 'email',
      title: 'Email',
      validation: Rule => Rule.required(),
    },
    {
      type: 'string',
      name: 'phone',
      title: 'Phone number',
    },
    {
      type: 'string',
      name: 'instagram',
      title: 'Instagram',
      fieldset: 'social',
    },
    {
      type: 'string',
      name: 'facebook',
      title: 'Facebook',
      fieldset: 'social',
    },
    {
      type: 'string',
      name: 'telegram',
      title: 'Telegram',
      fieldset: 'social',
    },
    {
      name: 'newsletter_Heading',
      type: 'markdown',
      title: 'Heading',
      fieldset: 'newsletter',
    },
    {
      name: 'newsletter_Paragraph',
      type: 'markdown',
      title: 'Paragraph',
      fieldset: 'newsletter',
    },
    {
      name: 'newsletter_Img',
      type: 'image',
      title: 'Image',
      fieldset: 'newsletter',
    },
    {
      name: 'latestBlogEntries_Heading',
      type: 'markdown',
      title: 'Heading',
      fieldset: 'latestBlogEntries',
      validation: Rule => Rule.required(),
    },
    {
      name: 'latestBlogEntries_Paragraph',
      type: 'markdown',
      title: 'Heading',
      fieldset: 'latestBlogEntries',
      validation: Rule => Rule.required(),
    },
    {
      name: 'latestBlogEntries_Cta',
      type: 'array',
      of: [
        {
          type: 'cta'
        }
      ],
      title: 'CTAs',
      fieldset: 'latestBlogEntries',
      validation: Rule => Rule.min(1).max(2).required(),
    },
    {
      name: 'footer_Slogan',
      type: 'markdown',
      title: 'Slogan',
      fieldset: 'footer',
    },
    {
      name: 'footer_Company',
      type: 'array',
      of: [
        {
          type: 'footer_Company',
        }
      ],
      title: 'Company',
      fieldset: 'footer',
    },
    {
      name: 'seo',
      type: 'global_Seo',
      title: 'Global SEO',
    },
  ],
  fieldsets: [
    {
      name: 'social',
      title: 'Social links',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'newsletter',
      title: 'Newsletter',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'formSuccess',
      title: 'Success Message',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'formError',
      title: 'Error Message',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'latestBlogEntries',
      title: 'Latest Blog Entries',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'footer',
      title: 'Footer',
      options: { collapsible: true, collapsed: true }
    },
  ]
}

export const global_Seo = {
  name: "global_Seo",
  title: "Global SEO",
  type: "object",
  fields: [
    {
      name: 'og_Img',
      type: 'image',
      title: 'OG Image',
      description: 'An image that is visible when sharing the page on social media. The dimensions of the photo should be 1200x630px'
    },
  ]
}
export const footer_Company = {
  name: "footer_Company",
  title: "Footer Company",
  type: "object",
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'address',
      type: 'string',
      title: 'Address',
    },
    {
      name: 'phone',
      type: 'string',
      title: 'Phone number',
    },
  ]
}