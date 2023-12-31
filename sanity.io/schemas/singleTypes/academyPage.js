export default {
  name: 'academyPage',
  title: 'Academy',
  type: 'document',
  icon: () => '📖',
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
      name: 'hero_Cta',
      type: 'cta',
      title: 'CTA',
      fieldset: 'hero',
      validation: Rule => Rule.required(),
    },
    {
      name: 'hero_Img',
      type: 'image',
      title: 'Image',
      fieldset: 'hero',
      validation: Rule => Rule.required(),
    },
    {
      name: 'hero_Stats',
      type: 'array',
      of: [
        {
          type: 'stats'
        }
      ],
      title: 'Statictics',
      fieldset: 'hero',
      validation: Rule => Rule.required(),
    },
    {
      name: 'values_Heading',
      type: 'markdown',
      title: 'Heading',
      fieldset: 'values',
      validation: Rule => Rule.required(),
    },
    {
      name: 'values_List',
      type: 'array',
      of: [
        {
          type: 'markdown',
        }
      ],
      title: 'List',
      fieldset: 'values',
      validation: Rule => Rule.required(),
    },
    {
      name: 'procedures_Heading',
      type: 'markdown',
      title: 'Heading',
      fieldset: 'procedures',
      validation: Rule => Rule.required(),
    },
    {
      name: 'procedures_List',
      type: 'array',
      of: [
        {
          type: 'list_titleDescriptionAndImage'
        }
      ],
      title: 'List',
      fieldset: 'procedures',
      validation: Rule => Rule.required(),
    },
    {
      name: 'about',
      type: 'TextSection',
      title: 'About',
      validation: Rule => Rule.required(),
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'HorizontalShowcase',
      type: 'HorizontalShowcase',
      options: { collapsible: true, collapsed: true }
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
      name: 'values',
      title: 'Our values',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'procedures',
      title: 'Procedures',
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