import { EItemType, IAppState } from './interfaces.store';

export const initialState: IAppState = {
  filter: '',
  items: [
    {
      key: 'editors:webform:toolbox:components',
      type: EItemType.TEXT,
      body: '[The list of components](https://doc4d.github.io/docs/alpha/en/WebStudio/webStudio.html#components)',
    },
    {
      key: 'editors:webform:properties:style:color',
      type: EItemType.TEXT,
      body: '[The list of components](https://doc4d.github.io/docs/alpha/en/WebStudio/webStudio.html#components)',
    },
    {
      key: 'editors:webform:toolbox:styleslib',
      type: EItemType.TEXT,
      body: '[Styles Library](https://doc4d.github.io/docs/alpha/en/WebStudio/webStudio.html#styles-library)',
    },
    {
      key: 'editors:webform:toolbox:datasources',
      type: EItemType.TEXT,
      body: '[Data Sources](https://doc4d.github.io/docs/alpha/en/WebStudio/webStudio.html#data-sources)',
    },
    {
      key: 'editors:webform:toolbox:outline',
      type: EItemType.TEXT,
      body: '[Outline](https://doc4d.github.io/docs/alpha/en/WebStudio/webStudio.html#outline)',
    },
    {
      key: 'editors:webform:toolbox:components:button',
      type: EItemType.TEXT,
      body: '![4d software](https://blog.4d.com/wp-content/uploads/2021/06/banner-blog-v19LTS-1024x512.jpg)\n\n### The new 4D v19R\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?\n\n[Learn more](https://doc4d.github.io/docs/alpha/en/WebStudio/webStudio.html#components)',
    },
    {
      key: 'editors:webform:toolbox:components:image',
      type: EItemType.TEXT,
      body: '![4d software](https://blog.4d.com/wp-content/uploads/2021/06/banner-blog-v19LTS-1024x512.jpg)\n\n### The new 4D v19R\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?\n\n[Learn more](https://doc4d.github.io/docs/alpha/en/WebStudio/webStudio.html#components)',
    },
    {
      key: 'editors:webform:toolbox:components:image',
      type: EItemType.VIDEO,
      video: {
        provider: 'youtube',
        link: 'https://www.youtube.com/embed/0d_a-9iNV8s',
      },
      title: 'Component: DataTable',
      body: '### Component: DataTable\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris convallis odio erat, vitae laoreet mi viverra vel.',
    },
    {
      key: 'editors:webform:toolbox:components:image',
      type: EItemType.TEXT,
      body: '[Some link](https://git-ps.wakanda.io/4d/web-studio/design-system/-/issues/14)',
    },
    {
      key: 'editors:webform:toolbox:components:datatable',
      type: EItemType.VIDEO,
      video: {
        provider: 'youtube',
        link: 'https://www.youtube.com/embed/Q5lXyagkziI',
      },
      title: 'Component: DataTable',
      body: '### Component: DataTable\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris convallis odio erat, vitae laoreet mi viverra vel.',
    },
    {
      key: 'editors:webform:properties:image:source',
      type: EItemType.TEXT,
      body: '[Some link](https://git-ps.wakanda.io/4d/web-studio/design-system/-/issues/14)',
    },
  ],
};
