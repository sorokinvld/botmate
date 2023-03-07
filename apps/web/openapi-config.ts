import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile: 'http://localhost:8080/api/docs-json',
  apiFile: './src/libs/store/base-query.ts',
  apiImport: 'apiSlice',
  outputFile: './src/libs/api.ts',
  exportName: 'userApi',
  hooks: true,
  tag: true,
};

export default config;
