'use strict';

export default plop => {
  plop.setGenerator('api', {
    description: 'Create an api',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your api?'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'server/api/{{name}}/index.js',
        templateFile: 'plop/api/index.hbs'
      },
      {
        type: 'add',
        path: 'server/api/{{name}}/{{name}}.model.js',
        templateFile: 'plop/api/model.hbs'
      },
      {
        type: 'add',
        path: 'server/api/{{name}}/{{name}}.seed.js',
        templateFile: 'plop/api/seed.hbs'
      }
    ]
  })
};
