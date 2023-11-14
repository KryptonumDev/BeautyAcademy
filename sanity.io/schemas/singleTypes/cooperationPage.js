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
  ],
  groups: [
    {
      title: 'SEO',
      name: 'seo',
    },
  ]
}