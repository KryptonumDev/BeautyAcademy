export default {
  name: 'contactPage',
  title: 'Contact',
  type: 'document',
  icon: () => '✉️',
  fields: [
    {
      name: 'hero_Heading',
      type: 'markdown',
      title: 'Heading',
      fieldset: 'hero',
    },
    {
      name: 'hero_Paragraph',
      type: 'markdown',
      title: 'Paragraph',
      fieldset: 'hero',
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
    }
  ],
  groups: [
    {
      title: 'SEO',
      name: 'seo',
    },
  ]
}