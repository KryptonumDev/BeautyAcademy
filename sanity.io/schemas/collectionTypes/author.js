export default {
  name: 'author',
  title: 'Authors',
  type: 'document',
  icon: () => '👩',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: Rule => Rule.required(),
    },
    {
      name: 'specialization',
      type: 'string',
      title: 'Specialization',
      validation: Rule => Rule.required(),
    },
    {
      name: 'img',
      type: 'image',
      title: 'Image',
      validation: Rule => Rule.required(),
    },
    {
      name: 'instagram',
      type: 'url',
      title: 'Instagram (optional)',
      fieldset: 'socials',
    },
    {
      name: 'facebook',
      type: 'url',
      title: 'Facebook (optional)',
      fieldset: 'socials',
    },
    {
      name: 'telegram',
      type: 'url',
      title: 'Telegram (optional)',
      fieldset: 'socials',
    },
  ],
  fieldsets: [
    {
      name: 'socials',
      title: 'Socials',
      options: { collapsible: true, collapsed: true }
    }
  ]
}