import { config, fields, collection, singleton } from '@keystatic/core';

// 严格判断是否处于生产环境
const isProd = import.meta.env.PROD;

export default config({
  storage: import.meta.env.DEV ? { kind: 'local' } : {
    kind: 'github',
    repo: 'OSpoon/spoonly',
    clientId: 'Ov23liJDiZwZBc82iF1r',
  },
  collections: {


    blog: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { data: 'yaml', contentField: 'content' },
      columns: ['title', 'pubDate', 'isDraft'],
      previewUrl: '/blog/{slug}',
      schema: {
        title: fields.text({ label: 'Title', validation: { isRequired: true } }),
        description: fields.text({ label: 'Description', multiline: true }),
        pubDate: fields.date({ label: 'Publish Date' }),
        updatedDate: fields.date({ label: 'Updated Date', description: 'Optional' }),
        heroImage: fields.image({
          label: 'Hero Image',
          directory: 'public/assets/blog',
          publicPath: '/assets/blog/',
          validation: { isRequired: false }
        }),
        isDraft: fields.checkbox({
          label: 'Is Draft?',
          defaultValue: false,
          description: 'If checked, this post will not be shown in the blog list.'
        }),
        content: fields.markdoc({
          label: 'Content',
          extension: 'md',
          options: {
            image: {
              directory: 'public/assets/blog',
              publicPath: '/assets/blog/',
            },
          },
        }),
      },
    }),
  },
  singletons: {
    settings: singleton({
      label: 'Site Settings',
      path: 'src/data/settings',
      format: { data: 'json' },
      schema: {
        siteName: fields.text({ label: 'Site Name', defaultValue: 'OSpoon' }),
        description: fields.text({ label: 'Global SEO Description', multiline: true }),
        social: fields.object({
          github: fields.url({ label: 'GitHub URL' }),
          email: fields.url({ label: 'Email URL' }),
        }),
        footerText: fields.text({ label: 'Footer Text' }),
      },
    }),
    projects: singleton({
      label: 'Open Source Projects',
      path: 'src/data/projects',
      format: { data: 'json' },
      schema: {
        projects: fields.array(
          fields.object({
            id: fields.text({ label: 'ID' }),
            name: fields.text({ label: 'Name' }),
            description: fields.text({ label: 'Description', multiline: true }),
            language: fields.text({ label: 'Language' }),
            url: fields.text({ label: 'URL' }),
            stars: fields.integer({ label: 'Stars' }),
          }),
          { label: 'Projects List', itemLabel: props => props.fields.name.value || 'New Project' }
        ),
      },
    }),
    bookmarks: singleton({
      label: 'Digital Library (Bookmarks)',
      path: 'src/data/bookmarks',
      format: { data: 'json' },
      schema: {
        bookmarks: fields.array(
          fields.object({
            id: fields.text({ label: 'ID' }),
            category: fields.text({ label: 'Category' }),
            items: fields.array(
              fields.object({
                id: fields.text({ label: 'ID' }),
                name: fields.text({ label: 'Name' }),
                url: fields.text({ label: 'URL' }),
                desc: fields.text({ label: 'Description', multiline: true }),
              }),
              { label: 'Items', itemLabel: props => props.fields.name.value || 'New Item' }
            ),
          }),
          { label: 'Groups', itemLabel: props => props.fields.category.value || 'New Group' }
        ),
      },
    }),
    about: singleton({
      label: 'Profile & Experience',
      path: 'src/data/about',
      format: { data: 'json' },
      schema: {
        intro: fields.object({
          title: fields.text({ label: 'Title' }),
          tagline: fields.text({ label: 'Tagline' }),
          bio: fields.text({
            label: 'Bio',
            multiline: true,
          }),
        }),
        experience: fields.array(
          fields.object({
            period: fields.text({ label: 'Period' }),
            company: fields.text({ label: 'Company' }),
            description: fields.text({ label: 'Description', multiline: true }),
          }),
          { label: 'Experience List', itemLabel: props => props.fields.company.value }
        ),
        skills: fields.array(
          fields.object({
            category: fields.text({ label: 'Category' }),
            items: fields.array(fields.text({ label: 'Skill' }), { label: 'Items' }),
          }),
          { label: 'Skills List', itemLabel: props => props.fields.category.value }
        ),
        connect: fields.array(
          fields.object({
            name: fields.text({ label: 'Name' }),
            url: fields.url({ label: 'URL' }),
          }),
          { label: 'Connect List', itemLabel: props => props.fields.name.value }
        ),
      },
    }),
  },
});
