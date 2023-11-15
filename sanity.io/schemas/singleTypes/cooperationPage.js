export default {
  name: 'cooperationPage',
  title: 'Cooperation',
  type: 'document',
  icon: () => '🤝',
  fields: [
    {
      name: 'hero_Heading',
      type: 'markdown',
      title: 'Heading',
      fieldset: 'hero',
      validation: Rule => Rule.required(),
    },
    {
      name: 'hero_Paragraph',
      type: 'markdown',
      title: 'Paragraph',
      fieldset: 'hero',
      validation: Rule => Rule.required(),
    },
    {
      name: 'hero_People',
      type: 'array',
      of: [
        {
          type: 'image'
        }
      ],
      title: 'People avatars',
      fieldset: 'hero',
      validation: Rule => Rule.min(1).max(2).required(),
    },
    {
      name: 'ContactForm',
      type: 'ContactForm',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'discover_Heading',
      type: 'markdown',
      title: 'Heading',
      fieldset: 'discover',
      validation: Rule => Rule.required(),
    },
    {
      name: 'discover_Paragraph',
      type: 'markdown',
      title: 'Paragraph',
      fieldset: 'discover',
      validation: Rule => Rule.required(),
    },
    {
      name: 'discover_List',
      type: 'array',
      of: [
        {
          type: 'list_TitleAndImage',
        }
      ],
      title: 'List',
      fieldset: 'discover',
      validation: Rule => Rule.required(),
    },
    {
      name: 'benefits_Heading',
      type: 'markdown',
      title: 'Heading',
      fieldset: 'benefits',
      validation: Rule => Rule.required(),
    },
    {
      name: 'benefits_List',
      type: 'array',
      of: [
        {
          type: 'markdown',
        }
      ],
      title: 'List',
      fieldset: 'benefits',
      validation: Rule => Rule.required(),
    },
    {
      name: 'cooperation_Heading',
      type: 'markdown',
      title: 'Heading',
      fieldset: 'cooperation',
      validation: Rule => Rule.required(),
    },
    {
      name: 'cooperation_Cta',
      type: 'cta',
      title: 'CTA',
      fieldset: 'cooperation',
      validation: Rule => Rule.required(),
    },
    {
      name: 'cooperation_Img',
      type: 'image',
      title: 'Image',
      fieldset: 'cooperation',
      validation: Rule => Rule.required(),
    },
    {
      name: 'cooperation_List',
      type: 'array',
      of: [
        {
          type: 'list_titleAndDescription'
        }
      ],
      title: 'List',
      fieldset: 'cooperation',
      validation: Rule => Rule.required(),
    },
    {
      name: 'partners_Heading',
      type: 'markdown',
      title: 'Heading',
      fieldset: 'partners',
      validation: Rule => Rule.required(),
    },
    {
      name: 'partners_Paragraph',
      type: 'markdown',
      title: 'Paragraph',
      fieldset: 'partners',
      validation: Rule => Rule.required(),
    },
    {
      name: 'partners_Cta',
      type: 'array',
      of: [
        {
          type: 'cta'
        }
      ],
      title: 'CTAs',
      fieldset: 'partners',
      validation: Rule => Rule.min(1).max(2).required(),
    },
    {
      name: 'partners_List',
      type: 'array',
      of: [
        {
          type: 'list_ImageAndLink'
        }
      ],
      title: 'List',
      fieldset: 'partners',
      validation: Rule => Rule.required(),
    },
    {
      name: 'faq',
      type: 'Faq',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'seo',
      type: 'seo',
      title: 'SEO',
      group: 'seo'
    },
  ],
  fieldsets: [
    {
      name: 'hero',
      title: 'Hero',
      options: { collapsible: true }
    },
    {
      name: 'discover',
      title: 'Discover',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'benefits',
      title: 'Benefits',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'cooperation',
      title: 'Cooperation',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'partners',
      title: 'Partners',
      options: { collapsible: true, collapsed: true }
    },
  ],
  groups: [
    {
      title: 'SEO',
      name: 'seo',
    },
  ]
}