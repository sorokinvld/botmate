/** @type {import('plop').PlopGeneratorConfig} */
export const config = {
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Enter module name:',
    },
    // {
    //   type: 'confirm',
    //   name: 'useHooks',
    //   message: 'Do you want to use hooks?',
    // },
  ],
  actions: function () {
    const actions = [];

    // add base tempalte
    actions.push({
      type: 'addMany',
      destination: 'modules/{{dashCase name}}',
      templateFiles: 'generators/module/templates/base/**/*',
      base: 'generators/module/templates/base',
      globOptions: {
        dot: true,
      },
    });

    return actions;
  },
};
