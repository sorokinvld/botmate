const path = require('path');
const packagesFolder = require('../utils/package-folders');

/**
 * @type {import('plop').PlopGeneratorConfig}
 */
const UiGenerator = {
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the UI component?',
    },
  ],
  actions: () => {
    const templatePath = path.join(packagesFolder, '/generators/admin/ui/templates/');
    const destPath = path.join(packagesFolder, '/shared/ui/src/components/{{pascalCase name}}');

    return [
      {
        type: 'addMany',
        destination: destPath,
        templateFiles: `${templatePath}/**/*`,
        base: templatePath,
      },
      {
        type: 'append',
        path: path.join(packagesFolder, '/shared/ui/src/components/index.ts'),
        template: `export * from './{{pascalCase name}}';`,
      },
    ];
  },
};

module.exports = { UiGenerator };
