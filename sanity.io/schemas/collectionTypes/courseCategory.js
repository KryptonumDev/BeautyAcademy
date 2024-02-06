export default {
  name: 'courseCategory',
  title: 'Course Category',
  type: 'document',
  icon: () => '📂',
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
      name: 'seo',
      type: 'seo',
      title: 'SEO',
      group: 'seo'
    },
  ],
  groups: [
    {
      title: 'SEO',
      name: 'seo',
    },
  ]
}