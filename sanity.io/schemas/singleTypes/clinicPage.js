export default {
  name: 'clinicPage',
  title: 'Clinic',
  type: 'document',
  icon: () => '🏣',
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
      name: 'hero_Cta',
      type: 'cta',
      title: 'CTA',
      fieldset: 'hero',
    },
    {
      name: 'hero_Img',
      type: 'image',
      title: 'Image',
      fieldset: 'hero',
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
      name: 'category',
      title: 'Category',
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