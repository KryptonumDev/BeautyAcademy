export default {
  name: "stats",
  title: "Statictics",
  type: "object",
  fields: [
    {
      name: 'number',
      type: 'number',
      title: 'Number',
    },
    {
      name: 'description',
      type: 'string',
      title: 'Description',
    },
  ],
  preview: {
    select: {
      number: 'number',
      subtitle: 'description'
    },
    prepare({ number, subtitle }) {
      return {
        title: `[Stats] ${number} ${subtitle}`,
      }
    }
  }
}