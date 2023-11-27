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
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name'
      },
      title: 'Slug',
      validation: Rule => Rule.required(),
    },
    {
      name: 'brief',
      type: 'text',
      rows: 3,
      title: 'Brief',
      validation: Rule => Rule.required(),
    },
    {
      name: 'thumbnail',
      type: 'image',
      title: 'Thumbnail',
      validation: Rule => Rule.required(),
    },
    {
      name: 'category',
      type: 'reference',
      to: [{ type: 'blogCategory' }],
      options: { disableNew: true },
      title: 'Category',
      validation: Rule => Rule.required(),
    },
    {
      name: 'author',
      type: 'reference',
      to: [{ type: 'author' }],
      options: { disableNew: true },
      title: 'Author',
      validation: Rule => Rule.required(),
    },
    {
      name: 'content',
      type: 'PortableText',
    },
    {
      name: 'seo',
      type: 'seo',
      title: 'SEO',
      group: 'seo',
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