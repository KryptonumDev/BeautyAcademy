export default {
  name: 'blogEntry',
  title: 'Blog Entry',
  type: 'document',
  icon: () => '📝',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name'
      },
      title: 'Slug',
    },
    {
      name: 'brief',
      type: 'text',
      rows: 3,
      title: 'Brief',
    },
    {
      name: 'thumbnail',
      type: 'image',
      title: 'Thumbnail',
    },
    {
      name: 'category',
      type: 'reference',
      to: [
        { type: 'blogCategory' }
      ],
      options: {
        disableNew: true,
      },
      title: 'Category',
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
      options: {
        collapsible: true
      }
    },
  ],
  groups: [
    {
      title: 'SEO',
      name: 'seo',
    },
  ]
}