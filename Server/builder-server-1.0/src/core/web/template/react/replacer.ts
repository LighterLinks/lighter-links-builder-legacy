const basePath = './src/core/web/template/react/web';

export function replacerReact({
  webName,
  description,
}: {
  webName: string;
  description: string;
}) {
  return [
    {
      filePath: `${basePath}/package.json`,
      mapper: [
        {
          token: '<web_name>',
          value: webName,
        },
      ],
    },
    {
      filePath: `${basePath}/package-lock.json`,
      mapper: [
        {
          token: '<web_name>',
          value: webName,
        },
      ],
    },
    {
      filePath: `${basePath}/README.md`,
      mapper: [
        {
          token: '<web_name>',
          value: webName,
        },
        {
          token: '<description>',
          value: description,
        },
      ],
    },
    {
      filePath: `${basePath}/public/manifest.json`,
      mapper: [
        {
          token: '<web_name>',
          value: webName,
        },
      ],
    },
    {
      filePath: `${basePath}/public/index.html`,
      mapper: [
        {
          token: '<description>',
          value: description,
        },
      ],
    },
  ];
}
