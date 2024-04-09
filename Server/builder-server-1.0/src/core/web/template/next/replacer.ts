const basePath = './src/core/web/template/next/web';

export function replacerNext({
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
  ];
}
