export default {
  name: 'aboutUsPage',
  title: 'About Us',
  type: 'document',
  icon: () => '🙋‍♀️',
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
      name: 'hero_List',
      type: 'array',
      of: [
        { type: 'string' }
      ],
      title: 'List',
      fieldset: 'hero',
      validation: Rule => Rule.min(1).min(3).required(),
    },
    {
      name: 'hero_Img',
      type: 'image',
      title: 'Image',
      fieldset: 'hero',
      validation: Rule => Rule.required(),
    },
    {
      name: 'textSection',
      type: 'TextSection',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'textSection2',
      type: 'TextSection',
      options: { collapsible: true, collapsed: true }
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
      name: 'cooperation',
      title: 'Cooperation',
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